import React, { useState } from 'react';

const EmployeeCard = ({ key, firstName, lastName, handleInputChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleInputChange(firstName, e.target.value); // Send the data up to parent component
  };

  return (
    <div id={key} className="employee-card">
      <h4>{firstName} {lastName}</h4>
      <input 
        type="text" 
        placeholder="Type employee prefs..." 
        value={inputValue} 
        onChange={handleChange} 
      />
    </div>
  );
};

export default EmployeeCard;

