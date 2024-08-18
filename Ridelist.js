import React, { useEffect, useState } from 'react';

function RideList() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/rides')
            .then(response => response.json())
            .then(data => setRides(data));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Available Rides on AutoShare</h2>
            <ul className="list-group">
                {rides.map((ride, index) => (
                    <li key={index} className="list-group-item">
                        {ride.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RideList;
