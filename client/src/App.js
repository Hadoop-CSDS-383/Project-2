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


// Be able to put a button on each event that says "Join Event"
function CustomEvent({event}){
  // Add the current users email to the list of participants.
  const handleParticipants = () => {
    event.participants.push("The email");
  }

  return (
    <div className='custom-event'>
      <div>{event.title}</div>

      {/* I need to change this code to put the users email when they click join event*/}
      <div>Participants: </div>
      <button onClick={handleParticipants}>Join Event</button>
    </div>
  )
}




function App() {
  const [ events, setEvents ] = useState([])

  // Every time you make a new event, change these values.
  const [ newEvent, setNewEvent ] = useState({ 
    title: "",
    start: "",
    end: "",
    description: "",
    email: "",
  })

     useEffect(() => {
      const fetchEvents = async () => {
      const response = await fetch ('/api/events/')
      const json = await response.json()
  
        if(response.ok){
          console.log(json)
          setEvents(json)
  
        }
      }
      fetchEvents()
    },[])

    const fetchEvents = async () => {
      const response = await fetch('/api/events/');
      const json = await response.json();
  
      if (response.ok) {
        console.log(json);
        setEvents(json);
      }
    };


    // Add a new event both to the client and the database
    function handleAddEvent() {
      // Should add the event to the database here
      fetch('api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })
        .then((response) => {
          if (response.ok) {

            // This line should add the new event locally
            setEvents([...events,newEvent]);

            // This in theory adds it to the database
            fetchEvents();
            setNewEvent({
              title: '',
              start: '',
              end: '',
              description: '',
            });
          } else {
            throw new Error('Failed to add the event to the database.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
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
        <input type="email" placeholder='Email' style={{ width: "20%", marginRight: "10px"}}
          value={newEvent.email} onChange={(e) => setNewEvent({...newEvent, email: e.target.value})} required maxLength={255}
        />
        <input type="text" placeholder='Add description 600 characters' style={{ width: "15%", height: "75px", marginRight: "10px", justifyContent:"center", alignItems:"flex-start"}}
          value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} required maxLength={600}
        />

        <input type="text" placeholder='Time' style={{ width: "20%", marginRight: "10px", justifyContent:"center", alignItems:"flex-start"}}
          value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} required maxLength={600}
        />
        </div>
        <div>
        <DatePicker placeholderText="Start Date" style={{marginRight: "10px"}}
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent,start})}/>
        <DatePicker placeholderText="End Date"
        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent,end})}/>
        <button style={{marginTop: "10px"}} onClick={handleAddEvent}>Add Event</button>
      </div>
      <Calendar 
      // This basically shows how the calendar looks. What events are shown, what localizer (region) to use etc.
      key={10}
      localizer={localizer} events={events} 
      startAccessor="start" endAccessor="end"
      style={{ height: 500, margin: "50px" }} 
        components={{ event: CustomEvent}}
      />
    </div>
  );
}




export default App;
