import useSWR from "swr";
import TaskCard from "@/components/TaskCard";

const apiUrl =
  typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url) => fetch(url).then((res) => res.json());

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
  const res = await fetch(apiUrl);
  const allTasks = await res.json();

  const filtered =
    params.filter === "active"
      ? allTasks.filter((task) => !task.complete)
      : allTasks.filter((task) => task.complete);

  return {
    props: {
      fallbackTasks: filtered,
      filter: params.filter,
    },
  };
}

export default function FilteredTasks({ fallbackTasks, filter }) {
  const { data: allTasks = [] } = useSWR(apiUrl, fetcher, {
    fallbackData: fallbackTasks,
  });

  const tasks = [...allTasks].reverse();

  const filtered =
    filter === "active"
      ? tasks.filter((task) => !task.complete)
      : tasks.filter((task) => task.complete);

  return (
    <main>
      <div className="task-list" id="task-list">
        {filtered.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}
