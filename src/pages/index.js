import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/context/taskContext";

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/tasks");
  const tasks = (await res.json()).reverse();

  return {
    props: {
      tasks,
    },
  };
}

export default function Home() {
  const { tasks } = useTasks();
  return (
    <main>
      <div className="task-list" id="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>No tasks yet</p>
        )}
      </div>
    </main>
  );
}
