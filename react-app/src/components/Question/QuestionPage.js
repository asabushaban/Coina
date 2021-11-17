import "./QuestionPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  addNewQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
} from "../../store/question";

import {
  deleteAnswer,
  addNewAnswer,
  editAnswer,
  getAnswers,
} from "../../store/answer";

function QuestionPage({ question }) {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);
  const allAnswers = useSelector(state => state.answers);
  const dispatch = useDispatch();
  const params = useParams();

  const answers = Object.values(allAnswers).filter(
    answer => +answer.question_id === +params.questionId
  );

  const [newAnswer, setNewAnswer] = useState("");
  const [openAnswer, setOpenAnswer] = useState(true);
  const [mainAnswer, setMainAnswer] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  useEffect(async () => {
    await dispatch(getQuestions(sessionUser.id));
    await dispatch(getAnswers(+params.questionId));
  }, [dispatch]);

  const submitAnswer = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(addNewAnswer(newAnswer, sessionUser.id, +params.questionId));
    // dispatch(addNewAnswer(newAnswer, sessionUser.id, params.questionId)).then(
    //   () => dispatch(getAnswers(sessionUser.id))
    // );
  };

  const answerDeleter = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    dispatch(deleteAnswer(mainAnswer)).then(() =>
      dispatch(getAnswers(+params.questionId))
    );
  };

  const answerEditor = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    await dispatch(editAnswer(mainAnswer, editedAnswer)).then(() =>
      dispatch(getAnswers(+params.questionId))
    );
  };

  const answerOpener = () => setOpenAnswer(!openAnswer);

  return (
    <>
      {userQuestions[params.questionId] ? (
        <div>
          <h1>{userQuestions[params.questionId].question}</h1>
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
            <button hidden={mainAnswer != answer.id} onClick={answerDeleter}>
              delete
            </button>
          </div>
        ))
      ) : (
        <p>no answers</p>
      )}
    </>
  );
}

export default QuestionPage;
