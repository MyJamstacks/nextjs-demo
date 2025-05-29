import { useState } from "react";
import { mutate } from "swr";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("none");

  const apiUrl =
    typeof window === "undefined"
      ? process.env.API_URL
      : process.env.NEXT_PUBLIC_API_URL;

  const submitTask = async (e) => {
    e.preventDefault();

    const newTask = {
      id: Math.random().toString().slice(2, 5),
      createdAt: new Date().toISOString(),
      title,
      category,
      priority,
      complete: false,
    };

    const res = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (res.ok) {
      setTitle("");
      mutate(apiUrl);
    }
  };

  return (
    <form onSubmit={submitTask} className="add-task-form">
      <img src="/category.svg" alt="category icon" />
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="general">general</option>
        <option value="family">family</option>
        <option value="finances">finances</option>
        <option value="health">health</option>
        <option value="hobbies">hobbies</option>
        <option value="household">household</option>
        <option value="learning">learning</option>
        <option value="personal">personal</option>
        <option value="shopping">shopping</option>
        <option value="work">work</option>
      </select>

      <img src="/priority.svg" alt="priority icon" />
      <select
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="none">none</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <input
        name="title"
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        required
      />

      <button className="button active" type="submit">
        add
      </button>
    </form>
  );
}
