import useSWR from "swr";
import { useRouter } from "next/router";
import TaskCard from "@/components/TaskCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

const getApiUrl = () => {
  return typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;
};

export default function FilteredTasks() {
  const { query } = useRouter();
  const apiUrl = getApiUrl();
  const { data: allTasks = [] } = useSWR(apiUrl, fetcher);

  const tasks = [...allTasks].reverse();

  const filteredTasks =
    query.filter === "active"
      ? tasks.filter((t) => !t.complete)
      : query.filter === "completed"
      ? tasks.filter((t) => t.complete)
      : tasks;

  return (
    <main>
      <div className="task-list" id="task-list">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}
