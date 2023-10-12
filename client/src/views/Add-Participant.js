import '../App.css';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ParticipantForm } from '../components/participantForm.js'
import { Navbar } from '../components/navbar.js'

export const AddParticipant = () => {

    useEffect(() => {
        document.title = "Add Particapant | Hadoop Event Planner"
      }, [])

    return (
        <div>
            <Navbar></Navbar>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Add Participant</h1>
            <ParticipantForm></ParticipantForm>
        </div>
    )
}