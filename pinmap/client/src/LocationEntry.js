import { useState } from 'react';

function LocationEntry({ pin, setPins }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(pin.name);
    const [loading, setLoading] = useState(false);

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
        setNewName(pin.name);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_API_URL}/pin/${pin._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName }),
            });

            if (!res.ok) throw new Error('Failed to update pin');

            const updatedPin = { ...pin, name: newName };
            setPins((prevPins) =>
                prevPins.map((p) => (p._id === pin._id ? updatedPin : p))
            );
            setIsEditing(false);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_API_URL}/pin/${pin._id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete pin');

            setPins((prevPins) => prevPins.filter((p) => p._id !== pin._id));
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="location-entry">
            {isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    disabled={loading}
                />
            ) : (
                <h2>{pin.name}</h2>
            )}

            <p>Coordinates: {pin.loc.coordinates[1]}, {pin.loc.coordinates[0]}</p>
            <p>Creation date: {new Date(pin.creationTime).toLocaleString()}</p>

            {isEditing ? (
                <>
                    <button onClick={handleSave} disabled={loading}>Zapisz</button>
                    <button onClick={handleEditToggle} disabled={loading}>Anuluj</button>
                </>
            ) : (
                <button onClick={handleEditToggle}>Edytuj</button>
            )}

            <button onClick={handleDelete} disabled={loading}>Usuń</button>
        </div>
    );
}

export default LocationEntry;
