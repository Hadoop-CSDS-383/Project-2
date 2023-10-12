import React, { useState } from 'react';

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
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/events/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
            .then((response) => {
                if (response.ok) {

                    setEvent({
                        id: '',
                        date: '',
                        time: '',
                        title: '',
                        description: '',
                        email: '',
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
        <form onSubmit={handleSubmit}>
            <label>
                UUID (in uuidv4 format or leave blank to automaticalyl generate one):
                <input type="date" name="date" value={event.date} onChange={handleChange} required />
            </label>
            <label>
                Date:
                <input type="date" name="date" value={event.date} onChange={handleChange} required />
            </label>
            <label>
                Time:
                <input type="time" name="time" value={event.time} onChange={handleChange} required />
            </label>
            <label>
                Title:
                <input type="text" name="title" value={event.title} onChange={handleChange} maxLength={255} required />
            </label>
            <label>
                Description:
                <textarea name="description" value={event.description} onChange={handleChange} maxLength={600} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={event.email} onChange={handleChange} required />
            </label>
            <button type="submit">Create Event</button>
        </form>
    );
}

// export default EventForm;
