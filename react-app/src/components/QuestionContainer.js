import "./Home/HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getQuestions,
  deleteQuestion,
  editQuestion,
  getFollowedQuestions,
} from "../store/question";
import { authenticate } from "../store/session";
import Modal from "./Modal/Modal";

function QuestionContainer({ questions, location, user }) {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  // const [newQuestion, setNewQuestion] = useState("");
  const [mainQuestionId, setMainQuestionId] = useState("");
  const [editedQuestion, setEditedQuestion] = useState("");
  // const [follows, setFollows] = useState("");

  useEffect(async () => {
    if (location === "home") {
      dispatch(getFollowedQuestions(sessionUser));
    } else {
      dispatch(getQuestions(user, sessionUser.id));
    }
  }, [dispatch]);

  const questionDeleter = async location => {
    if (!sessionUser) return;
    if (location === "home") {
      dispatch(deleteQuestion(mainQuestionId)).then(() =>
        dispatch(getFollowedQuestions(sessionUser))
      );
    } else {
      dispatch(deleteQuestion(mainQuestionId)).then(() =>
        dispatch(getQuestions(user, sessionUser.id))
      );
    }
  };

  const questionEditor = async location => {
    if (!sessionUser) return;
    if (location === "home") {
      await dispatch(editQuestion(mainQuestionId, editedQuestion)).then(() =>
        dispatch(getFollowedQuestions(sessionUser))
      );
    } else {
      await dispatch(editQuestion(mainQuestionId, editedQuestion)).then(() =>
        dispatch(getQuestions(user, sessionUser.id))
      );
    }
  };

  const addUpVote = async (id, location) => {
    if (location === "home") {
      await fetch(`/api/questions/addupvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: id,
          user_id: sessionUser.id,
        }),
      }).then(() => dispatch(getFollowedQuestions(sessionUser)));
    } else {
      await fetch(`/api/questions/addupvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: id,
          user_id: sessionUser.id,
        }),
      }).then(() => dispatch(getQuestions(user, sessionUser.id)));
    }
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

  const deleteAndEditElements = obj => {
    return (
      <div>
        <svg
          onClick={e => {
            setModalEdit(true);
            setMainQuestionId(obj.id);
            setEditedQuestion(obj.question);
          }}
          style={{ cursor: "pointer" }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z"
              class="icon_svg-stroke"
              stroke="#666"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              class="icon_svg-fill_as_stroke"
              fill="#666"
              d="m4.429 19.571 2.652-.884-1.768-1.768z"
            ></path>
          </g>
        </svg>
        <svg
          onClick={e => {
            setModalDelete(true);
            setMainQuestionId(obj.id);
          }}
          style={{ cursor: "pointer" }}
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <g
            class="icon_svg-stroke"
            stroke="#666"
            stroke-width="1.5"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
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

  return (
    <>
      {questions
        ? Object.values(questions).map(obj => (
            <div className="questionContainter">
              {obj.topAnswer ? (
                <div className={"topQuestion"}>
                  {sessionUser.follows[obj.topAnswer.user_id] ? (
                    <div id={"topQuestionLeft"}>
                      <Link className={"questionAnswerer"}>
                        {`${obj.topAnswer.username}`}
                      </Link>
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
                    <div id={"topQuestionLeft"}>
                      <Link className={"questionAnswerer"}>
                        {`${obj.topAnswer.username}`}
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
                        onClick={e => addFollow(obj.topAnswer.user_id)}
                      >
                        Follow
                      </p>
                    </div>
                  )}
                  {sessionUser.id === obj.user_id ? (
                    <>{deleteAndEditElements(obj)}</>
                  ) : null}
                </div>
              ) : (
                <>
                  {sessionUser.id === obj.user_id ? (
                    <div className={"topQuestion"}>
                      <div id={"topQuestionLeft"}>
                        <Link className={"questionAnswerer"}>unanswered</Link>
                      </div>
                      <div>{deleteAndEditElements(obj)}</div>
                    </div>
                  ) : null}
                </>
              )}
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
                  <p style={{ fontSize: "10pt" }}>{`${obj.topAnswer.body}`}</p>
                </div>
              ) : (
                <p> Answer this question..</p>
              )}
              <div className={"bottomQuestion"}>
                <div
                  className={"bottomQuestionLeft"}
                  onClick={e => addUpVote(obj.id, location)}
                >
                  {obj.upVoted ? (
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
                        fill="#2e69ff"
                        // fill="666"
                        stroke-linejoin=""
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
                        class="icon_svg-stroke icon_svg-fill"
                        stroke-width="1.5"
                        stroke="#2e69ff"
                        fill="none"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  )}
                  <p id={"upVotesNum"}>{obj.upVotes}</p>
                </div>
                <p style={{ fontSize: "8pt" }}>posted by: {obj.username}</p>
              </div>
            </div>
          ))
        : null}

      <Modal
        id={"deleteQuestionModal"}
        title={`Delete Question`}
        show={modalDelete}
        onClose={() => setModalDelete(false)}
      >
        <h2 id={"deleteQuestionModalHeading"}>
          Are you sure you want to delete this question?
        </h2>
        <h4
          onClick={e => {
            questionDeleter("myprofile");
            setModalDelete(false);
          }}
          id={"deleteQuestionModalButton"}
        >
          Delete Permanently
        </h4>
      </Modal>

      <Modal
        title={`Edit Question`}
        show={modalEdit}
        onClose={() => setModalEdit(false)}
      >
        <div id={"askQuestionModal"}>
          <p id={"askQuestionName"}>{sessionUser.username}</p>
          <input
            id={"askQuestionInput"}
            value={editedQuestion}
            onChange={e => setEditedQuestion(e.target.value)}
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
                questionEditor(location);
                setModalEdit(false);
              }}
            >
              Edit question
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default QuestionContainer;
