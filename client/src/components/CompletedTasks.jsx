export default function CompletedTasks({ completedTasks }) {
  if (completedTasks.length === 0) return null;

  return (
    <div className="completed-tasks">
      <h2>Completed Tasks History</h2>
      {completedTasks.map((day, index) => (
        <div key={index} className="day-block">
          <h3>{day.date}</h3>
          <ul>
            {day.tasks.map((task, i) => (
              <li key={i}>• {task}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
