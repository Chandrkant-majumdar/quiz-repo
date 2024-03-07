import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Scatrch/Navbar";
import QuizList from "./QuizList";
import TestStatistics from "./TestStatistics";
import UserInfo from "../Student/StudentInfo";
import { useParams } from "react-router-dom";
import TeacherInfo from "./TeacherInfo";
import axios from "axios";
import logo from "./logo.png";
import { Container, Typography, Grid } from "@mui/material";

function TeacherDashboard() {
  // State for storing list of quizzes
  const [quizzes, setQuizzes] = useState([]);
  // State for storing quiz statistics
  const [quizStatistics, setQuizStatistics] = useState({});
  //const { teacherId } = useParams();
  const [userData, setUserData] = useState(null);
  let { teacherId } = useParams();
  // console.log(studentId);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${teacherId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [teacherId]);
  useEffect(() => {
    // Fetch data from backend or API on component mount
    // Fetch list of quizzes
    fetch("http://localhost:8080/api/quizzes")
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error("Error fetching quizzes:", error));

    // Fetch quiz statistics
    // fetch("http://localhost:8080/api/quizStatistics")
    //   .then((response) => response.json())
    //   .then((data) => setQuizStatistics(data))
    //   .catch((error) =>
    //     console.error("Error fetching quiz statistics:", error)
    //   );
  }, []);

  // Function to handle quiz deletion
  const handleDeleteQuiz = (quizId) => {
    // Make DELETE request to backend to delete quiz
    //  console.log(quizId);
    fetch(`http://localhost:8080/api/quizzes/${quizId}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          // If deletion is successful, update quizzes state to remove the deleted quiz

          setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
          console.log("Quiz deleted successfully.");
        } else {
          console.error("Failed to delete quiz.");
        }
      })
      .catch((error) => console.error("Error deleting quiz:", error));
  };

  // Function to handle quiz editing
  const handleEditQuiz = (quizId) => {
    // Navigate to the edit quiz page or open a modal for editing the quiz
    console.log(`Editing quiz with ID: ${quizId}`);
  };

  return (
    <>
      <div className="bg-blue-500 py-4 font-bold">
        <Nav
          brandText="Quiz Management System"
          menuItems={[
            {
              text: `Logout (${userData?.username})`,
              link: "/",
            },
          ]}
        />
      </div>

      <div className="bg-gradient-to-b from-blue-500 to-purple-500">
        <Container maxWidth="lg" className="py-8 text-black">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <img src={logo} alt="Student Logo" className="w-24 h-auto" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h1"
                component="h1"
                className="text-3xl font-bold mb-4"
              >
                Teacher Dashboard
              </Typography>
            </Grid>
          </Grid>
          <TeacherInfo userData={userData} />
          {/* Display list of quizzes */}
          <QuizList
            quizzes={quizzes}
            onDeleteQuiz={handleDeleteQuiz}
            onEditQuiz={handleEditQuiz}
          />
          {/* Test Statistics Section */}
          <TestStatistics teacherId={teacherId} />
        </Container>
      </div>
    </>
  );
}

export default TeacherDashboard;
