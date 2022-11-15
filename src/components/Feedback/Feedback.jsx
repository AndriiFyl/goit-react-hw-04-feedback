import React from 'react';
import css from './Feedback.module.css';
import Statistics from 'components/Feedback/Statistics';
import FeedbackOptions from 'components/Feedback/FeedbackOptions';
import Section from 'components/Feedback/Section';
import Notification from 'components/Feedback/Notification';

class Feedback extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  addFeedbackIncrement = btnName => {
    this.setState(prevState => ({
      [btnName]: prevState[btnName] + 1,
    }));
    console.log([btnName]);
  };

  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  countPositiveFeedbackPercentage = () => {
    return Number.isNaN(
      Math.round((this.state.good / this.countTotalFeedback()) * 100)
    )
      ? 0
      : Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };

  render() {
    // деструктуризуруем объекты и методы класса
    const { good, neutral, bad } = this.state;
    const {
      state,
      addFeedbackIncrement,
      countTotalFeedback,
      countPositiveFeedbackPercentage,
    } = this;

    console.log(Object.keys(state));
    return (
      <div className={css.Feedback__wrapper}>
        <Section title={'Please live feedback'}>
          <FeedbackOptions
            options={Object.keys(state)}
            onLeaveFeedback={addFeedbackIncrement}
          />
        </Section>

        {countTotalFeedback() > 0 && (
          <Section title={'Statistics'}>
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          </Section>
        )}
        {countTotalFeedback() === 0 && (
          <Notification message={'There is no feedback'} />
        )}
      </div>
    );
  }
}

export default Feedback;

// через event.target============================================
// addFeedbackIncrement = event => {
//   this.setState(prevState => ({
//     [event.target.name]: prevState[event.target.name] + 1,
//   }));
// };
