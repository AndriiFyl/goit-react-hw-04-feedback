// Хуки=================================================================
// вместо import {Component} импортируем {useState}*********************
import { useState } from 'react';
import css from './Feedback.module.css';
import Statistics from 'components/Feedback/Statistics';
import FeedbackOptions from 'components/Feedback/FeedbackOptions';
import Section from 'components/Feedback/Section';
import Notification from 'components/Feedback/Notification';

export default function Feedback() {
  // 0 в useState это базовое значение каждной из кнопок****************
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // методы класса переписываем на функции
  const addFeedbackIncrement = type => {
    // устанавливаем switch - чтобы записать свойство в соответствуюющее свойство
    switch (type) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        throw new Error(`Unknows feedback type - ${type}`);
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Number.isNaN(Math.round((good / countTotalFeedback()) * 100))
      ? 0
      : Math.round((good / countTotalFeedback()) * 100);
  };

  return (
    <div className={css.Feedback__wrapper}>
      <Section title={'Please live feedback'}>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
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

// // Классовий Компонент VERSION=======================================
// import React from 'react';
// import css from './Feedback.module.css';
// import Statistics from 'components/Feedback/Statistics';
// import FeedbackOptions from 'components/Feedback/FeedbackOptions';
// import Section from 'components/Feedback/Section';
// import Notification from 'components/Feedback/Notification';

// class Feedback extends React.Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   addFeedbackIncrement = btnName => {
//     this.setState(prevState => ({
//       [btnName]: prevState[btnName] + 1,
//     }));
//     console.log([btnName]);
//   };

//   countTotalFeedback = () => {
//     return this.state.good + this.state.neutral + this.state.bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//     return Number.isNaN(
//       Math.round((this.state.good / this.countTotalFeedback()) * 100)
//     )
//       ? 0
//       : Math.round((this.state.good / this.countTotalFeedback()) * 100);
//   };

//   render() {
//     // деструктуризуруем объекты и методы класса
//     const { good, neutral, bad } = this.state;
//     const {
//       state,
//       addFeedbackIncrement,
//       countTotalFeedback,
//       countPositiveFeedbackPercentage,
//     } = this;

//     console.log(Object.keys(state));
//     return (
//       <div className={css.Feedback__wrapper}>
//         <Section title={'Please live feedback'}>
//           <FeedbackOptions
//             options={Object.keys(state)}
//             onLeaveFeedback={addFeedbackIncrement}
//           />
//         </Section>

//         {countTotalFeedback() > 0 && (
//           <Section title={'Statistics'}>
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={countTotalFeedback()}
//               positivePercentage={countPositiveFeedbackPercentage()}
//             />
//           </Section>
//         )}
//         {countTotalFeedback() === 0 && (
//           <Notification message={'There is no feedback'} />
//         )}
//       </div>
//     );
//   }
// }

// export default Feedback;
