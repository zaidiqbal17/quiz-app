import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function ReportPage() {
  const [userAnswers, setUserAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('userQuizAnswers'));
    const storedQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    const storedEmail = localStorage.getItem('userEmail');

    if (!storedAnswers || !storedQuestions || storedQuestions.length === 0) {
      alert('No quiz data found. Please start the quiz first to see a report.');
      navigate('/');
      return;
    }

    setUserAnswers(storedAnswers);
    setQuestions(storedQuestions);
    setUserEmail(storedEmail || 'N/A');

    // Calculate score
    let correctCount = 0;
    storedQuestions.forEach((question, index) => {
      if (storedAnswers[index] === question.correct_answer) correctCount++;
    });
    setScore(correctCount);
  }, [navigate]);

  const handleGoHome = () => {
    localStorage.removeItem('userQuizAnswers');
    localStorage.removeItem('quizQuestions');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700 bg-gray-50">
        Loading Report or No quiz data available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📊 Quiz Report</h2>

        {/* Score Summary */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-md text-center shadow-sm">
          <p className="text-xl font-medium text-gray-700 mb-2">
            User: <span className="text-blue-700 font-semibold">{userEmail}</span>
          </p>
          <p className="text-2xl font-semibold text-gray-700">
            You scored: <span className="text-blue-600">{score}</span> / {questions.length}
          </p>
          <p className="text-lg text-gray-600 mt-2">
            ({((score / questions.length) * 100).toFixed(2)}%)
          </p>
        </div>

        {/* Questions with Answers */}
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.correct_answer;

          return (
            <div key={index} className="mb-6 p-6 rounded-lg shadow-sm border bg-gray-50">
              <p
                className="text-lg font-semibold text-gray-900 mb-4"
                dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.question}` }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User Answer */}
                <div
                  className={`p-4 rounded-lg font-bold ${
                    isCorrect
                      ? 'bg-green-100 text-green-700 border border-green-400'
                      : 'bg-red-100 text-red-700 border border-red-400'
                  }`}
                >
                  Your Answer: <span dangerouslySetInnerHTML={{ __html: userAnswer || 'Not Attempted' }} />
                </div>

                {/* Correct Answer */}
                <div className="p-4 rounded-lg bg-green-50 text-green-700 font-bold border border-green-300">
                  Correct Answer: <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
                </div>
              </div>

              {/* Status */}
              {!isCorrect && userAnswer && <p className="text-red-500 text-sm mt-2 font-bold">❌ Status: Incorrect</p>}
              {!userAnswer && <p className="text-gray-500 text-sm mt-2 font-bold">⚠ Status: Not Attempted</p>}
              {isCorrect && <p className="text-green-600 text-sm mt-2 font-bold">✅ Status: Correct</p>}
            </div>
          );
        })}

        {/* Go Home Button */}
        <div className="text-center mt-8">
          <Button onClick={handleGoHome} className="w-auto" variant="primary">
            Go to Home / Take Another Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
