import React from 'react'
import partyImage from '../assets/images/party.jpg'
import LandingCategory from './LandingCategory'


const LandingCategories = () => {

    const categories = [
        {categoryImage: partyImage, categoryName: "Entertainment"},
        {categoryImage: partyImage, categoryName: "Educational & Business"},
        {categoryImage: partyImage, categoryName: "Cultural & Arts"},
        {categoryImage: partyImage, categoryName: "Sports & Fitness"},
        {categoryImage: partyImage, categoryName: "Technology & Innovation"},
        {categoryImage: partyImage, categoryName: "Travel & Adventure"},
    ]

  return (
    <div className='flex flex-col gap-12 py-12'>
      <h1 className='text-3xl font-bold'>Explore Categories</h1>
      <div className='flex justify-between px-4'>
      {categories.map((category, index) => <LandingCategory categoryImage={category.categoryImage} categoryName={category.categoryName}/>)}
    </div>
    </div>
  )
}

export default LandingCategories
