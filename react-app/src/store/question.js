//create a question
const ADD_QUESTION = "questions/ADD";
const LOAD_QUESTION = "questions/LOAD";

const initialState = {};

const addQuestion = question => ({
  type: ADD_QUESTION,
  question,
});

const loadQuestion = questions => ({
  type: LOAD_QUESTION,
  questions,
});

export const addNewQuestion = (question, userId) => async dispatch => {
  const res = await fetch(`/api/questions/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: question, user_id: userId }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addQuestion(data));
  }
};

// get a watchlists
export const getQuestions = userId => async dispatch => {
  const response = await fetch(`/api/questions/myquestions/${userId}`);

  if (response.ok) {
    const questions = await response.json();
    dispatch(loadQuestion(questions));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION: {
      if (action.question.id) {
        const newState = {
          ...state,
          [action.question.id]: action.question,
        };
        return newState;
      } else {
        return state;
      }
    }
    case LOAD_QUESTION: {
      const newQuestions = {};
      Object.values(action.questions).forEach(element => {
        newQuestions[element.id] = element;
      });
      return {
        ...state,
        ...newQuestions,
      };
    }
    default:
      return state;
  }
}
