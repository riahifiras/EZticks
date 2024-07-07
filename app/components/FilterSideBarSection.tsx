import React from 'react'

const FilterSideBarSection = ({filter}) => {
  return (
    <div className='py-4 flex flex-col gap-4'>
        <h5 className='font-semibold text-2xl'>{filter.filterCategory}</h5>
        <ul>
            {filter.filterOptions.map((element, index) => {
                return(
                    <div className='flex gap-4 items-center' key={index}>
                        <input type="checkbox" name={"option"+index} id={index} />
                        <label className='text-lg' htmlFor={"option"+index}>{element}</label>
                    </div>
                )
            })}
        </ul>
    </div>
  )
}

export default FilterSideBarSection