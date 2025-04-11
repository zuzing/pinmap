import { useState, useEffect, useMemo } from 'react';
import LocationEntry from './LocationEntry';

function LocationList({ pins, setPins }) {
    const PAGE_SIZE = 5;
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortAsc, setSortAsc] = useState(true);

    // Filter and sort pins
    const filteredPins = useMemo(() => {
        return pins
            .filter(pin => pin.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) =>
                sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );
    }, [pins, searchQuery, sortAsc]);

    const maxPage = Math.ceil(filteredPins.length / PAGE_SIZE);
    const paginatedPins = filteredPins.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // Reset to page 1 when search or sort changes
    useEffect(() => {
        setPage(1);
    }, [searchQuery, sortAsc]);

    const handleNext = () => setPage((prev) => Math.min(prev + 1, maxPage));
    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const toggleSort = () => setSortAsc(prev => !prev);

    return (
        <div className="location-list">
            <div className="controls">
                <input
                    type="text"
                    placeholder="Szukaj po nazwie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={toggleSort}>
                    Sortuj: {sortAsc ? 'A-Z' : 'Z-A'}
                </button>
            </div>

            {paginatedPins.length === 0 ? (
                <p>Brak wyników.</p>
            ) : (
                paginatedPins.map(pin => (
                    <LocationEntry key={pin._id} pin={pin} setPins={setPins} />
                ))
            )}

            <div className="pagination-controls">
                <button onClick={handlePrev} disabled={page === 1}>
                    Poprzednia
                </button>
                <span>{page} / {maxPage || 1}</span>
                <button onClick={handleNext} disabled={page === maxPage || maxPage === 0}>
                    Następna
                </button>
            </div>
        </div>
    );
}

export default LocationList;
