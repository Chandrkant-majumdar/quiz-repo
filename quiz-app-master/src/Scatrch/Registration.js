import React, { useState } from "react";
import Nav from "./Navbar";
import "../css/Login-Form-Clean.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [role, setRole] = useState("student"); // Default role is student

  const departmentOptions = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
  ];
  const courseOptions = ["B.Tech", "M.Tech", "B.E", "M.E"];

  function handleSubmit(event) {
    event.preventDefault();

    // Validate data
    if (
      !userName ||
      !password ||
      !email ||
      !fullName ||
      !userId ||
      !department ||
      !course
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const user = {
      username: userName,
      password: password,
      email: email,
      fullName: fullName,
      userId: userId,
      department: department,
      course: course,
      role: role, // Include role in the user object
    };

    axios
      .post(`http://localhost:8080/signup`, user)
      .then(() => {
        alert("Registration Successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }

  function updateUserName(e) {
    setUserName(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  function updateEmail(e) {
    setEmail(e.target.value);
  }

  function updateFullName(e) {
    setFullName(e.target.value);
  }

  function updateUserId(e) {
    setUserId(e.target.value);
  }

  function updateDepartment(e) {
    setDepartment(e.target.value);
  }

  function updateCourse(e) {
    setCourse(e.target.value);
  }

  function updateRole(e) {
    setRole(e.target.value);
  }

  return (
    <div>
      <Nav
        brandText="Quiz Management System"
        menuItems={[
          { link: "/login", text: "Login" },
          { link: "/registration", text: "Register" },
        ]}
      />
      <section className="login-clean">
        <form onSubmit={handleSubmit}>
          <h2 className="visually-hidden">Signup Form</h2>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="userName"
              onChange={updateUserName}
              value={userName}
              placeholder="User Name"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={updateEmail}
              value={email}
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="fullName"
              onChange={updateFullName}
              value={fullName}
              placeholder="Full Name"
            />
          </div>
          <div className="mb-3 flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="student"
                checked={role === "student"}
                onChange={updateRole}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Student</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="teacher"
                checked={role === "teacher"}
                onChange={updateRole}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Teacher</span>
            </label>
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="userId"
              onChange={updateUserId}
              value={userId}
              placeholder={role === "student" ? "Student ID" : "Teacher ID"}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              onChange={updateDepartment}
              value={department}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              onChange={updateCourse}
              value={course}
            >
              <option value="" disabled>
                Select Course
              </option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary d-block w-100" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Registration;
