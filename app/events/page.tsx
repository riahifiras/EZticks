import React from 'react'
import Header from '../components/Header'
import FilterSideBar from '../components/FilterSideBar'
import EventList from '../components/EventList'
import Nav from '../components/Nav'


const EventsPage = () => {
  return (
    <div>
      <Nav/>
      <Header/>
      <div className='flex h-fit'>
      <FilterSideBar/>
      <EventList />
      </div>
    </div>
  )
}

export default EventsPage