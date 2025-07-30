export const fetchQuizQuestions = async (amount = 15) => {
  const cacheKey = `quizQuestions_${amount}`;
  const API_URL = import.meta.env.VITE_API_URL;

  // Check cache in localStorage
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  let retries = 3;
  let delay = 2000;

  while (retries > 0) {
    try {
      const response = await fetch(`${API_URL}?amount=${amount}&type=multiple&encode=base64`);
      
      if (!response.ok) {
        if (response.status === 429) {
          await new Promise((res) => setTimeout(res, delay));
          retries--;
          delay *= 2;
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const processedQuestions = data.results.map((q) => {
        const question = atob(q.question);
        const correctAnswer = atob(q.correct_answer);
        const incorrectAnswers = q.incorrect_answers.map((ans) => atob(ans));

        const options = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

        return {
          question,
          options,
          correct_answer: correctAnswer,
          type: atob(q.type),
          difficulty: atob(q.difficulty),
          category: atob(q.category),
        };
      });

      localStorage.setItem(cacheKey, JSON.stringify(processedQuestions));
      return processedQuestions;

    } catch (error) {
      retries--;
      await new Promise((res) => setTimeout(res, delay));
      if (retries === 0) {
        return [];
      }
    }
  }
};
