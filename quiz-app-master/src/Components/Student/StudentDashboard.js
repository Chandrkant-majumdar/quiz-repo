import React, { useState, useEffect } from "react";
import Nav from "../../Scatrch/Navbar";
import UserInfo from "./StudentInfo";
import QuizHistory from "../Quiz/QuizHistory";
import AvailableQuizzes from "./AvailableQuizzes";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid } from "@mui/material";
import StudentLogo from "./logo.png"; // Import your student logo image file
// import "../../css/Header-Blue.css";
// import "../../fonts/font-awesome.min.css";
// import "../../fonts/fontawesome-webfont.eot";
// import "../../fonts/fontawesome-webfont.svg";
// import "../../fonts/fontawesome-webfont.ttf";
// import "../../fonts/fontawesome-webfont.woff";
// import "../../fonts/fontawesome-webfont.woff2";
// import "../../fonts/FontAwesome.otf";
const StudentDashboard = () => {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [userData, setUserData] = useState(null); // Initialize userData as null
  const { studentId } = useParams();

  useEffect(() => {
    // Fetch available quizzes from the backend
    fetch("http://localhost:8080/api/quizzes")
      .then((response) => response.json())
      .then((data) => {
        setAvailableQuizzes(data);
      })
      .catch((error) =>
        console.error("Error fetching available quizzes:", error)
      );

    // Fetch user data from the backend based on studentId
    fetch(`http://localhost:8080/users/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data); // Update userData state with fetched user data
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [studentId]);

  return (
    <>
      <div className="bg-blue-500 py-4">
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
              <img
                src={StudentLogo}
                alt="Student Logo"
                className="w-24 h-auto"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h1"
                component="h1"
                className="text-3xl font-bold mb-4"
              >
                Student Dashboard
              </Typography>
            </Grid>
          </Grid>
          {userData && (
            <>
              <UserInfo userData={userData} />
              <QuizHistory userData={userData} />
              <AvailableQuizzes
                availableQuizzes={availableQuizzes}
                studentId={studentId}
              />
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default StudentDashboard;
