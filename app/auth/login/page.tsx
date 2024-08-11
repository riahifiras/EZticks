"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn } from "../../lib/cognitoActions";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(handleSignIn, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-l-[60px] h-screen bg-gray-50 p-40">
        <h1 className="mb-3 font-bold text-4xl">Login</h1>
        <div className="w-full">
          <div className="mt-8">
            <label
              className="mb-3 mt-5 block text-xl font-medium text-gray-900"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 p-4 text-lg outline-none placeholder-gray-500 focus:placeholder-gray-900 focus:border-gray-900"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <label
              className="mb-3 mt-5 block text-xl font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 p-4 text-lg outline-none placeholder-gray-500 focus:placeholder-gray-900 focus:border-gray-900"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex justify-start items-center gap-2 mt-2 ">
        Don't have an account?
          <Link href="/auth/signup" className="cursor-pointer text-blue-500">
            Sign up.
          </Link>
        </div>
        <div className="flex items-center mt-4">
          {errorMessage && (
            <div className="flex items-center">
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`bg-[#2B293D] text-white text-lg mt-8 font-medium py-4 rounded-md w-full ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={pending}
    >
      Log in 
    </button>
  );
}
