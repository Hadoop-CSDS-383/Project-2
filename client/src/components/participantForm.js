import React, { useEffect, useState } from 'react';
import '../App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SelectableEvent } from './selectableEvent'
import axios from 'axios'

export function ParticipantForm() {
    const [participant, setParticipant] = useState({
        id: '',
        event: '',
        name: '',
        email: ''
    });
    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get('api/events/')
            .then(res => {
                console.log(res.data)
                setEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        setParticipant({
            ...participant,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (eventId) => {
        if (!participant.name.trim() || !participant.email.trim()) {
            // Display a toast error if "Name" or "Email" is blank
            toast.error("Name and Email are required fields.");
            return;
        }

        participant.event = eventId

        axios.post(`api/events/subscribe`, participant)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Participant Added Successfully!");
                    setParticipant({
                        id: '',
                        event: '',
                        name: '',
                        email: ''
                    });
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(
                        <div>
                            Participant Already Exists With
                            <br /><br />
                            UUID: {participant.id}
                            <br /><br />
                            Please try again with a different UUID.
                        </div>,
                    );
                    console.error('Failed to add the participant to event in database:', error.response.data);
                } else if (error.response && error.response.status === 500) {
                    toast.error(
                        <div>
                            Internal Server Error, Likely Due To Invalid UUID
                            <br /><br />
                            UUID: {participant.id}
                            <br /><br />
                            Please try again with a valid UUID (Follows uuidv4 Format).
                        </div>,
                    )
                } else {
                    console.error('Network error:', error);
                }
            });
    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            marginTop: "3%"
        }}>
            <div className="form-row" style={{ marginBottom: "3%", textAlign: "center" }}>
                <label>
                    Participant UUID (in uuidv4 format or leave blank to automatically generate one)<br />
                    uuidv4 Format: (aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee)<br />
                    Allowed Characters: a-f, 0-9<br />
                    <input type="text" name="id" value={participant.id} onChange={handleChange} />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Name:&nbsp;&nbsp;
                    <input type="text" name="name" value={participant.name} onChange={handleChange} required />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Email:&nbsp;&nbsp;
                    <input type="email" name="email" value={participant.email} onChange={handleChange} required />
                </label>
            </div>



            <h3 style={{marginBottom:"-2%", marginTop:"5%"}}>Choose Event To Subscribe To:</h3>
            {events.map((event) => (
                <SelectableEvent event={event} submitFunction={handleSubmit}></SelectableEvent>
            ))}
        </form>

    );
}