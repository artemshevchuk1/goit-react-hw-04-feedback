import { Container } from './App.styled';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Section } from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';
import { Notification } from 'components/Notification/Notification';
import { useState } from 'react';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return good > 0 ? Math.round((good / countTotalFeedback()) * 100) : 0;
  };

  const incrementStatistics = event => {
    switch (event) {
      case 'good':
        return setGood(prev => prev + 1);
      case 'neutral':
        return setNeutral(prev => prev + 1);
      case 'bad':
        return setBad(prev => prev + 1);
      default:
        return;
    }
  };

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          items={Object.keys({ good, neutral, bad })}
          incrementStatistics={incrementStatistics}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback === 0 ? (
          <Notification />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            goodPercent={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </Container>
  );
}
