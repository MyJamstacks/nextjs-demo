import useSWR from "swr";
import TaskCard from "@/components/TaskCard";

const getApiUrl = () =>
  typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const apiUrl = getApiUrl();
  const { data: allTasks = [] } = useSWR(apiUrl, fetcher);

  const tasks = [...allTasks].reverse();

  return (
    <main>
      <div className="task-list" id="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}
