import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './emergencycontact.css';

function EmergencyContactForm() {
    const initialContacts = [
        { name: '', phone: ''},
        { name: '', phone: ''},
        { name: '', phone: ''}
    ];
    const [showForm, setShowForm] = useState(false);
    const [contacts, setContacts] = useState(initialContacts);
    const navigate = useNavigate();

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
        navigate('/startDrinking');
    };

    return (
        <div className="form-container">
            <button 
                className="toggle-form-button" 
                onClick={handleToggleForm}
            >
                {showForm ? 'Cancel' : 'Add Emergency Contacts'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="contact-form">
                    {contacts.map((contact, index) => (
                        <div key={index} className="input-group">
                            <input 
                                className="input-field"
                                type="text" 
                                name="name" 
                                value={contact.name} 
                                onChange={(e) => handleChange(index, e)} 
                                placeholder={`Emergency contact #${index + 1} name...`} 
                                required 
                            />
                            <input 
                                className="input-field"
                                type="text" 
                                name="phone" 
                                value={contact.phone} 
                                onChange={(e) => handleChange(index, e)} 
                                placeholder={`Emergency contact #${index + 1} number...`} 
                                required 
                            />
                        </div>
                    ))}
                    <button type="submit" className="submit-button">Save Contacts</button>
                </form>
            )}
        </div>
    );
}

export default EmergencyContactForm;
