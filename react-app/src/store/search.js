//get questions for one user
const LOAD_SEARCH = "search/LOAD";
const CLEAR_SEARCH = "search/CLEAR";

const searchQuestion = searchRes => ({
  type: LOAD_SEARCH,
  searchRes,
});

const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

const initialState = {};

//get questions for one user
export const getSearch = query => async dispatch => {
  const response = await fetch(`/api/questions/search/${query}`);

  if (response.ok) {
    const questions = await response.json();
    dispatch(searchQuestion(questions));
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

export const clearQuery = () => async dispatch => {
  dispatch(clearSearch());
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SEARCH: {
      return {
        // ...state,
        ...action.searchRes,
      };
    }
    case CLEAR_SEARCH: {
      return {};
    }
    default:
      return state;
  }
}
