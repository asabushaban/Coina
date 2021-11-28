import "./MyProfilePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addNewQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
} from "../../store/question";
import QuestionContainer from "../QuestionContainer";
import { authenticate } from "../../store/session";

function MyProfile() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);

  const dispatch = useDispatch();
  const [follows, setFollows] = useState("");

  useEffect(() => {
    if (!sessionUser.id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/follows/${sessionUser.id}`);
      const follows = await response.json();
      setFollows(follows);
    })();
  }, []);

  useEffect(async () => {
    dispatch(getQuestions(sessionUser.id, sessionUser.id));
  }, [dispatch]);

  return (
    <>
      <div id="mainHomeContainer">
        <div>
          <h1 id={"profileUserHeading"}>{sessionUser.username}</h1>
          {follows ? (
            <div id={"followsHolder"}>
              <p id={"following"}>following:{follows.totalFollowing}</p>
              <p id={"followers"}>followers:{follows.totalFollowers}</p>
            </div>
          ) : null}
        </div>
        {/* <h2>My Questions:</h2> */}
        {userQuestions && Object.keys(userQuestions).length != 0 ? (
          <QuestionContainer
            questions={userQuestions}
            location={"profile"}
            user={sessionUser.id}
          />
        ) : (
          <h1>{sessionUser.username} has not posted any questions!</h1>
        )}
      </div>
    </>
  );
}

export default MyProfile;
