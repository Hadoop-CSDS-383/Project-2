import '../App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Navbar } from '../components/navbar.js'
import { Event } from '../components/event.js'
import axios from 'axios';

export const ListEvents = () => {
    const [events, setEvents] = useState([])



    useEffect(() => {
        document.title = "List Events | Hadoop Event Planner"

        axios.get('api/events/')
            .then(res => {
                console.log(res.data)
                setEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <h1 style={{ display: "flex", justifyContent: "center" }}>List Events</h1>
            {events.map((event) => (
                <Event event={event}></Event>
            ))}
        </div>
    )
}