"use client"
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const Header = () => {



  return (
    <div className='flex flex-col items-center gap-12 bg-[#2B293D] py-24'>
      <p className='text-3xl font-bold text-center text-white'>Explore a world of events. Find what excites you!</p>
      <div className='relative w-[80%] max-w-[800px] flex'>
        <input className='w-full outline-none px-6 py-4 text-xl rounded-l-md' type="text" placeholder='Search Events, Categories, Location,...' />
        <SearchBar/>
      </div>
    </div>
  );
};

export default Header;
