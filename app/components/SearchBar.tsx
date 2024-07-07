"use client"

import { useState } from "react";

const SearchBar = () => {

    const states = [
        "Ariana",
        "Ben Arous",
        "Tunis",
        "Manouba",
        "Sfax",
        "Monastir",
        "Soussa",
        "Mahdia",
        "Gabes",
        "Nabeul",
        "Gafsa",
        "Kasserine",
        "Tatawine",
        "Bizerte",
        "Jandouba",
        "Kairaouene",
        "Sidi bouzid",
        "Beja",
        "Gbeli",
        "Jerba",
        "Mednine",
        "Touzeur",
        "Siliana",
        "Zaghouene",
        "Kef"
      ]
    
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState('Ariana');
    
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
      const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
      };

  return (
    <div className='relative'>
          <div
            onClick={toggleDropdown}
            className='cursor-pointer h-full m-0 px-4 py-4 bg-white w-[120px] border-l-2 text-black rounded-r-md'
          >
            {selectedOption}
          </div>
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 bg-white rounded-md shadow-lg'>
              
              {states.map((element, index) => {
                return (
                    <div
                    key={index}
                onClick={() => handleOptionClick(element)}
                className='px-4 py-2 cursor-pointer hover:bg-gray-200'
              >
                {element}
              </div>
                )
              })}
            </div>
          )}
        </div>
  )
}

export default SearchBar