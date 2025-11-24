// client/src/App.jsx
import { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
  finishDay,
  getCompletedTasks,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchCompleted();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const fetchCompleted = async () => {
    const res = await getCompletedTasks();
    setCompleted(res.data);
  };

  const handleAddTask = async () => {
    if (!newTask) return;
    await addTask(newTask);
    setNewTask("");
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await toggleTask(id);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleFinishDay = async () => {
    const res = await finishDay();
    setStreak(res.data.streak);
    fetchTasks();
    fetchCompleted();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-2">Elite Streak App</h1>
      <p className="text-lg text-blue-600 mb-6">
        Current Streak: {streak} point{streak !== 1 ? "s" : ""}
      </p>

      <div className="flex mb-6 gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2 mb-6">
        {tasks.map((t) => (
          <li key={t._id} className="bg-white shadow-md rounded flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => handleToggle(t._id)} />
              <span className={t.done ? "line-through text-gray-400" : ""}>{t.text}</span>
            </div>
            <button onClick={() => handleDelete(t._id)} className="text-red-500 hover:text-red-700">Delete</button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <button onClick={handleFinishDay} className="mb-8 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Finish Day
        </button>
      )}

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
        {completed.length === 0 && <p className="text-gray-500">No completed tasks yet.</p>}
        <div className="space-y-4">
          {completed.map((c) => (
            <div key={c._id} className="bg-gray-50 p-3 rounded shadow border-l-4 border-green-500">
              <div className="font-medium text-gray-700 mb-2">{c.date}</div>
              <ul className="list-disc list-inside text-gray-600">
                {c.tasks.map((task, i) => <li key={i}>{task}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
