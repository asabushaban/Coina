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

  const [newAnswer, setNewAnswer] = useState("");
  const [openAnswer, setOpenAnswer] = useState(true);
  const [editedQuestion, setEditedQuestion] = useState("");

  useEffect(async () => {
    dispatch(getQuestions(sessionUser.id));
  }, [dispatch]);

  const answerOpener = () => setOpenAnswer(!openAnswer);

  return (
    <>
      {userQuestions[params.questionId] ? (
        <div>
          <h1>{userQuestions[params.questionId].question}</h1>
          <button onClick={answerOpener}>answer</button>
          <div hidden={openAnswer}>
            <textarea></textarea>
            <button>submit answer</button>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}

export default QuestionPage;
