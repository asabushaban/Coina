import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addNewQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
} from "../../store/question";

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

  return (
    <>
      <div id="mainHomeContainer">
        <h1>{user.username}</h1>
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
