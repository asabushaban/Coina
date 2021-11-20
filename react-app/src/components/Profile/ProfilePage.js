import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addNewQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
} from "../../store/question";
import { authenticate } from "../../store/session";

function Profile() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);
  const allAnswers = useSelector(state => state.answers);

  const dispatch = useDispatch();
  const { userId } = useParams();

  const [newQuestion, setNewQuestion] = useState("");
  const [mainQuestionId, setMainQuestionId] = useState("");
  const [editedQuestion, setEditedQuestion] = useState("");
  const [user, setUser] = useState({});
  const [follows, setFollows] = useState("");

  useEffect(async () => {
    dispatch(getQuestions(userId));
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

  // const submitQuestion = async e => {
  //   e.preventDefault();
  //   if (!sessionUser) return;
  //   dispatch(addNewQuestion(newQuestion, userId)).then(() =>
  //     dispatch(getQuestions(userId))
  //   );
  // };

  const questionDeleter = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(deleteQuestion(mainQuestionId)).then(() =>
      dispatch(getQuestions(userId))
    );
  };

  const questionEditor = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    await dispatch(editQuestion(mainQuestionId, editedQuestion)).then(() =>
      dispatch(getQuestions(userId))
    );
  };

  const addUpVote = async () => {
    await fetch(`/api/questions/addupvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: mainQuestionId,
        user_id: sessionUser.id,
      }),
    }).then(() => dispatch(getQuestions(userId)));
  };

  const addFollow = async () => {
    const response = await fetch(`/api/users/addfollow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followed: userId,
        follower: sessionUser.id,
      }),
    });
    await dispatch(authenticate());
    const newFollows = await response.json();
    setFollows(newFollows);
  };

  return (
    <>
      <div id="mainHomeContainer">
        <h1>{user.username}</h1>
        {userId != sessionUser.id ? (
          <button onClick={addFollow}>follow</button>
        ) : null}
        {follows ? (
          <div>
            <p>following:{follows.totalFollowing}</p>
            <p>followers:{follows.totalFollowers}</p>
          </div>
        ) : null}
        <h2>My Questions:</h2>
        {userQuestions
          ? Object.values(userQuestions).map(obj => (
              <div
                className="questionContainter"
                onClick={e => setMainQuestionId(obj.id)}
              >
                <p style={{ fontSize: "8pt" }}>posted by: {obj.username}</p>
                <Link
                  className="questionLink"
                  to={`/question/${obj.id}`}
                  question={obj}
                >
                  {obj.question}
                </Link>
                <p style={{ fontSize: "10pt" }}>
                  {obj.topAnswer
                    ? `${obj.topAnswer.body} - ${obj.topAnswer.username}`
                    : "Answer this question.."}
                </p>
                <p>upvotes:{obj.upVotes}</p>
                <button
                  onClick={questionDeleter}
                  hidden={mainQuestionId != obj.id}
                >
                  delete
                </button>
                <button
                  onClick={questionEditor}
                  hidden={mainQuestionId != obj.id}
                >
                  edit
                </button>
                <input
                  onChange={e => setEditedQuestion(e.target.value)}
                  hidden={mainQuestionId != obj.id}
                ></input>
                <div>
                  <button onClick={addUpVote} hidden={mainQuestionId != obj.id}>
                    upvote
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default Profile;
