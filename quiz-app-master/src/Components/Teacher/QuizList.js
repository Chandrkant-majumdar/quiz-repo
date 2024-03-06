import React from "react";
import { Button } from "@mui/material";

function QuizList({ quizzes, onDeleteQuiz, onEditQuiz }) {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Quizzes</h2>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={index} className="mb-4 flex items-center">
            <h3 className="text-lg font-semibold mr-2">{quiz.title}</h3>
            <div className="ml-auto space-x-2">
              {/* <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onEditQuiz(quiz.id)}
              >
                Edit
              </Button> */}
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => onDeleteQuiz(quiz.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Button
        variant="outlined"
        color="primary"
        href="/create-quiz"
        className="block mt-4"
      >
        Create New Quiz
      </Button>
    </div>
  );
}

export default QuizList;
