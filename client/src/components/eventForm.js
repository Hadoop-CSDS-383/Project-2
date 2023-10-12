import React, { useState } from 'react';
import '../App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

export function EventForm() {
    const [event, setEvent] = useState({
        id: '',
        date: '',
        time: '',
        title: '',
        description: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const trimmedValue = name === 'id' ? value.trim() : value;

        setEvent({
            ...event,
            [e.target.name]: trimmedValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('api/events/create', event)
        .then((response) => {
            if (response.status === 200) {
                // Successful response
                toast.success("Event Created Successfully!");
                setEvent({
                    id: '',
                    date: '',
                    time: '',
                    title: '',
                    description: '',
                    email: '',
                });
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(
                    <div>
                      Event Already Exists With
                      <br /><br />
                      UUID: {event.id}
                      <br /><br />
                      Please try again with a different UUID.
                    </div>,
                  );
                console.error('Failed to add the event to the database:', error.response.data);
            } else if(error.response && error.response.status === 500) {
                toast.error(
                    <div>
                      Internal Server Error, Likely Due To Invalid UUID
                      <br /><br />
                      UUID: {event.id}
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
        <form onSubmit={handleSubmit} className="centered-container" style={{marginTop:"-15%"}}>
            <div className="form-row" style={{marginBottom:"3%", textAlign:"center"}}>
                <label>
                    Event UUID (in uuidv4 format or leave blank to automatically generate one)<br />
                    uuidv4 Format: (aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee)<br />
                    Allowed Characters: a-f, 0-9<br />
                    <input type="text" name="id" value={event.id} onChange={handleChange} />
                </label>
            </div>

            <div className="form-row" >
                <label>
                    Date:&nbsp;&nbsp;
                    <input type="date" name="date" value={event.date} onChange={handleChange} required />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Time:&nbsp;&nbsp;
                    <input type="time" name="time" value={event.time} onChange={handleChange} required />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Title:&nbsp;&nbsp;
                    <input type="text" name="title" value={event.title} onChange={handleChange} maxLength={255} required />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Description:&nbsp;&nbsp;
                    <textarea name="description" value={event.description} onChange={handleChange} maxLength={600} required />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Email:&nbsp;&nbsp;
                    <input type="email" name="email" value={event.email} onChange={handleChange} required />
                </label>
            </div>

            <div className="form-row">
                <button type="submit">Create Event</button>
            </div>
        </form>

    );
}