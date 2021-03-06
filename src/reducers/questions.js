import { GET_QUESTIONS } from '../actions';

const STATE_QUESTIONS = {
  questions: [],
};

function questions(state = STATE_QUESTIONS, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      questions: [...action.payload],
    };
  default:
    return state;
  }
}

export default questions;
