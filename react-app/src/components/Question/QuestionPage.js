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

  const dispatch = useDispatch();
  const params = useParams();

  const [newAnswer, setNewAnswer] = useState("");
  const [openAnswer, setOpenAnswer] = useState(true);
  const [mainAnswer, setMainAnswer] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  useEffect(async () => {
    dispatch(getQuestions(sessionUser.id));
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
      dispatch(getAnswers(sessionUser.id))
    );
  };

  const answerEditor = async e => {
    e.preventDefault();
    if (!sessionUser) return;
    await dispatch(editAnswer(mainAnswer, editedAnswer)).then(() =>
      dispatch(getAnswers(sessionUser.id))
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
    </>
  );
}

export default QuestionPage;
