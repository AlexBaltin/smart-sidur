import React from 'react';
import '../styles/ScheduleTable.css'


const ScheduleTable = ({ scheduleData }) => {
  return (
    <div className="schedule-table">
      <h1>Weekly Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Morning</th>
            <th>Evening</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(scheduleData).map((day) => {
            const { morning, evening } = scheduleData[day];

            return (
              <tr key={day}>
                <td>{day}</td>
                <td>{morning.length > 0 ? morning.join(", ") : "-"}</td>
                <td>{evening.length > 0 ? evening.join(", ") : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
