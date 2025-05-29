import useSWR from "swr";
import TaskCard from "@/components/TaskCard";

const apiUrl =
  typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getStaticProps() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();

  return {
    props: {
      fallbackTasks: tasks,
    },
  };
}

export default function Home({ fallbackTasks }) {
  const { data: allTasks = [], error } = useSWR(apiUrl, fetcher, {
    fallbackData: fallbackTasks,
  });

  const tasks = [...allTasks].reverse();

  if (error) return <p>Failed to load tasks.</p>;

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
