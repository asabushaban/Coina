import "./QuestionPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuestions } from "../../store/question";
import Modal from "../Modal/Modal";
import { authenticate } from "../../store/session";
import {
  deleteAnswer,
  addNewAnswer,
  editAnswer,
  getAnswers,
} from "../../store/answer";
import About from "../About/about";

function QuestionPage() {
  const sessionUser = useSelector(state => state.session.user);
  const allAnswers = useSelector(state => state.answers);
  const dispatch = useDispatch();
  const { questionId } = useParams();

  const answers = Object.values(allAnswers).filter(
    answer => +answer.question_id === +questionId
  );

  const [newAnswer, setNewAnswer] = useState("");
  const [openAnswer, setOpenAnswer] = useState(true);
  const [mainAnswerId, setMainAnswerId] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [image, setImage] = useState(null);

  useEffect(async () => {
    await dispatch(getQuestions(sessionUser.id));
    await dispatch(getAnswers(+questionId, sessionUser));

    console.log("====================================", image);
  }, [dispatch, image]);

  useEffect(() => {
    if (!questionId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/questions/${questionId}`);
      const question = await response.json();
      setQuestion(question);
    })();
  }, [questionId]);

  if (!questionId) {
    return null;
  }

  const submitAnswer = async () => {
    if (!newAnswer) {
      setError("answer can not be empty");
      return;
    }

    if (newAnswer.length >= 255) {
      setError("answer must be shorter");
      return;
    }

    if (!sessionUser) return;

    dispatch(addNewAnswer(newAnswer, image, sessionUser.id, +questionId));
    // dispatch(addNewAnswer(newAnswer, sessionUser.id, questionId)).then(
    //   () => dispatch(getAnswers(sessionUser.id))
    // );
    setError("");
    setNewAnswer("");
  };

  const answerDeleter = async () => {
    if (!sessionUser) return;
    dispatch(deleteAnswer(mainAnswerId)).then(() =>
      dispatch(getAnswers(+questionId, sessionUser))
    );
  };

  const answerEditor = async () => {
    if (!editedAnswer) {
      setEditError("answer can not be empty");
      return;
    }

    if (editedAnswer.length >= 255) {
      setEditError("answer must be shorter");
      return;
    }

    if (!sessionUser) return;

    await dispatch(editAnswer(mainAnswerId, editedAnswer)).then(() =>
      dispatch(getAnswers(+questionId, sessionUser))
    );

    setEditError("");
    setModalEdit(false);
    setEditedAnswer("");
  };

  const addUpVote = async id => {
    await fetch(`/api/answers/addupvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: id,
        user_id: sessionUser.id,
      }),
    }).then(() => dispatch(getAnswers(+questionId, sessionUser)));
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

  const deleteAndEditElements = answer => {
    return (
      <div id={"deleteAndEdit"}>
        <svg
          onClick={e => {
            setModalEdit(true);
            setMainAnswerId(answer.id);
            setEditedAnswer(answer.body);
          }}
          style={{ cursor: "pointer" }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <path
              d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z"
              className="icon_svg-stroke"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              className="icon_svg-fill_as_stroke"
              fill="#666"
              d="m4.429 19.571 2.652-.884-1.768-1.768z"
            ></path>
          </g>
        </svg>
        <svg
          onClick={e => {
            setModalDelete(true);
            setMainAnswerId(answer.id);
          }}
          style={{ cursor: "pointer" }}
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <g
            className="icon_svg-stroke"
            stroke="#666"
            strokeWidth="1.5"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(4.000000, 2.000000)"
          >
            <polyline points="0 4.5 1.77777778 4.5 16 4.5"></polyline>
            <path d="M6,9 L6,14"></path>
            <path d="M10,9 L10,14"></path>
            <path d="M14,4.6 L14,17.2 C14,18.1941125 13.2324881,19 12.2857143,19 L3.71428571,19 C2.76751186,19 2,18.1941125 2,17.2 L2,4.6 M4.57142857,3.8 L4.57142857,2 C4.57142857,1.00588745 5.33894043,0.2 6.28571429,0.2 L9.71428571,0.2 C10.6610596,0.2 11.4285714,1.00588745 11.4285714,2 L11.4285714,3.8"></path>
          </g>
        </svg>
      </div>
    );
  };

  const answerOpener = () => setOpenAnswer(!openAnswer);

  return (
    <div id={`mainAnswerContainer`}>
      {question ? (
        <>
          <h1 id={"answerHeading"}>{question.question}</h1>
          <div id={"answerButton"} onClick={answerOpener}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeWidth="1.5" fill="none" fillRule="evenodd">
                <path
                  d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z"
                  className="icon_svg-stroke"
                  stroke="#2e69ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  className="icon_svg-fill_as_stroke"
                  fill="#2e69ff"
                  d="m4.429 19.571 2.652-.884-1.768-1.768z"
                ></path>
                <path
                  d="M14.5 19.5h5v-5m-10-10h-5v5"
                  className="icon_svg-stroke"
                  stroke="#2e69ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <p>Answer</p>
            {error ? (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginLeft: "320px",
                }}
              >
                {error}
              </p>
            ) : null}
          </div>
          <div hidden={openAnswer} id={"answerContainer"}>
            <textarea
              id={"answerTextArea"}
              hidden={openAnswer}
              value={newAnswer}
              onChange={e => setNewAnswer(e.target.value)}
            ></textarea>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <input
                id={"post-pic"}
                hidden={openAnswer}
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
              ></input>
              <button
                id={"submitAnswer"}
                hidden={openAnswer}
                onClick={() => {
                  submitAnswer();
                  setOpenAnswer(!openAnswer);
                }}
              >
                Answer
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
      {answers && sessionUser.follows ? (
        answers.map(answer => (
          <div
            className="questionContainter"
            onClick={e => setMainAnswerId(answer.id)}
          >
            {sessionUser.follows[answer.user_id] ? (
              <div id={"topQuestionLeft"}>
                <Link
                  to={`/profile/${answer.user_id}`}
                  className={"questionAnswerer"}
                >
                  {`${answer.username}`}
                </Link>
                <p style={{ padding: "0px", margin: "0px" }}> · </p>
                <p
                  className={"questionFollow"}
                  onClick={e => addFollow(answer.user_id)}
                  style={{ color: "rgb(133, 131, 131)" }}
                >
                  Following
                </p>
              </div>
            ) : (
              <div id={"topQuestionLeft"}>
                <Link
                  className={"questionAnswerer"}
                  to={`/profile/${answer.user_id}`}
                >
                  {`${answer.username}`}
                </Link>
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
                  onClick={e => addFollow(answer.user_id)}
                >
                  Follow
                </p>
              </div>
            )}
            <div id={"answerContainerTop"}>
              <p>{answer.body}</p>

              {answer.user_id === sessionUser.id ? (
                <>{deleteAndEditElements(answer)}</>
              ) : null}
            </div>
            {answer.image ? (
              <img id={"questionImageAnswer"} src={answer.image} />
            ) : null}
            <div className={"bottomQuestion"}>
              <div
                className={"bottomQuestionLeft"}
                onClick={e => addUpVote(answer.id)}
              >
                {answer.upVoted ? (
                  <svg
                    id={"upArrowImg"}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4 3 15h6v5h6v-5h6z"
                      className="icon_svg-stroke icon_svg-fill"
                      strokeWidth="1.5"
                      stroke="#00"
                      fill="#2e69ff"
                      // fill="666"
                      strokeLinejoin=""
                    ></path>
                  </svg>
                ) : (
                  <svg
                    id={"upArrowImg"}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4 3 15h6v5h6v-5h6z"
                      className="icon_svg-stroke icon_svg-fill"
                      strokeWidth="1.5"
                      stroke="#2e69ff"
                      fill="none"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                )}
                <p id={"upVotesNum"}>{answer.upVotes}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <p>no answers</p>
        </>
      )}
      <About />
      <Modal
        id={"deleteQuestionModal"}
        title={`Delete Answer`}
        show={modalDelete}
        onClose={() => setModalDelete(false)}
      >
        <h2 id={"deleteQuestionModalHeading"}>
          Are you sure you want to delete this answer?
        </h2>
        <h4
          onClick={e => {
            answerDeleter();
            setModalDelete(false);
          }}
          id={"deleteQuestionModalButton"}
        >
          Delete Permanently
        </h4>
      </Modal>

      <Modal
        title={`Edit Answer`}
        show={modalEdit}
        onClose={() => setModalEdit(false)}
      >
        <div id={"askQuestionModal"}>
          <p id={"askQuestionName"}>{sessionUser.username}</p>
          {editError ? (
            <p style={{ color: "red", textAlign: "center", margin: "0px" }}>
              {editError}
            </p>
          ) : null}
          <input
            id={"askQuestionInput"}
            value={editedAnswer}
            onChange={e => setEditedAnswer(e.target.value)}
          ></input>
          <div id={"askQuestionModalBottom"}>
            <p
              id={"askQuestionModalCancel"}
              onClick={() => setModalEdit(false)}
            >
              Cancel
            </p>
            <button
              id={"askQuestionButton"}
              onClick={() => {
                answerEditor();
              }}
            >
              Edit answer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuestionPage;
