import '../App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { EventForm } from '../components/eventForm.js'
import { Navbar } from '../components/navbar.js'

export const CreateEvent = () => {

    useEffect(() => {
        document.title = "Create Event | Hadoop Event Planner"
      }, [])

    return (
        <div>
            <Navbar></Navbar>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Create Event</h1>
            <EventForm></EventForm>
        </div>
    )
}