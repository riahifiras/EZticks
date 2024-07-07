import React from 'react'
import FilterSideBarSection from './FilterSideBarSection'

const FilterSideBar = () => {

    const filters = [
        {
            filterCategory: "Price",
            filterOptions: [
                "Free",
                "Paid"
            ]
        },
        {
            filterCategory: "Date",
            filterOptions: [
                "Today",
                "Tomorrow",
                "This Week",
                "This Weekend",
                "Pick a Date"
            ]
        },
        {
            filterCategory: "Category",
            filterOptions: [
                "Adventure Travel",
                "Art Exhibitions",
                "Auctions & Fundraisers",
                "Beer Festivals",
                "Benefit Concerts"
            ]
        },
        {
            filterCategory: "Format",
            filterOptions: [
                "Community Engagement",
                "Concerts & Performances",
                "Conferences",
                "Experiential Events",
                "Festivals & Fairs"
            ]
        }
    ]

    return (
        <div className='flex flex-col gap-8 p-10 border-r-2 h-full w-[24vw]'>
            <h4 className='font-bold text-3xl'>Filters</h4>
            <div className='flex flex-col divide-y'>
                {filters.map((element, index) => {
                    return (
                        //@ts-ignore
                        <FilterSideBarSection key={index} filter={element} />
                    )
                })}
            </div>
        </div>
    )
}

export default FilterSideBar