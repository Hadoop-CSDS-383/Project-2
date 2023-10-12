import '../App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Navbar } from '../components/navbar.js'
import axios from 'axios';
import { Participant } from '../components/participant';

export const ListParticipants = () => {
    const [participants, setParticipants] = useState([])



    useEffect(() => {

        document.title = "List Participants | Hadoop Event Planner"

        axios.get('api/participants/')
            .then(res => {
                console.log(res.data)
                setParticipants(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <h1 style={{ display: "flex", justifyContent: "center" }}>List Participants</h1>
            {participants.map((participant) => (
                <Participant participant={participant}></Participant>
            ))}

        </div>
    )
}