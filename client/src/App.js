import './App.css';
import React, { useState, useEffect } from 'react';

const events = [
  {
    title: "Big meeting",
    desc: 'This is a big meeting',
    email: 'email@email.com',
    date: '2023-10-15',
    time: '12:00 AM',
    participants: [],
  },
  {
    title: "Vacation",
    desc: 'This is a vacation',
    email: 'email@email.com',
    date: '2023-10-19',
    time: '10:00 AM',
    participants: [],
  },
  {
    title: "Conference",
    desc: 'This is a conference',
    email: 'email@email.com',
    date: '2023-10-17',
    time: '09:00 AM',
    participants: [],
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', email: '', date: '', time: '' });
  const [allEvents, setAllEvents] = useState(events);
  const [showJoinScreen, setShowJoinScreen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participantData, setParticipantData] = useState({ email: '', name: '' });

  function handleAddEvent() {
    const newEventWithParticipants = { ...newEvent };
    setAllEvents([...allEvents, newEventWithParticipants]);
    setNewEvent({ title: '', description: '', email: '', date: '', time: '' });

    // This should add to the database
    fetch('api/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEventWithParticipants),
    })
      .then((response) => response.json())
      .then((data) => console.log('Event added to the database:', data))
      .catch((error) => console.error('Error adding event:', error));
  }


  useEffect(() => {
    // Fetch events from the backend when the component mounts
    fetch('api/events')
      .then((response) => response.json())
      .then((data) => setAllEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);


  function handleJoinEvent(event) {
    setShowJoinScreen(true);
    setSelectedEvent(event);
  }

  function handleJoin(event) {
    const updatedEvents = allEvents.map((e) => {
      if (e.title === event.title) {
        return {
          ...e,
          participants: [...e.participants, participantData],
        };
      }
      return e;
    });
    setAllEvents(updatedEvents);
    setShowJoinScreen(false);
  }

  return (
    <div className='App'>
      <h1>Hadoop Project</h1>
      <div>

      <label for='eventTitle'> Event Title </label>
        <input
          type='text'
          placeholder='255 characters'
          id='eventTitle'
          maxLength={255}
          value={newEvent.title}
          onChange={(e) => setNewEvent({...newEvent,title: e.target.value})}
        />
        <label for='eventDesc'> Event Description </label>
        <input
          type='text'
          placeholder='600 characters'
          id='eventDesc'
          maxLength={600}
          value={newEvent.description}
          onChange={(e) => setNewEvent({...newEvent,description: e.target.value})}
        />
        <label for='hostEmail'> Host email </label>
        <input
          type='email'
          placeholder='Must be a valid email format'
          id='hostEmail'
          value={newEvent.email}
          onChange={(e) => setNewEvent({...newEvent,email: e.target.value})}
        />
          <label for='date'> Event Date </label>
          <input
            type='text'
            pattern='\d{4}-\d{2}-\d{2}'
            placeholder='YYYY-MM-DD'
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent,date: e.target.value})}
          />
          <label for='time'> Event Time </label>
          <input
            type='text'
            pattern='(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)'
            placeholder='HH:MM AM/PM'
            value={newEvent.time}
            onChange={(e) => setNewEvent({...newEvent,time: e.target.value})}
            />
        <button style={{marginLeft: '10px'}} onClick={handleAddEvent}> Add Event </button>
        
        <div>
          <h2>Added Events</h2>
          <ul>
            {allEvents.map((event, index) => (
              <ul key={index} className='event-list-item'>
                <strong>Title:</strong> {event.title}<br />
                <strong>Description:</strong> {event.description}<br />
                <strong>Host email:</strong> {event.email}<br />
                <strong>Date:</strong> {event.date}<br />
                <strong>Time:</strong> {event.time} <br />
                {showJoinScreen ? (
                  selectedEvent === event ? (
                    <>
                      <label htmlFor='participantName'>Your Name</label>
                      <input
                        type='text'
                        id='participantName'
                        placeholder='Your Name'
                        value={participantData.name}
                        onChange={(e) => setParticipantData({ ...participantData, name: e.target.value })}
                      />
                      <label htmlFor='participantEmail'>Your Email</label>
                      <input
                        type='email'
                        id='participantEmail'
                        placeholder='Your Email'
                        value={participantData.email}
                        onChange={(e) => setParticipantData({ ...participantData, email: e.target.value })}
                      />
                      <button onClick={() => handleJoin(event)}>Join</button>
                    </>
                  ) : null
                ) : (
                  <button onClick={() => handleJoinEvent(event)}>Join this event</button>
                )}
                
              </ul>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
