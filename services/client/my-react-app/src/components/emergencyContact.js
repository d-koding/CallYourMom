function EmergencyContactForm() {
    const [showForm, setShowForm] = useState(false);
    const [contact, setContact] = useState({ name: '', phone: '', relationship: '' });

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Contact', contact);
        // Here you can integrate an API to send the data to your backend
        setShowForm(false);
    };

    return (
        <div>
            <button onClick={handleToggleForm}>{showForm ? 'Cancel' : 'Add Emergency Contact'}</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={contact.name} onChange={handleChange} placeholder="Name" required />
                    <input type="text" name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone Number" required />
                    <input type="text" name="relationship" value={contact.relationship} onChange={handleChange} placeholder="Relationship" />
                    <button type="submit">Save Contact</button>
                </form>
            )}
        </div>
    );
}

export default EmergencyContactForm;
