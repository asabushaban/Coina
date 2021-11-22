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
import { authenticate } from "../../store/session";
import arrow from "../trans-arrow.jpeg";
import Modal from "../Modal/Modal";

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);
  const allAnswers = useSelector(state => state.answers);

  const dispatch = useDispatch();

  const [newQuestion, setNewQuestion] = useState("");
  const [mainQuestionId, setMainQuestionId] = useState("");
  const [editedQuestion, setEditedQuestion] = useState("");
  // const [follows, setFollows] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(async () => {
    dispatch(getFollowedQuestions(sessionUser.follows));
  }, [dispatch]);

  const submitQuestion = async e => {
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

  const addUpVote = async id => {
    await fetch(`/api/questions/addupvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: id,
        user_id: sessionUser.id,
      }),
    }).then(() => dispatch(getFollowedQuestions(sessionUser.follows)));
  };

  const addFollow = async id => {
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
  };

  return (
    <>
      <div id="mainHomeContainer">
        {/* <h1>Coina</h1>
        <input onChange={e => setNewQuestion(e.target.value)}></input>
        <button onClick={submitQuestion}>submit question</button> */}
        {sessionUser ? (
          <div id={"askQuestionBox"} onClick={e => setModal(true)}>
            <p id={"askQuestionBoxName"}>{sessionUser.username}</p>
            <p id={"askQuestionBoxPrompt"}>What is your question?</p>
          </div>
        ) : null}

        {userQuestions
          ? Object.values(userQuestions).map(obj => (
              <div
                className="questionContainter"
                onClick={e => setMainQuestionId(obj.id)}
              >
                {obj.topAnswer ? (
                  <div className={"topQuestion"}>
                    <Link className={"questionAnswerer"}>
                      {`${obj.topAnswer.username}`}
                    </Link>
                    {sessionUser.follows[obj.topAnswer.user_id] ? (
                      <div className={"topQuestion"}>
                        <p style={{ padding: "0px", margin: "0px" }}> · </p>
                        <p
                          className={"questionFollow"}
                          onClick={e => addFollow(obj.topAnswer.user_id)}
                          style={{ color: "rgb(133, 131, 131)" }}
                        >
                          Following
                        </p>
                      </div>
                    ) : (
                      <div className={"topQuestion"}>
                        <p
                          style={{
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          ·
                        </p>
                        <p
                          className={"questionFollow"}
                          onClick={e => addFollow(obj.topAnswer.user_id)}
                        >
                          Follow
                        </p>
                      </div>
                    )}
                  </div>
                ) : null}
                <Link
                  className={"questionLink"}
                  to={`/question/${obj.id}`}
                  question={obj}
                >
                  {obj.question}
                </Link>
                {/* top answer displayed chaining, if answered display the top answer or propmt user to answer the question */}
                {obj.topAnswer ? (
                  <div>
                    <p style={{ fontSize: "10pt" }}>
                      {`${obj.topAnswer.body}`}
                    </p>
                  </div>
                ) : (
                  <p> Answer this question..</p>
                )}
                <Modal
                  title={`Add Question`}
                  show={modal}
                  onClose={() => setModal(false)}
                >
                  <div id={"askQuestionModal"}>
                    <p id={"askQuestionName"}>{sessionUser.username}</p>
                    <input
                      id={"askQuestionInput"}
                      placeholder={`Start your question with "What", "How", "Why", etc.`}
                      onChange={e => setNewQuestion(e.target.value)}
                    ></input>
                    <div id={"askQuestionModalBottom"}>
                      <p
                        id={"askQuestionModalCancel"}
                        onClick={() => setModal(false)}
                      >
                        Cancel
                      </p>
                      <button
                        id={"askQuestionButton"}
                        onClick={() => {
                          submitQuestion();
                          setModal(false);
                        }}
                      >
                        Add question
                      </button>
                    </div>
                  </div>
                </Modal>
                <div className={"bottomQuestion"}>
                  <div
                    className={"bottomQuestionLeft"}
                    onClick={e => addUpVote(obj.id)}
                  >
                    <svg
                      id={"upArrowImg"}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4 3 15h6v5h6v-5h6z"
                        class="icon_svg-stroke icon_svg-fill"
                        stroke-width="1.5"
                        stroke="#00"
                        fill="blue"
                        stroke-linejoin=""
                      ></path>
                    </svg>
                    {/* <img
                      id={"upArrowImg"}
                      src={arrow}
                      onClick={e => addUpVote(obj.id)}
                    /> */}
                    <p id={"upVotesNum"}>{obj.upVotes}</p>
                  </div>
                  <p style={{ fontSize: "8pt" }}>posted by: {obj.username}</p>
                </div>
                <button
                  onClick={questionDeleter}
                  hidden={sessionUser.id != obj.id}
                >
                  delete
                </button>
                <button
                  onClick={questionEditor}
                  hidden={sessionUser.id != obj.id}
                >
                  edit
                </button>
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
