import React from "react";
import LoginForm from "../Auth/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
