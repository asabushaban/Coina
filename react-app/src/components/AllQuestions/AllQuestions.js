import "./AllQuestions.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addNewQuestion, getAllQuestions } from "../../store/question";
// import arrow from "../trans-arrow.jpeg";
import Modal from "../Modal/Modal";
import QuestionContainer from "../QuestionContainer";
import About from "../About/about";

function AllQuestions() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);

  const dispatch = useDispatch();

  const [newQuestion, setNewQuestion] = useState("");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(async () => {
    dispatch(getAllQuestions(sessionUser));
  }, [dispatch]);

  const submitQuestion = async e => {
    if (!newQuestion) {
      setError("question can not be empty");
      return;
    }

    if (newQuestion.length >= 255) {
      setError("question must be shorter");
      return;
    }

    if (!sessionUser) return;
    dispatch(addNewQuestion(newQuestion, sessionUser.id)).then(() =>
      dispatch(getAllQuestions(sessionUser))
    );
    setError("");
    setModal(false);
    setNewQuestion("");
  };

  return (
    <>
      <div id="mainHomeContainer">
        {sessionUser ? (
          <div id={"askQuestionBox"} onClick={e => setModal(true)}>
            <p id={"askQuestionBoxName"}>{sessionUser.username}</p>
            <p id={"askQuestionBoxPrompt"}>What is your question?</p>
          </div>
        ) : null}
        <Modal
          title={`Add Question`}
          show={modal}
          onClose={() => setModal(false)}
        >
          <div id={"askQuestionModal"}>
            <p id={"askQuestionName"}>{sessionUser.username}</p>
            {error ? (
              <p style={{ color: "red", textAlign: "center", margin: "0px" }}>
                {error}
              </p>
            ) : null}
            <input
              id={"askQuestionInput"}
              value={newQuestion}
              placeholder={`Start your question with "What", "How", "Why", etc.`}
              onChange={e => setNewQuestion(e.target.value)}
            ></input>
            <div id={"askQuestionModalBottom"}>
              <p id={"askQuestionModalCancel"} onClick={() => setModal(false)}>
                Cancel
              </p>
              <button
                id={"askQuestionButton"}
                onClick={() => {
                  submitQuestion();
                }}
              >
                Add question
              </button>
            </div>
          </div>
        </Modal>
        {userQuestions && Object.keys(userQuestions).length != 0 ? (
          <QuestionContainer
            questions={userQuestions}
            location={"all"}
            user={sessionUser.id}
          />
        ) : (
          <h1>No one you follow has posted anything!</h1>
        )}
        <About />
      </div>
    </>
  );
}

export default AllQuestions;
