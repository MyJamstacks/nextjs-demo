import "@/styles/style.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { TaskProvider } from "@/context/taskContext";
import AddTask from "@/components/AddTask";

function MyApp({ Component, pageProps }) {
  const { pathname, query } = useRouter();

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    if (path === "/active") return query.filter === "active";
    if (path === "/completed") return query.filter === "completed";
    return false;
  };

  return (
    <TaskProvider initialTasks={pageProps.tasks}>
      <header id="header">
        <span id="bar">
          Next.js Demo – Images by <a href="https://www.icons8.com">Icons8</a>
        </span>
        <div id="nav">
          <h1>TO-DO LIST</h1>
          <nav>
            <Link
              className={`button ${isActive("/") ? "active" : ""}`}
              href="/"
            >
              all
            </Link>
            <Link
              className={`button ${isActive("/active") ? "active" : ""}`}
              href="/active"
            >
              active
            </Link>
            <Link
              className={`button ${isActive("/completed") ? "active" : ""}`}
              href="/completed"
            >
              completed
            </Link>
          </nav>
        </div>
        <AddTask />
      </header>
      <Component {...pageProps} />
    </TaskProvider>
  );
}

export default MyApp;
