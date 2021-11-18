import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addNewQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
} from "../../store/question";

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);
  const allAnswers = useSelector(state => state.answers);

  const dispatch = useDispatch();

  const [newQuestion, setNewQuestion] = useState("");
  const [mainQuestion, setMainQuestion] = useState(4);
  const [editedQuestion, setEditedQuestion] = useState("");

  useEffect(async () => {
    dispatch(getQuestions(sessionUser.id));
  }, [dispatch]);

  const submitQuestion = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(addNewQuestion(newQuestion, sessionUser.id)).then(() =>
      dispatch(getQuestions(sessionUser.id))
    );
  };

  const questionDeleter = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(deleteQuestion(mainQuestion)).then(() =>
      dispatch(getQuestions(sessionUser.id))
    );
  };

  const questionEditor = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    await dispatch(editQuestion(mainQuestion, editedQuestion)).then(() =>
      dispatch(getQuestions(sessionUser.id))
    );
  };

  const addUpVote = async () => {
    const res = await fetch(`/api/questions/addupvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: mainQuestion, user_id: sessionUser.id }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(getQuestions(sessionUser.id));
    }
  };

  return (
    <>
      <div id="mainHomeContainer">
        <h1>Coina</h1>
        <input onChange={e => setNewQuestion(e.target.value)}></input>
        <button onClick={submitQuestion}>submit question</button>
        {userQuestions
          ? Object.values(userQuestions).map(obj => (
              <div
                className="questionContainter"
                onClick={e => setMainQuestion(obj.id)}
              >
                <Link
                  className="questionLink"
                  to={`/question/${obj.id}`}
                  question={obj}
                >
                  {obj.question}
                </Link>
                <button
                  onClick={questionDeleter}
                  hidden={mainQuestion != obj.id}
                >
                  delete
                </button>
                <button
                  onClick={questionEditor}
                  hidden={mainQuestion != obj.id}
                >
                  edit
                </button>
                <input
                  onChange={e => setEditedQuestion(e.target.value)}
                  hidden={mainQuestion != obj.id}
                ></input>
                <div>
                  <button onClick={addUpVote} hidden={mainQuestion != obj.id}>
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

export default HomePage;
