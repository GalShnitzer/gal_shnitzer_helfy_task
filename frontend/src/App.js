import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import AddTaskButton from "./components/AddTaskButton";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import Message from "./components/Message";

//TODO: add delete confirm
//TODO: add modal

const API_BASE = "http://127.0.0.1:4000/api/tasks";

export default function App() {
  //States
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [toggleTaskId, setToggleTaskId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState(null);
  //   const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const taskLength = tasks.length;
  //Effects

  //getting filtered tasks from the server
  useEffect(
    function () {
      async function fetchTasks() {
        setLoading(true);
        setError(null);
        let url = API_BASE;
        if (filter !== "all") {
          const completed = filter === "completed" ? "true" : "false";
          url = `${url}?completed=${completed}`;
        }
        try {
          const res = await fetch(url);
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Failed to fetch");
          setTasks(data.data.tasks);
        } catch (e) {
          setError(e.message);
          setTasks([]);
        } finally {
          setLoading(false);
        }
      }
      fetchTasks();
    },
    [filter, toggleTaskId],
  );

  //creating a task
  useEffect(
    function () {
      if (!newTask) return;
      async function createTask() {
        try {
          const res = await fetch(API_BASE, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
          });
          if (!res.ok) throw new Error("Failed to create task");
          const data = await res.json();
          setTasks((prevTasks) => [...prevTasks, data.data.task]);
        } catch (e) {
          setError(e.message);
        } finally {
          setNewTask(null);
        }
      }
      createTask();
    },
    [newTask],
  );

  //editing a task
  useEffect(
    function () {
      if (!editTask) return;
      async function updateTask() {
        try {
          const res = await fetch(`${API_BASE}/${editTask.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editTask),
          });
          if (!res.ok) throw new Error("Failed to update task");
          const data = await res.json();
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === data.data.task.id ? data.data.task : task,
            ),
          );
        } catch (e) {
          setError(e.message);
        } finally {
          setEditTask(null);
        }
      }
      updateTask();
    },
    [editTask],
  );

  //deleting a task
  useEffect(
    function () {
      if (!deleteTask || !deleteConfirm) return;
      async function deleteTaskFromServer() {
        try {
          const res = await fetch(`${API_BASE}/${deleteTask.id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Failed to delete task");
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== deleteTask.id),
          );
        } catch (e) {
          setError(e.message);
        } finally {
          setDeleteTask(null);
          setDeleteConfirm(false);
        }
      }
      deleteTaskFromServer();
    },
    [deleteTask, deleteConfirm],
  );

  //toggling task completion
  useEffect(
    function () {
      if (!toggleTaskId) return;
      async function toggleTaskCompletion() {
        try {
          const res = await fetch(`${API_BASE}/${toggleTaskId}/toggle`, {
            method: "PATCH",
          });
          if (!res.ok) throw new Error("Failed to toggle task completion");
          const data = await res.json();
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === data.data.task.id ? data.data.task : task,
            ),
          );
        } catch (e) {
          setError(e.message);
        } finally {
          setToggleTaskId(null);
        }
      }
      toggleTaskCompletion();
    },
    [toggleTaskId],
  );

  //Handlers
  function handleDeleteTask(task) {
    setShowDeleteConfirm(true);
    setDeleteTask(task);
  }

  function handleEditTask(task) {
    setEditTask(task);
  }

  function handleAddTask() {
    setShowAddForm(true);
  }

  return (
    <div className="App">
      <ConfirmDeleteDialog
        open={showDeleteConfirm}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          setDeleteConfirm(true);
        }}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setDeleteConfirm(false);
          setDeleteTask(null);
        }}
      />
      <Header />
      <AddTaskButton onClick={handleAddTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      {taskLength === 0 && !loading && (
        <Message message="You have no tasks!💪🏻 add new☝🏻" />
      )}
      {loading ? (
        <Loader />
      ) : (
        <TaskList
          sortedTasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onToggleTask={setToggleTaskId}
        />
      )}
      <TaskForm
        open={showAddForm}
        formTitle="Create New Task"
        buttonText="Add Task"
        onSubmit={(task) => {
          setNewTask(task);
          setShowAddForm(false);
        }}
        onClose={() => setShowAddForm(false)}
      />
      <Modal open={!!error} title="Error" onClose={() => setError(null)}>
        <Message message={`App Error😣: ${error}`} />
      </Modal>
    </div>
  );
}
