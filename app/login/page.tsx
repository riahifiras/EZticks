"use client"

import { useState } from "react";
import { Container } from "../components/Container";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }

    // Validate password requirements (e.g., minimum length)
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError(null);
    }

    // If there are errors, prevent submission
    if (emailError || passwordError) {
      return;
    }

    // Example: Perform login logic here
    try {
      // Replace with actual login logic (e.g., API call)
      console.log("Logging in with:", email, password);
      // Example: redirect to dashboard after successful login
      // Router.push('/dashboard');
    } catch (error) {
      setEmailError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container className="flex justify-center items-center h-[90vh]">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <section className="mb-4">
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
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-700 ${emailError ? 'ring-2 ring-red-500' : ''}`}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </section>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-700 ${passwordError ? 'ring-2 ring-red-500' : ''}`}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 main_btn"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-700 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </Container>
  );
}
