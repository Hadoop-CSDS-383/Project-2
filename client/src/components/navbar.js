import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-item" onClick={() => navigate('/create-event')}>
        Create Event
      </div>
      <div className="navbar-item" onClick={() => navigate('/list-events')}>
        List Events
      </div>
      <div className="navbar-item" onClick={() => navigate('/add-participant')}>
        Add Participant to Event
      </div>
      <div className="navbar-item" onClick={() => navigate('/list-all-participants')}>
        List All Participants
      </div>
      <div className="navbar-item" onClick={() => navigate('/list-event-participants')}>
        List Event Participants
      </div>
    </div>
  );
}