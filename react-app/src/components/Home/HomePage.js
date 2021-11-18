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
      await dispatch(getQuestions(sessionUser.id));
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

let obj = {
  23: {
    id: 23,
    question: "What is water?",
    user_id: 2,
    created_at: "11-16-2021 07:27 PM",
    updated_at: "11-16-2021 07:27 PM",
    upVotes: 0,
  },
  5: {
    id: 5,
    question: "What is the sky?",
    user_id: 2,
    created_at: "11-16-2021 04:04 PM",
    updated_at: "11-16-2021 04:04 PM",
    upVotes: 1,
  },
  26: {
    id: 26,
    question: "This is a test. How does this work?",
    user_id: 2,
    created_at: "11-17-2021 08:43 AM",
    updated_at: "11-17-2021 08:43 AM",
    upVotes: 0,
  },
  22: {
    id: 22,
    question: "What's 5 + 5?",
    user_id: 2,
    created_at: "11-16-2021 07:27 PM",
    updated_at: "11-16-2021 07:27 PM",
    upVotes: 0,
  },
  8: {
    id: 8,
    question: "How much is this thing?",
    user_id: 2,
    created_at: "11-16-2021 04:24 PM",
    updated_at: "11-16-2021 04:24 PM",
    upVotes: 1,
  },
  6: {
    id: 6,
    question: "What's that smell?",
    user_id: 2,
    created_at: "11-16-2021 04:13 PM",
    updated_at: "11-16-2021 04:13 PM",
    upVotes: 1,
  },
};
