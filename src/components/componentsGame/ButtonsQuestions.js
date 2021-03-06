import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { sendAssertions } from '../../actions';

const ButtonsQuestions = ({ descQuestion, btnEnable, funcAnswersYes, setCorrectAsw }) => {
  const { incorrect_answers: incorrectAnswers,
    correct_answer: correctAsw } = descQuestion;
  const { assertions } = useSelector(({ userInfo }) => userInfo.player);
  const dispatch = useDispatch();
  const [state, setState] = useState({ correctAnswer: '', wrongAnswer: '' });
  const setClassName = (bool) => {
    setState({ correctAnswer: 'correct-answer', wrongAnswer: 'wrong-answer' });
    funcAnswersYes(true);
    setCorrectAsw(bool);
    if (bool) {
      dispatch(sendAssertions(assertions + 1));
    }
  };
  return (
    <>
      <button
        onClick={ () => setClassName(true) }
        disabled={ btnEnable }
        className={ state.correctAnswer }
        type="button"
        data-testid="correct-answer"
      >
        { correctAsw }
      </button>
      { incorrectAnswers.map((incorrects, index) => (
        <button
          onClick={ () => setClassName(false) }
          disabled={ btnEnable }
          className={ state.wrongAnswer }
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${index}` }
        >
          { incorrects }
        </button>)) }
    </>
  );
};

export default ButtonsQuestions;

ButtonsQuestions.propTypes = {
  descQuestion: PropTypes.shape({
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
  }).isRequired,
  btnEnable: PropTypes.bool.isRequired,
  funcAnswersYes: PropTypes.func.isRequired,
  setCorrectAsw: PropTypes.func.isRequired,
};
