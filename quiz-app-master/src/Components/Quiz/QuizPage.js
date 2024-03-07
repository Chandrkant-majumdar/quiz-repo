import React, { useState, useEffect } from "react";
import Nav from "../../Scatrch/Navbar";
import axios from "axios";
import { Button } from "@mui/material";
import { Timer, ArrowBack } from "@mui/icons-material";
import QuestionComponent from "./QuestionComponent";
import QuizNavigationButtons from "./QuizNavigationButtons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QuizInstructions from "./QuizInstructions";

function QuizPage() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(4); // Initial timer value in seconds
  const { studentId, quizId } = useParams();
  const [userData, setUserData] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Track quiz submission due to timer expiration
  const navigate = useNavigate();

  // Fetch quiz data from the backend
  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/quizzes/${quizId}`
      );
      setQuiz(response.data);
      setTimer(response.data.timeLimit);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  // Fetch user data from the backend based on studentId
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${studentId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [studentId]);

  // Effect to start the timer and handle countdown
  useEffect(() => {
    const countdownTimer = setTimeout(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        // Automatically submit the quiz when timer reaches zero
        handleSubmitQuiz();
        setQuizSubmitted(true); // Set quizSubmitted to true when timer expires
      }
    }, 1000); // Update timer every second

    // Clear the timer when the component unmounts or when the quiz is submitted
    return () => clearTimeout(countdownTimer);
  }, [timer]);

  // Fetch quiz data when the quizId changes
  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  // Handle submission of the quiz
  const handleSubmitQuiz = async () => {
    try {
      let score = 0;
      answers.forEach((answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
          score++;
        }
      });

      const data = {
        user: {
          email: userData.email,
          fullName: userData.fullName,
          userId: userData.userId,
          department: userData.department,
          course: userData.course,
          username: userData.username,
        },
        quiz: {
          Id: quiz.Id,
          title: quiz.title,
        },
        teacherId: quiz.teacherId,
        questionSubmissions: answers.map((answer, index) => ({
          question: quiz.questions[index],
          userAnswer: answer,
        })),
        score: score,
      };
      console.log(data);
      const response = await axios.post("http://localhost:8080/submit", data);
      alert("Quiz submitted:");
      navigate(`/Student-Dash/${studentId}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  // Handle submission of answers for each question
  const handleAnswerSubmit = (selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  return (
    <div>
      <div className="bg-blue-500 py-4">
        <Nav
          brandText="Quiz Management System"
          menuItems={[
            { text: "Login", link: "/login" },
            { text: "Register", link: "/registration" },
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        {!quizSubmitted &&
          !showInstructions &&
          timer > 0 &&
          quiz &&
          quiz.questions && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{quiz.title}</h2>
                <div className="flex items-center space-x-2">
                  <Timer />
                  <span className="text-lg">{timer} seconds</span>
                </div>
              </div>
              <QuestionComponent
                question={quiz.questions[currentQuestionIndex]}
                selectedOption={answers[currentQuestionIndex] || null}
                handleAnswerSubmit={handleAnswerSubmit}
              />
              <QuizNavigationButtons
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={quiz.questions.length}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                handleSubmitQuiz={handleSubmitQuiz}
                handleAnswerSubmit={handleAnswerSubmit}
              />
            </>
          )}
        {!quizSubmitted && showInstructions && (
          <QuizInstructions startQuiz={() => setShowInstructions(false)} />
        )}
        {(quizSubmitted || timer === 0) && (
          <div>
            <p>
              {timer === 0 ? "Time's up! " : ""}Quiz submitted due to timer
              expiration.
            </p>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(`/Student-Dash/${studentId}`)}
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
