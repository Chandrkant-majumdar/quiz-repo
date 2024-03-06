import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Collapse } from "@mui/material";

function TestStatistics() {
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:8080/usersubmissions")
      .then((response) => {
        setUserSubmissions(response.data); // Assuming the response directly contains the user submissions data
      })
      .catch((error) => {
        console.error("Error fetching user submissions:", error);
      });
  }, []);

  const handleButtonClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const calculateStatistics = () => {
    let totalMarks = 0;
    let maxMarks = 0;
    let userWithHighestMark = null;

    userSubmissions.forEach((submission) => {
      totalMarks += submission.score;

      if (submission.score > maxMarks) {
        maxMarks = submission.score;
        userWithHighestMark = submission.user.fullName;
      }
    });

    const averageMark =
      userSubmissions.length > 0 ? totalMarks / userSubmissions.length : 0;

    return { maxMarks, averageMark, userWithHighestMark };
  };

  const { maxMarks, averageMark, userWithHighestMark } = calculateStatistics();

  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-bold mb-4">Test Statistics</h2>
      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <p className="mb-2">
          Number of User Submissions: {userSubmissions.length}
        </p>
        <p className="mb-2">Maximum Mark: {maxMarks}</p>
        <p className="mb-2">Average Mark: {averageMark}</p>
        <p className="mb-2">User with Highest Mark: {userWithHighestMark}</p>
      </div>
      {userSubmissions.map((submission, index) => (
        <div key={index} className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">
            Quiz: {submission.quiz.title}
          </h3>
          <p className="mb-2">User: {submission.user.fullName}</p>
          <p className="mb-2">User ID: {submission.user.userId}</p>
          <p className="mb-2">Score: {submission.score}</p>
          <Button
            variant="contained"
            onClick={() => handleButtonClick(index)}
            className="mt-2"
          >
            {openIndex === index ? "Hide Details" : "Show Details"}
          </Button>
          <Collapse in={openIndex === index}>
            <div className="mt-2">
              <h4 className="text-lg font-bold mb-2">
                Question-wise Performance
              </h4>
              <ul>
                {submission.questionSubmissions.map((question, subIndex) => (
                  <li key={subIndex} className="mb-2">
                    <p>Question: {question.question.text}</p>
                    <p>User Answer: {question.userAnswer}</p>
                    <p>Correct Answer: {question.question.correctAnswer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default TestStatistics;
