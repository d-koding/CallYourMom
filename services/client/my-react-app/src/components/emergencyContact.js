import React, { useState } from 'react';

function EmergencyContactForm() {
    const initialContacts = [
        { name: '', phone: ''},
        { name: '', phone: ''},
        { name: '', phone: ''}
    ];
    const [showForm, setShowForm] = useState(false);
    const [contacts, setContacts] = useState(initialContacts);

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleChange = (index, e) => {
        const newContacts = contacts.map((contact, contactIndex) => {
            if (index === contactIndex) {
                return { ...contact, [e.target.name]: e.target.value };
            }
            return contact;
        });
        setContacts(newContacts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // API endpoint where the Flask app is listening
        const apiUrl = 'http://localhost:5000/emergency-contacts'; // adjust if necessary
        const user_id = 1; // replace with the actual user ID obtained after login
    
        // Construct the payload with the user ID and contacts array
        const payload = {
            user_id: user_id,
            contacts: contacts
        };
    
        // Make a POST request to the Flask API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success
            setShowForm(false);  // Hide the form after successful submission
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here
        });
    };    

    return (
        <div>
            <button onClick={handleToggleForm}>{showForm ? 'Cancel' : 'Add Emergency Contacts'}</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    {contacts.map((contact, index) => (
                        <div key={index}>
                            <input 
                                type="text" 
                                name="name" 
                                value={contact.name} 
                                onChange={(e) => handleChange(index, e)} 
                                placeholder={`Name of contact ${index + 1}`} 
                                required 
                            />
                            <input 
                                type="text" 
                                name="phone" 
                                value={contact.phone} 
                                onChange={(e) => handleChange(index, e)} 
                                placeholder={`Phone of contact ${index + 1}`} 
                                required 
                            />
                        </div>
                    ))}
                    <button type="submit">Save Contacts</button>
                </form>
            )}
        </div>
    );
}

export default EmergencyContactForm;
