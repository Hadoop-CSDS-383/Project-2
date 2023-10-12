import './App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";

import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


/* Routes */
import { CreateEvent } from './views/Create-Event.js';
import { ListEvents } from './views/List-Events.js';
import { AddParticipant } from './views/Add-Participant.js';
import { ListParticipants } from './views/List-Participants.js';
import { ListEventParticipants } from './views/List-Event-Participants.js';
import { Home } from './views/Home.js';

function App() {

   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/list-events" element={<ListEvents />} />
            <Route path="/add-participant" element={<AddParticipant />} />
            <Route path="/list-all-participants" element={<ListParticipants />} />
            <Route path="/list-event-participants" element={<ListEventParticipants />} />
         </Routes>
      </Router>
   )

}


export default App;
