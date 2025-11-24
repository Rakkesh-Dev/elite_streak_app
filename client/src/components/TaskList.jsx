export default function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.done ? "done" : ""}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.text}</span>
          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
