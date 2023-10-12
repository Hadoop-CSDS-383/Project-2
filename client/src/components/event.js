export const Event = ({ event }) => (
    <div key={event.id} className="event" style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginLeft: '30%',
        marginRight: '30%',
        marginTop: '4%',
        
        }}>
      <h3>{event.title}</h3>
      <p><em>UUID:</em> {event.id}</p>
      <p><em>Date:</em> {event.date}</p>
      <p><em>Time:</em> {event.time}</p>
      <p><em>Description:</em> {event.description}</p>
      <p><em>Email:</em> {event.email}</p>
    </div>
  );