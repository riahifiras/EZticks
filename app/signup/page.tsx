"use client"

import { useState } from "react";
import { Container } from "../components/Container";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignUp } from "../lib/cognitoActions";
import Link from "next/link";

export default function SignupPage() {
  const [errorMessage, dispatch] = useFormState(handleSignUp, undefined);
  const { pending } = useFormStatus();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous errors
    setNameError(null);
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmationError(null);
    setError(null);

    // Validate name
    if (!name.trim()) {
      setNameError("Name cannot be empty.");
    }

    // Validate username
    if (!username.trim()) {
      setUsernameError("Username cannot be empty.");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    }

    // Validate password requirements (e.g., minimum length)
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    }

    // Validate password confirmation
    if (password !== passwordConfirmation) {
      setPasswordConfirmationError("Passwords do not match.");
    }

    // If there are errors, prevent submission
    if (nameError || usernameError || emailError || passwordError || passwordConfirmationError) {
      return;
    }

    // Example: Perform signup logic here
    try {
      // Replace with actual signup logic (e.g., API call)
      console.log("Signing up with:", name, username, email, password);
      // Example: redirect to dashboard after successful signup
      // Router.push('/dashboard');
    } catch (error) {
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <Container className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form action={dispatch} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${nameError ? 'border-none' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-700 ${nameError ? 'ring-2 ring-red-500' : ''}`}
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${usernameError ? 'border-none' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-700 ${usernameError ? 'ring-2 ring-red-500' : ''}`}
            />
            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${emailError ? 'border-none' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-700 ${emailError ? 'ring-2 ring-red-500' : ''}`}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${passwordError ? 'border-none' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-700 ${passwordError ? 'ring-2 ring-red-500' : ''}`}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${passwordConfirmationError ? 'border-none' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-700 ${passwordConfirmationError ? 'ring-2 ring-red-500' : ''}`}
            />
            {passwordConfirmationError && <p className="text-red-500 text-sm mt-1">{passwordConfirmationError}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 main_btn"
              aria-disabled={pending}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-700 hover:text-blue-700">
            Log In
          </Link>
        </p>
        {errorMessage && (
              <>
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
      </div>
    </Container>
  );
}
