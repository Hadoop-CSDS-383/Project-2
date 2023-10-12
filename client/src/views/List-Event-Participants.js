import '../App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Navbar } from '../components/navbar.js'
import axios from 'axios';
import { Participant } from '../components/participant';

export const ListEventParticipants = () => {
    const [participants, setParticipants] = useState([])
    const [eventId, setEventId] = useState('')

    useEffect(() => {
        document.title = "List Event Participants | Hadoop Event Planner"
      }, [])

    const handleSubmit = () => {
        // Use the eventID state to fetch participants based on the entered event ID
        axios.get(`api/participants/event?event=${eventId}`)
            .then(res => {
                console.log(res.data);
                setParticipants(res.data);
                if (res.data.length === 0) {
                    toast.error(
                        <div>
                            No Participants Found For This Event
                            <br /><br />
                            Event UUID: {eventId}
                        </div>,
                    );
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    toast.error(
                        <div>
                            Internal Server Error, Likely Due To Invalid UUID
                            <br /><br />
                            UUID: {eventId}
                            <br /><br />
                            Please try again with a valid UUID (Follows uuidv4 Format).
                        </div>,
                    )
                } else {
                    console.error('Network error:', error);
                }
            });
    };

    return (
        <div>
            <Navbar></Navbar>
            <h1 style={{ display: "flex", justifyContent: "center" }}>List Event Participants</h1>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <label style={{ marginRight: '10px' }}>Enter Event ID:</label>
                <input
                    type="text"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                />
                <button onClick={handleSubmit} style={{ marginLeft: "1%" }}>Search</button>
            </div>

            {participants.map((participant) => (
                <Participant participant={participant}></Participant>
            ))}
        </div>
    )
}