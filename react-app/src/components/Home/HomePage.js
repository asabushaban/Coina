import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFollowedQuestions } from "../../store/question";
import About from "../About/about";
import QuestionContainer from "../QuestionContainer";

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  const userQuestions = useSelector(state => state.questions);

  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getFollowedQuestions(sessionUser));
  }, [dispatch]);

  return (
    <>
      <div id="mainHomeContainer">
        <h1 style={{ marginTop: "100px" }}> Following:</h1>
        {userQuestions && Object.keys(userQuestions).length != 0 ? (
          <QuestionContainer
            questions={userQuestions}
            location={"home"}
            user={sessionUser.follows}
          />
        ) : (
          <h1>No one you follow has posted anything!</h1>
        )}
        <About />
      </div>
    </>
  );
}

export default HomePage;
