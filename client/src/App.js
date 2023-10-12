import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {EventForm} from './components/eventForm.js';


function App() {

// Leaving the following code blocks for reference to refactor to seperate forms/actions
  
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const response = await fetch('/api/events/')
  //     const json = await response.json()

  //     if (response.ok) {
  //       console.log(json)
  //       setEvents(json)

  //     }
  //   }
  //   fetchEvents()
  // }, [])

  // const fetchEvents = async () => {
  //   const response = await fetch('/api/events/');
  //   const json = await response.json();

  //   if (response.ok) {
  //     console.log(json);
  //     setEvents(json);
  //   }
  // };

  


 return (
    <EventForm> Event Form </EventForm>
 )

}


export default App;
