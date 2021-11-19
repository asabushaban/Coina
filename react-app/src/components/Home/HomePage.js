import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addNewQuestion,
  getQuestions,
  getFollowedQuestions,
  deleteQuestion,
  editQuestion,
} from "../../store/question";

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);
  const allAnswers = useSelector(state => state.answers);

  const dispatch = useDispatch();

  const [newQuestion, setNewQuestion] = useState("");
  const [mainQuestionId, setMainQuestionId] = useState("");
  const [editedQuestion, setEditedQuestion] = useState("");
  const [follows, setFollows] = useState("");

  useEffect(async () => {
    dispatch(getFollowedQuestions(sessionUser.follows));
  }, [dispatch]);

  const submitQuestion = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(addNewQuestion(newQuestion, sessionUser.id)).then(() =>
      dispatch(getFollowedQuestions(sessionUser.follows))
    );
  };

  const questionDeleter = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(deleteQuestion(mainQuestionId)).then(() =>
      dispatch(getFollowedQuestions(sessionUser.follows))
    );
  };

  const questionEditor = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    await dispatch(editQuestion(mainQuestionId, editedQuestion)).then(() =>
      dispatch(getFollowedQuestions(sessionUser.follows))
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
    }).then(() => dispatch(getFollowedQuestions(sessionUser.follows)));
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
