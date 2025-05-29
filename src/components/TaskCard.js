import { useState } from "react";
import { mutate } from "swr";

export default function TaskCard({ task }) {
  const [complete, setComplete] = useState(task.complete);

  const apiUrl =
    typeof window === "undefined"
      ? process.env.API_URL
      : process.env.NEXT_PUBLIC_API_URL;

  const toggleComplete = async (e) => {
    const updated = e.target.checked;
    setComplete(updated);

    await fetch(`${apiUrl}/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complete: updated }),
    });

    mutate(apiUrl);
  };

  const deleteTask = async () => {
    const res = await fetch(`${apiUrl}/${task.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      mutate(apiUrl);
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
