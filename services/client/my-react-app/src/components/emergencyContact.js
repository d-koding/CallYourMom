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
        console.log('Submitting Contacts', contacts);
        // Here you can integrate an API to send the data to your backend
        setShowForm(false);
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
