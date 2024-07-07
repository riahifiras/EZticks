import React from 'react'
import Header from '../components/Header'
import FilterSideBar from '../components/FilterSideBar'
import EventList from '../components/EventList'


const EventsPage = () => {
  return (
    <div>
      <Header/>
      <div className='flex h-fit'>
      <FilterSideBar/>
      <EventList />
      </div>
    </div>
  )
}

export default EventsPage