import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/smartsidur-page.css';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';
import ScheduleTable from './ScheduleTable';


const SmartSidurPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // State to store the preferences
  const [employeePrefs, setEmployeePrefs] = useState({});
  const [schedule, setSchedule] = useState(null); // New state to store schedule data

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Handle input change from EmployeeCard component
  const handleInputChange = (firstName, value) => {
    setEmployeePrefs((prevPrefs) => ({
      ...prevPrefs,
      [firstName]: value, // Key is the first name, value is the input value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL;

      // Send the employeePrefs JSON in a POST request
      const response = await axios.post(`${apiUrl}/generate`, employeePrefs);
      setSchedule(response.data); // Save the schedule data in state
      console.log('Data submitted successfully:', response.data);
    } catch (err) {
      console.error('Error sending data:', err);
      setError('Error submitting preferences.');
    }
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}/employees`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError('Error fetching data: ' + err.message); 
      });
  }, []);

  return (
    <div className="smart-sidur-page">
      <div className="smartsidur-header">
        <h1>Welcome to SmartSidur, {user ? user.name : 'User'}</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="sidur-split-layout">
        <form onSubmit={handleSubmit} className='employee-form'>
          <div className="employees-list">
            {data ? (
              data.map((employee) => (
                <EmployeeCard 
                  key={employee.id}
                  firstName={employee.first_name}
                  lastName={employee.last_name}
                  handleInputChange={handleInputChange} // Pass handler to EmployeeCard
                />
              ))
            ) : (
              <p>Loading data...</p>
            )}
          </div>

          <input type="submit" value="Generate SmartSidur" />
        </form>

        <div className="sidur">
          {/* Conditionally render the ScheduleTable component if the schedule data is available */}
          {schedule ? (
            <ScheduleTable scheduleData={schedule} /> // Pass the schedule data as a prop
          ) : (
            <p>Generate schedule by submitting the form.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartSidurPage;