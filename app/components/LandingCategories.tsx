import React from 'react'
import entertainmentImage from '../assets/images/entertainment.png'
import educationalImage from '../assets/images/educational.png'
import culturalImage from '../assets/images/cultural.png'
import sportsImage from '../assets/images/sports.png'
import technologyImage from '../assets/images/technology.png'
import travelImage from '../assets/images/travel.png'
import LandingCategory from './LandingCategory'


const LandingCategories = () => {

    const categories = [
        {categoryImage: entertainmentImage, categoryName: "Entertainment"},
        {categoryImage: educationalImage, categoryName: "Educational & Business"},
        {categoryImage: culturalImage, categoryName: "Cultural & Arts"},
        {categoryImage: sportsImage, categoryName: "Sports & Fitness"},
        {categoryImage: technologyImage, categoryName: "Technology & Innovation"},
        {categoryImage: travelImage, categoryName: "Travel & Adventure"},
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
