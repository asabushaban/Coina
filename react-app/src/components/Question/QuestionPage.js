import "./QuestionPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuestions } from "../../store/question";
import {
  deleteAnswer,
  addNewAnswer,
  editAnswer,
  getAnswers,
} from "../../store/answer";

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

  useEffect(async () => {
    await dispatch(getQuestions(sessionUser.id));
    await dispatch(getAnswers(+questionId));
  }, [dispatch]);

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

  const submitAnswer = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(addNewAnswer(newAnswer, sessionUser.id, +questionId));
    // dispatch(addNewAnswer(newAnswer, sessionUser.id, questionId)).then(
    //   () => dispatch(getAnswers(sessionUser.id))
    // );
  };

  const answerDeleter = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(deleteAnswer(mainAnswerId)).then(() =>
      dispatch(getAnswers(+questionId))
    );
  };

  const answerEditor = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    await dispatch(editAnswer(mainAnswerId, editedAnswer)).then(() =>
      dispatch(getAnswers(+questionId))
    );
  };

  const addUpVote = async () => {
    await fetch(`/api/answers/addupvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: mainAnswerId,
        user_id: sessionUser.id,
      }),
    }).then(() => dispatch(getAnswers(+questionId)));
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
              <g stroke-width="1.5" fill="none" fill-rule="evenodd">
                <path
                  d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z"
                  class="icon_svg-stroke"
                  stroke="#2e69ff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  class="icon_svg-fill_as_stroke"
                  fill="#2e69ff"
                  d="m4.429 19.571 2.652-.884-1.768-1.768z"
                ></path>
                <path
                  d="M14.5 19.5h5v-5m-10-10h-5v5"
                  class="icon_svg-stroke"
                  stroke="#2e69ff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <p>Answer</p>
          </div>
          <div hidden={openAnswer} id={"answerContainer"}>
            <textarea
              id={"answerTextArea"}
              hidden={openAnswer}
              onChange={e => setNewAnswer(e.target.value)}
            ></textarea>
            <button
              id={"submitAnswer"}
              hidden={openAnswer}
              onClick={submitAnswer}
            >
              Answer
            </button>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
      {answers ? (
        answers.map(answer => (
          <div
            className="questionContainter"
            onClick={e => setMainAnswerId(answer.id)}
          >
            <p>{answer.body}</p>
            <div className={"bottomQuestion"}>
              <div className={"bottomQuestionLeft"} onClick={addUpVote}>
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
                {/* <img
                      id={"upArrowImg"}
                      src={arrow}
                      onClick={e => addUpVote(obj.id)}
                    /> */}
                <p id={"upVotesNum"}>{answer.upVotes}</p>
              </div>
            </div>
            {/* <div>
              <button onClick={addUpVote} hidden={mainAnswerId != answer.id}>
                upvote
              </button>
            </div> */}
            {/* <p>{answer.upVotes}</p> */}
            <button
              hidden={sessionUser.id != answer.user_id}
              onClick={answerDeleter}
            >
              delete
            </button>
            <button
              hidden={sessionUser.id != answer.user_id}
              onClick={answerEditor}
            >
              edit
            </button>
            <input
              hidden={sessionUser.id != answer.user_id}
              onChange={e => setEditedAnswer(e.target.value)}
            ></input>
          </div>
        ))
      ) : (
        <p>no answers</p>
      )}
    </div>
  );
}

export default QuestionPage;
