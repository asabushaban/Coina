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

function QuestionPage({ question }) {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);

  const dispatch = useDispatch();
  const params = useParams();

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

  return (
    <>
      <div id="mainHomeContainer">
        <h1>{userQuestions[params.questionId].question}</h1>
      </div>
    </>
  );
}

export default QuestionPage;
