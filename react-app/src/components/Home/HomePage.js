import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addNewQuestion, getQuestions } from "../../store/question";

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);

  const dispatch = useDispatch();

  const [newQuestion, setNewQuestion] = useState("");

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

  return (
    <>
      <h1>Coina</h1>
      <input onChange={e => setNewQuestion(e.target.value)}></input>
      <button onClick={submitQuestion}>submit question</button>
      {userQuestions
        ? Object.values(userQuestions).map(question => (
            <div>
              {question.question}
              <button>delete</button>
              <button>edit</button>
            </div>
          ))
        : null}
    </>
  );
}

export default HomePage;
