import { useState } from "react";
import { useTasks } from "@/context/taskContext";

export default function TaskCard({ task }) {
  const { setTasks } = useTasks();
  const [complete, setComplete] = useState(task.complete);

  const toggleComplete = async (e) => {
    setComplete(e.target.checked);
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complete: e.target.checked }),
    });
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, complete: e.target.checked } : t
      )
    );
  };

  const deleteTask = async () => {
    const res = await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, "0");
    const m = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][d.getMonth()];
    return `${dd} ${m} ${d.getFullYear()}`;
  };

  return (
    <div
      className={`task-card ${task.priority} ${
        complete ? "task-complete" : ""
      }`}
    >
      <img
        src={`/${task.category}.svg`}
        alt={task.category}
        className="category-icon"
      />
      <div className="task-info">
        <strong>{task.title}</strong>
        <div className="task-meta">Created: {formatDate(task.createdAt)}</div>
      </div>
      <input
        name="task-checkbox"
        type="checkbox"
        className="task-checkbox"
        checked={complete}
        onChange={toggleComplete}
      />
      <button className="delete-button" onClick={deleteTask}>
        ✖
      </button>
    </div>
  );
}
