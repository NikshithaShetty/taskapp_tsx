import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Datafetch: React.FC = () => {
  const [user, setUser] = useState<{ name: {title:string; first: string; last: string }; email: string } | null>(null);

  // Function to fetch user data using axios from the API
  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
     
      // Destructure the response with appropriate keys needed. 
         const { name, email } = response.data.results[0];

      setUser({
        name: {title :name.title,
             first: name.first,
          last: name.last,
        },
        email:email,
      });

      // Save the user data to local storage
      localStorage.setItem('userData', JSON.stringify({ name, email }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Check if user data exists in local storage
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
          //JSON String to JavaScript Object
      setUser(JSON.parse(savedUserData));
    } else {
      // If no data in local storage, fetch from API
      fetchUserData();
    }
  }, []);

  // Function to refresh user data
  const refreshUserData = () => {
    // Clear the current user data from state and local storage
    setUser(null);
    localStorage.removeItem('userData');
    // Fetch new user data from the API
    fetchUserData();
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>User Information</h2>
          <p>
           Full Name: {user.name.title} {user.name.first}{user.name.last}
          </p>
         <p>Email: {user.email}</p>
          <button onClick={refreshUserData}>Refresh</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Datafetch;