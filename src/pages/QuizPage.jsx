import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizData from '../hooks/useQuizData';
import Timer from '../components/Timer';

function QuizPage() {
  const { questions, loading, error } = useQuizData(15);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  // ✅ Save data only if questions are loaded
  const endQuiz = () => {
    if (questions.length > 0) {
      localStorage.setItem('userQuizAnswers', JSON.stringify(userAnswers));
      localStorage.setItem('quizQuestions', JSON.stringify(questions));
      navigate('/report');
    } else {
      alert('No quiz data to submit!');
    }
  };

  const handleOptionSelect = (selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endQuiz(); // ✅ Submit quiz after last question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleTimeUp = () => {
    alert('⏰ Time is up! Submitting your answers.');
    endQuiz();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading Quiz...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-xl text-red-600">Error loading quiz: {error.message}</div>;
  if (questions.length === 0) return <div className="min-h-screen flex items-center justify-center text-xl">No questions available.</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
          <Timer initialMinutes={30} onTimeUp={handleTimeUp} />
        </div>

        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-900 mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full py-3 px-4 text-left rounded-lg border-2
                  ${userAnswers[currentQuestionIndex] === option
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                  } transition duration-200`}
                onClick={() => handleOptionSelect(option)}
                dangerouslySetInnerHTML={{ __html: option }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
