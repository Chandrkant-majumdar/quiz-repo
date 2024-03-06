import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

function QuizHistory({ userData }) {
  const [quizHistory, setQuizHistory] = useState([]);
  const [expandedSubmissionId, setExpandedSubmissionId] = useState(null);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/usersubmissions/${userData.userId}`
        );
        setQuizHistory(response.data);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      }
    };

    fetchQuizHistory();
  }, [userData.userId]);

  const handleToggleDetails = (submissionId) => {
    setExpandedSubmissionId(
      expandedSubmissionId === submissionId ? null : submissionId
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      {quizHistory.map((submission) => (
        <div key={submission.id} className="mb-6 border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">
            Quiz: {submission.quiz.title}
          </h3>
          <p className="text-gray-600 mb-2">Score: {submission.score}</p>
          <Button
            variant="contained"
            onClick={() => handleToggleDetails(submission.id)}
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            {expandedSubmissionId === submission.id
              ? "Hide Details"
              : "View Details"}
          </Button>
          {expandedSubmissionId === submission.id && (
            <div className="mt-4">
              <ul>
                {submission.questionSubmissions.map(
                  (questionSubmission, index) => (
                    <li key={index} className="mt-4">
                      <p className="text-lg font-semibold mb-1">
                        Question: {questionSubmission.question.text}
                      </p>
                      <p className="text-base text-gray-700">
                        User Answer: {questionSubmission.userAnswer}
                      </p>
                      <p className="text-base text-gray-700">
                        Correct Answer:{" "}
                        {questionSubmission.question.correctAnswer}
                      </p>
                      <p className="text-base text-gray-700">
                        Explanation: {questionSubmission.question.explanation}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuizHistory;
