import { useEffect, useState } from "react";

function EventTile(props) {
  const [host, setHost] = useState(null);

  useEffect(() => {
    async function fetchHost() {
      const response = await fetch('/api/users/' + props.event.host);
      const user = await response.json();
      setHost(user);
    }
    fetchHost()
  }, []);

  return (
    <div>
      {host && (
        <>
          <img src={host[0]?.picture}/>
          <h5>{host[0]?.name}</h5>
          <h3>{props.event.name}</h3>
          <p>{props.event.description.slice(0, 100) + '...'}</p>
          <h4>{props.event.location}</h4>
          <h4>{props.event.date}</h4>
          <h4>{props.event.price + ' HUF'}</h4>
        </>
      )}
    </div>
  )
}

export default EventTile;
