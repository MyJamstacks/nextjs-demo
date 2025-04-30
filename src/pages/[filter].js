import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/context/taskContext";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { filter: "active" } },
      { params: { filter: "completed" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch("http://localhost:3001/tasks");
  const tasks = (await res.json()).reverse();

  let filtered = tasks;
  if (params.filter === "active") {
    filtered = tasks.filter((task) => !task.complete);
  } else if (params.filter === "completed") {
    filtered = tasks.filter((task) => task.complete);
  }

  return {
    props: {
      tasks: filtered,
    },
  };
}

export default function FilteredTasks() {
  const { tasks } = useTasks();
  const { query } = useRouter();

  let filteredTasks = tasks;
  if (query.filter === "active") {
    filteredTasks = tasks.filter((t) => !t.complete);
  } else if (query.filter === "completed") {
    filteredTasks = tasks.filter((t) => t.complete);
  }

  return (
    <main>
      <div className="task-list" id="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>No tasks yet</p>
        )}
      </div>
    </main>
  );
}
