import { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../api/quizApi';

const useQuizData = (amount = 15) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchQuizQuestions(amount);
        if (isMounted) setQuestions(data);
      } catch (err) {
        if (isMounted) setError(err?.message || 'Failed to load quiz questions');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadQuestions();

    return () => {
      isMounted = false; 
    };
  }, [amount]);

  return { questions, loading, error };
};

export default useQuizData;
