//create a ANSWER
const ADD_ANSWER = "ANSWERS/ADD";

//get ANSWERs for one user
const LOAD_ANSWER = "ANSWERS/LOAD";

//remove a ANSWER
const REMOVE_ANSWER = "ANSWERS/REMOVE";

const initialState = {};

const addAnswer = answer => ({
  type: ADD_ANSWER,
  answer,
});

const loadAnswer = answers => ({
  type: LOAD_ANSWER,
  answers,
});

const remove = id => ({
  type: REMOVE_ANSWER,
  id,
});
// delete a ANSWER
export const deleteAnswer = id => async dispatch => {
  const response = await fetch(`/api/answers/${id}`, {
    method: "DELETE",
  });
  dispatch(remove(id));
  if (response.ok) {
    await response.json();
    return response;
  }
};

//create a ANSWER
export const addNewAnswer = (body, userId, questionId) => async dispatch => {
  const res = await fetch(`/api/answers/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: body,
      user_id: userId,
      question_id: questionId,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addAnswer(data));
  }
};

//get ANSWERs for one user
export const getAnswers = userId => async dispatch => {
  const response = await fetch(`/api/answers/${userId}`);

  if (response.ok) {
    const answers = await response.json();
    dispatch(loadAnswer(answers));
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

//edit a ANSWER

export const editAnswer = (id, answer) => async dispatch => {
  const res = await fetch(`/api/ANSWERs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer }),
  });

  if (res.ok) {
    const answers = await res.json();
    dispatch(loadAnswer(answers));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ANSWER: {
      if (action.answer.id) {
        const newState = {
          ...state,
          [action.answer.id]: action.answer,
        };
        return newState;
      } else {
        return state;
      }
    }
    case LOAD_ANSWER: {
      const newAnswer = {};
      Object.values(action.answer).forEach(element => {
        newAnswer[element.id] = element;
      });
      return {
        ...state,
        ...newAnswer,
      };
    }
    case REMOVE_ANSWER: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
}
