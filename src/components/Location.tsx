import { useState } from 'react'; 
const Location = () => { 
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [error, setError] = useState('null'); 
    const getLocation = () => { 
        if (navigator.geolocation) { navigator.geolocation.getCurrentPosition((position) => {
             setLocation({ lat: position.coords.latitude, lng: position.coords.longitude, });
        }, (error) => { setError(error.message); }); } 
        else { setError('Geolocation is not supported by this browser.'); } };
        return (<div>
                <button onClick={getLocation}>Get Location</button>
                  {location.lat && location.lng ? 
                  (<div>           
                    <p>Latitude: {location.lat}</p>           
                    <p>Longitude: {location.lng}</p>         
                    </div>) : (<p>{error ? error : 'Location not available'}</p>)}     
                    </div>); }; 
export default Location;