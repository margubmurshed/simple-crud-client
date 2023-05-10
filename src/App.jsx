import { useEffect, useState } from 'react';
import './App.css'
import { Link } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
    .then(response => response.json())
    .then(response => setUsers(response))
  }

  const handleSubmit = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    fetch("http://localhost:5000/users", {
      method: 'POST', 
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => {
      console.log(response);
      fetchUsers();
      form.reset();
    })
  }

  const handleUserDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`,{
      method: 'DELETE'
    }).then(response => response.json())
    .then(response => {
      console.log(response);
      if(response.deletedCount == 1){
        alert("User Deleted")
        fetchUsers();
      }
    })
  }

  useEffect(() => {
    fetchUsers();
  }, [])
  return (
    <>
      <h2>Simple Crud Client</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='Enter your name'/>
        <input type="email" name='email' placeholder='Enter your email'/>
        <input type="submit" value="Add Data" />
      </form>
      <div>
        {users.map(({_id, name, email}) => (
          <div key={_id}>
            {name} : {email} 
            <button onClick={() => handleUserDelete(_id)}>Delete</button> 
            <Link to={`/users/${_id}`}><button>View User</button></Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
