import React, { useState } from "react";
import { Button } from "@mui/material";

const AvailableQuizzes = ({ availableQuizzes, studentId }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Function to handle starting the quiz
  const handleStartQuiz = (quizId) => {
    // Set the selected quiz
    setSelectedQuiz(quizId);
  };

  // Function to handle starting the actual test
  const handleStartTest = (quizId) => {
    // Navigate to the quiz page with the quizId and studentId
    window.location.href = `/quiz/${quizId}/${studentId}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Available Quizzes</h2>
      <ul>
        {availableQuizzes.map((quiz) => (
          <li key={quiz.id} className="mb-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
              {selectedQuiz === quiz.id ? (
                <div>
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">
                      Quiz Instructions
                    </h2>
                    <p className="text-gray-700">
                      Welcome to the quiz! Please read the instructions
                      carefully before starting.
                    </p>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>This quiz consists of multiple-choice questions.</li>
                      <li>
                        You will have a limited time to complete the quiz.
                      </li>
                      <li>Ensure you have a stable internet connection.</li>
                      <li>Once you start the quiz, the timer will begin.</li>
                      <li>
                        Click on the "Start Quiz" button when you're ready.
                      </li>
                    </ul>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStartTest(quiz.id)}
                  >
                    Start Test
                  </Button>
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStartQuiz(quiz.id)}
                >
                  Take Quiz
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableQuizzes;
