"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmSignUp } from "../../lib/cognitoActions";

export default function ConfirmSignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleConfirmSignUp, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="font-serif mb-3 text-2xl">Please confirm your account.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none placeholder-gray-500 focus:placeholder-gray-900 focus:border-gray-900"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M17 7v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3zM7 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6-2a1 1 0 1 0-2 0v4a1 1 0 0 0 2 0V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="code"
            >
              Code
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none placeholder-gray-500 focus:placeholder-gray-900 focus:border-gray-900"
                id="code"
                type="text"
                name="code"
                placeholder="Enter code"
                required
                minLength={6}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M17 7v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3zM7 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6-2a1 1 0 1 0-2 0v4a1 1 0 0 0 2 0V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <ConfirmButton />
        <div className="flex items-center mt-4">
          {errorMessage && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a9 9 0 0 1 6.36 15.36l-5.67-5.67 5.66-5.66A9 9 0 0 1 10 1zm0 2a7 7 0 0 0 0 14v-2a5 5 0 1 1 0-10V3z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={pending}
    >
      Confirm 
    </button>
  );
}
