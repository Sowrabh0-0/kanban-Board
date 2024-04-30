// src/components/Auth/SignupForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../app/features/user/userSlice';
import { AppDispatch } from '../../app/store'; 


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch: AppDispatch = useDispatch(); 


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createUser({name,email,password }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
