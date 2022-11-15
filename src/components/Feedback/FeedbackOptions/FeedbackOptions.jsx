import React from 'react';
import css from './FeedbackOptions.module.css';
import PropTypes from 'prop-types';

// options = це масив назв кнопок, які потрібно створити ['good', 'neutral', 'bad']
const FeedbackOptions = ({ options, onLeaveFeedback }) => (
  <div className={css.Feedback__btn_wrapper}>
    {options.map(btnName => (
      <button
        className={css.Feedback__btn}
        type="button"
        name={btnName}
        key={btnName}
        onClick={() => onLeaveFeedback(btnName)}
      >
        {btnName}
      </button>
    ))}
  </div>
);

export default FeedbackOptions;

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};
