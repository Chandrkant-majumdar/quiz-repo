import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Collapse } from "@mui/material";

function TestStatistics({}) {
  const [quizStats, setQuizStats] = useState({});
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/usersubmissions")
      .then((response) => {
        const submissions = response.data;
        const quizStatistics = {};

        submissions.forEach((submission) => {
          const quizTitle = submission.quiz.title;

          if (!quizStatistics[quizTitle]) {
            quizStatistics[quizTitle] = {
              submissions: [],
              totalSubmissions: 0,
              maxMarks: 0,
              averageMark: 0,
              userWithHighestMark: "",
            };
          }

          quizStatistics[quizTitle].submissions.push(submission);
          quizStatistics[quizTitle].totalSubmissions++;
          quizStatistics[quizTitle].maxMarks = Math.max(
            quizStatistics[quizTitle].maxMarks,
            submission.score
          );
          quizStatistics[quizTitle].averageMark += submission.score;

          if (
            submission.score >
            (quizStatistics[quizTitle].userWithHighestMark?.score || 0)
          ) {
            quizStatistics[quizTitle].userWithHighestMark = {
              user: submission.user.fullName,
              score: submission.score,
            };
          }
        });

        // Calculate average mark for each quiz
        Object.keys(quizStatistics).forEach((quizTitle) => {
          quizStatistics[quizTitle].averageMark =
            quizStatistics[quizTitle].averageMark /
            quizStatistics[quizTitle].totalSubmissions;
        });

        setQuizStats(quizStatistics);

        // Initialize showMore state
        const initialShowMoreState = {};
        Object.keys(quizStatistics).forEach((quizTitle) => {
          initialShowMoreState[quizTitle] = {};
          quizStatistics[quizTitle].submissions.forEach((_, index) => {
            initialShowMoreState[quizTitle][index] = false;
          });
        });
        setShowMore(initialShowMoreState);
      })
      .catch((error) => {
        console.error("Error fetching user submissions:", error);
      });
  }, []);

  const toggleShowMore = (quizTitle, index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [quizTitle]: {
        ...prevShowMore[quizTitle],
        [index]: !prevShowMore[quizTitle][index],
      },
    }));
  };

  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-bold mb-4">Test Statistics</h2>
      {Object.keys(quizStats).map((quizTitle, index) => (
        <div key={index} className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Quiz: {quizTitle}</h3>
          <p className="mb-2">
            Number of Submissions: {quizStats[quizTitle].totalSubmissions}
          </p>
          <p className="mb-2">Maximum Mark: {quizStats[quizTitle].maxMarks}</p>
          <p className="mb-2">
            Average Mark: {quizStats[quizTitle].averageMark.toFixed(2)}
          </p>
          <p className="mb-2">
            User with Highest Mark:{" "}
            {quizStats[quizTitle].userWithHighestMark.user || "None"}
          </p>
          {quizStats[quizTitle].submissions.map((submission, subIndex) => (
            <div key={subIndex} className="mt-4 p-4 bg-white rounded shadow-md">
              <p>User: {submission.user.fullName}</p>
              <p>Score: {submission.score}</p>
              <Button
                onClick={() => toggleShowMore(quizTitle, subIndex)}
                variant="outlined"
                color="primary"
                size="small"
                className="mt-2"
              >
                {showMore[quizTitle][subIndex] ? "Show Less" : "Show More"}
              </Button>
              <Collapse in={showMore[quizTitle][subIndex]}>
                <div>
                  {/* Display all questions and answers */}
                  {submission.questionSubmissions.map(
                    (question, questionIndex) => (
                      <div key={questionIndex} className="mt-2">
                        <p>Question: {question.question.text}</p>
                        <p>User Answer: {question.userAnswer}</p>
                        <p>Correct Answer: {question.question.correctAnswer}</p>
                      </div>
                    )
                  )}
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TestStatistics;
