import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const User = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    const handleUserUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value
        const email = form.email.value
        fetch(`http://localhost:5000/users/${params.id}`,{
            method: 'PUT',
            body: JSON.stringify({name, email}),
            headers: {'content-type': 'application/json'}
        }).then(response => response.json())
        .then(response => {
            if(response.modifiedCount > 0) {
                alert("User Updated");
                navigate("/")
            }
        })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/users/${params.id}`)
        .then(response => response.json())
        .then(response => {
            setUser(response);
            setLoading(false)
        })
    }, [])
    if(loading) return <p>Loading...</p>
    return (
        <div>
            <form onSubmit={handleUserUpdate}>
                <input type="text" defaultValue={user.name} name='name'/>
                <br />
                <input type="text" defaultValue={user.email} name='email'/>
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default User;