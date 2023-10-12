export const Participant = ({ participant }) => (
    <div key={participant.id} className="event" style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginLeft: '30%',
        marginRight: '30%',
        marginTop: '4%',

    }}>
        <h3>{participant.name}</h3>
        <p><em>UUID:</em> {participant.id}</p>
        <p><em>Email:</em> {participant.email}</p>
        <p><em>Event ID:</em> {participant.event_id}</p>
    </div>
);
