import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const locales = { 
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})


// This is dummy events, we would implement our database to get actual events
const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023,10,0),
    end: new Date(2023,10,0),
    participants: [],
  },
  {
    title: "Vacation",
    start: new Date(2023,9,17),
    end: new Date(2023,9,20),
    participants: [],
    
  },
  {
    title: "Conference",
    start: new Date(2023,9,25),
    end: new Date(2023,9,25),
    participants: [],
  },

]

function CustomEvent({event}){
  const handleParticipants = () => {
    event.participants.push("Database time");
  }

  return (
    <div className='custom-event'>
      <div>{event.title}</div>
      <div>Participants: {event.participants.length > 0 ? event.participants.join(", ") : "No participants yet"}</div>
      <button onClick={handleParticipants}>Join Event</button>
    </div>
  )
}

function App() {
  const [newEvent, setNewEvent] = useState({title: "", start: "", end: "", description: ""})
  const [allEvents, setAllEvents] = useState(events)

  function handleAddEvent() {
    setAllEvents([...allEvents,newEvent])
  }


  return (
    <div className='App'>
      <h1>
        Calendar
      </h1>
      <h2>Add New Event</h2>
      <div>
        <input type="text" placeholder='Add Title 255 characters' style={{ width: "20%", marginRight: "10px"}}
          value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} required maxLength={255}
        />
        <input type="text" placeholder='Add description 600 characters' style={{ width: "15%", height: "75px", marginRight: "10px", justifyContent:"center", alignItems:"flex-start"}}
          value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} required maxLength={600}
        />
        <DatePicker placeholderText="Start Date" style={{marginRight: "10px"}}
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent,start})}/>
        <DatePicker placeholderText="End Date"
        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent,end})}/>
        <button style={{marginTop: "10px"}} onClick={handleAddEvent}>Add Event</button>
      </div>
      <Calendar 
      localizer={localizer} events={allEvents} 
      startAccessor="start" endAccessor="end"
      style={{ height: 500, margin: "50px" }} 
        components={{ event: CustomEvent}}
      />
    </div>
  );
}

export default App;
