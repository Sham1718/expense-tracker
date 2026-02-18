import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const navigate=useNavigate();
    const{login}=useAuth();


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        const res= await loginUser({email,password});
        login(res.data.token);
        navigate("/");
        }catch(error){
            alert("login failed");
            console.log(error);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 shadow-md rounded-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Login
        </button>

        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          register
        </p>
      </form>
    </div>
  )
}

export default Login
