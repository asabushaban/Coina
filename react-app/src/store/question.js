//create a question
const ADD_QUESTION = "questions/ADD";

//get questions for one user
const LOAD_QUESTION = "questions/LOAD";

//get questions for one user
const LOAD_ALL_QUESTION = "questions/LOAD_ALL_QUESTIONS";

//get questions for one user
const LOAD_FOLLOWS_QUESTION = "questions/LOAD_FOLLOWS";

//remove a question
const REMOVE_QUESTION = "questions/REMOVE";

//logout session
const REMOVE_USER = "session/REMOVE_USER";

const initialState = {};

const addQuestion = question => ({
  type: ADD_QUESTION,
  question,
});

const loadQuestion = questions => ({
  type: LOAD_QUESTION,
  questions,
});

const loadFollowsQuestion = questions => ({
  type: LOAD_FOLLOWS_QUESTION,
  questions,
});

const loadAllQuestion = questions => ({
  type: LOAD_ALL_QUESTION,
  questions,
});

const remove = id => ({
  type: REMOVE_QUESTION,
  id,
});
// delete a question
export const deleteQuestion = id => async dispatch => {
  const response = await fetch(`/api/questions/${id}`, {
    method: "DELETE",
  });
  dispatch(remove(id));
  if (response.ok) {
    await response.json();
    return response;
  }
};

//create a question
export const addNewQuestion = (question, user_id) => async dispatch => {
  const res = await fetch(`/api/questions/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, user_id }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addQuestion(data));
  }
};

//get questions for one user
export const getQuestions = (userId, sessionUserId) => async dispatch => {
  const response = await fetch(`/api/questions/myquestions/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionUserId }),
  });

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

//get all questions for one user
export const getAllQuestions = sessionUserId => async dispatch => {
  const response = await fetch(`/api/questions/all`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionUserId }),
  });

  if (response.ok) {
    const questions = await response.json();
    dispatch(loadAllQuestion(questions));
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

//get questions for everyone a user follows

export const getFollowedQuestions = sessionUser => async dispatch => {
  const response = await fetch(`/api/questions/follows`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionUser }),
  });

  if (response.ok) {
    const questions = await response.json();
    dispatch(loadFollowsQuestion(questions));
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

//edit a question

export const editQuestion = (id, question) => async dispatch => {
  const res = await fetch(`/api/questions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (res.ok) {
    const questions = await res.json();
    dispatch(loadQuestion(questions));
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
        // ...state,
        ...newQuestions,
      };
    }
    case LOAD_FOLLOWS_QUESTION: {
      return {
        // ...state,
        ...action.questions,
      };
    }
    case LOAD_ALL_QUESTION: {
      return {
        // ...state,
        ...action.questions,
      };
    }
    case REMOVE_QUESTION: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case REMOVE_USER: {
      return {};
    }
    default:
      return state;
  }
}
