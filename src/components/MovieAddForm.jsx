import { useRef } from 'react';

const MovieAddForm = () => {
    const titleRef = useRef();
    const openingRef = useRef();
    const dateRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = {
            title: titleRef.current.value,
            opening_text: openingRef.current.value,
            date: dateRef.current.value
        }
        console.log(value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Title">Title:</label>
                <input ref={titleRef} type="text" />
            </div>
            <div>
                <label htmlFor="OpeningText">Opening Text:</label>
                <input ref={openingRef} type="text" />
            </div>
            <div>
                <label htmlFor="ReleaseDate">Release Date:</label>
                <input ref={dateRef} type="date" />
            </div>
            <button>Add Movie</button>
        </form>
    )
}

export default MovieAddForm;