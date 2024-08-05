"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useAuthUser from "../hooks/use-auth-user";
import { IoTicketOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

const Nav = () => {
  const user = useAuthUser();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  return (
    <nav ref={navRef} className="bg-white dark:bg-[#2B293D] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="https://flowbite.com/docs/images/logo.svg" width={32} height={32} alt="EZticks Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EZticks</span>
        </a>
        <div className="flex gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? 
          <div className="flex gap-4 items-center">
            <Link href="#" className="flex flex-col justify-center items-center text-white gap-1">
              <div className="text-2xl">
              <IoTicketOutline/>
              </div>
              <h4 className="text-sm">Tickets</h4>
            </Link>
            <Link href="#" className="flex flex-col justify-center items-center text-white gap-1">
              <div className="text-2xl">
              <FaRegStar/>
              </div>
              <h4 className="text-sm">Interested</h4>
            </Link>
            <Link href="#" className="flex flex-col justify-center items-center text-white gap-1">
              <div className="text-2xl">
              <CgProfile/>
              </div>
              <h4 className="text-sm">Profile</h4>
            </Link>
          </div> :
            <>
              <Link
                href="#"
                className="block py-2 px-3 text-white bg-transparent "
                aria-current="page"
              >
                Login
              </Link>
              <button
                type="button"
                className="main_btn font-medium text-sm px-4"
              >
                Sign Up
              </button>
            </>}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={openDropdown !== null}
            onClick={() => toggleMenu()}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${isMenuOpen !== false ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#2B293D] md:dark:bg-[#2B293D] dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-transparent "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="block py-2 px-3 text-white bg-transparent "
                aria-current="page"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-white bg-transparent "
                aria-current="page"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-white bg-transparent "
                aria-current="page"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
