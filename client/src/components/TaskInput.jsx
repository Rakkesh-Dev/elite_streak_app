import { useState } from "react";

export default function TaskInput({ addTask }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    addTask(task.trim());
    setTask("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
