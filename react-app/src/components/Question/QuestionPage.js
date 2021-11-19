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
  const [mainAnswer, setMainAnswer] = useState("");
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
    dispatch(deleteAnswer(mainAnswer)).then(() =>
      dispatch(getAnswers(+questionId))
    );
  };

  const answerEditor = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    await dispatch(editAnswer(mainAnswer, editedAnswer)).then(() =>
      dispatch(getAnswers(+questionId))
    );
  };

  const answerOpener = () => setOpenAnswer(!openAnswer);

  return (
    <>
      {question ? (
        <div>
          <h1>{question.question}</h1>
          <button onClick={answerOpener}>answer</button>
          <div hidden={openAnswer}>
            <textarea onChange={e => setNewAnswer(e.target.value)}></textarea>
            <button onClick={submitAnswer}>submit answer</button>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
      {answers ? (
        answers.map(answer => (
          <div onClick={e => setMainAnswer(answer.id)}>
            <p>{answer.body}</p>
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
    </>
  );
}

export default QuestionPage;
