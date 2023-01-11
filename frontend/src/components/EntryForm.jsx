import React, { useState } from 'react';

const EntryForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        numbers: [''],
    });

    // Initialize a token counter
    const [tokenCounter, setTokenCounter] = useState(10000);

    // Function to handle the form input changes
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // Update the form state
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the form input
        if (!formState.name) {
            alert('Please enter a name');
            return;
        }
        if (formState.numbers.some((number) => !number)) {
            alert('Please enter a number');
            return;
        }

        // Generate the tokens
        const tokens = formState.numbers.map(() => ++tokenCounter);

        // Store the data with the tokens
        // data.push({ ...formState, tokens });

        // Clear the form input
        setFormState({
            name: '',
            numbers: [''],
        });

        // Show a success message
        alert('Data submitted successfully!');
    };

    // Function to add a new number field
    const addNumberField = () => {
        setFormState({
            ...formState,
            numbers: [...formState.numbers, ''],
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                />
            </label>
            {formState.numbers.map((number, index) => (
                <label key={index}>
                    Number:
                    <input
                        type="text"
                        name={`numbers[${index}]`}
                        value={number}
                        onChange={handleInputChange}
                    />
                </label>
            ))}
            <button type="button" onClick={addNumberField}>
                Add another number
            </button>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default EntryForm
