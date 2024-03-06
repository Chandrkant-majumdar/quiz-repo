import React from "react";

function TeacherInfo({ userData }) {
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Teacher Information</h2>
      <div className="text-lg text-gray-800">
        <p>
          <span className="font-semibold">Username:</span> {userData.username}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {userData.email}
        </p>
        <p>
          <span className="font-semibold">User ID:</span> {userData.userId}
        </p>
        <p>
          <span className="font-semibold">Full Name:</span> {userData.fullName}
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {userData.department}
        </p>
        <p>
          <span className="font-semibold">Course:</span> {userData.course}
        </p>
      </div>
    </div>
  );
}

export default TeacherInfo;
