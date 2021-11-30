import "./MyProfilePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuestions } from "../../store/question";
import { authenticate } from "../../store/session";
import QuestionContainer from "../QuestionContainer";
import About from "../About/about";

function Profile() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);

  const dispatch = useDispatch();
  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [follows, setFollows] = useState("");

  useEffect(async () => {
    dispatch(getQuestions(userId, sessionUser.id));
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/follows/${userId}`);
      const follows = await response.json();
      setFollows(follows);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const addFollow = async (id, profile) => {
    const response = await fetch(`/api/users/addfollow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followed: id,
        follower: sessionUser.id,
      }),
    });
    await dispatch(authenticate());
    if (profile === "current") {
      const newFollows = await response.json();
      setFollows(newFollows);
      return;
    }
  };

  return (
    <>
      <div id="mainHomeContainer">
        <div>
          <h1 id={"profileUserHeading"}>{user.username}</h1>
          {follows ? (
            <div id={"followsHolder"}>
              <p id={"following"}>{follows.totalFollowing} following</p>
              <p>·</p>
              <p id={"followers"}>{follows.totalFollowers} followers</p>
            </div>
          ) : null}
          {userId != sessionUser.id && sessionUser.follows ? (
            <button
              id={"followButton"}
              onClick={e => addFollow(userId, "current")}
            >
              {sessionUser.follows[userId] ? `Following` : `Follow`}
            </button>
          ) : null}
        </div>
        <h2>{user.username} Questions:</h2>
        {userQuestions && Object.keys(userQuestions).length != 0 ? (
          <QuestionContainer
            questions={userQuestions}
            location={"profile"}
            user={userId}
          />
        ) : (
          <h1>{user.username} has not posted any questions!</h1>
        )}
      </div>
      <About />
    </>
  );
}

export default Profile;
