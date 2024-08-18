import React, { useState } from 'react';

function PostRide() {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/rides', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description }),
        });
        setDescription('');
        alert('Ride posted successfully!');
    };

    return (
        <div className="container mt-4">
            <h2>Post a New Ride on AutoShare</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="rideDescription">Description</label>
                    <input
                        type="text"
                        id="rideDescription"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Post Ride</button>
            </form>
        </div>
    );
}

export default PostRide;
