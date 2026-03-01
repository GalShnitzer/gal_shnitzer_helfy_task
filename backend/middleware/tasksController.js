let TASKS = [];
let ID_COUNTER = 0;
const PRIORITY_LEVELS = ["low", "medium", "high"];

exports.getAllTasks = (req, res) => {
  const filteredTasks = TASKS.filter((task) => {
    if (req.query.completed === undefined) return true;
    return task.completed === (req.query.completed === "true");
  });
  res.status(200).json({
    status: "success",
    data: {
      tasks: filteredTasks,
    },
  });
};

exports.createNewTask = (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !description || !priority) {
    return res.status(400).json({
      status: "fail",
      message:
        "Missing required fields. Make sure to include title, description, and priority (low, medium, high).",
    });
  }
  if (typeof title !== "string" || typeof description !== "string") {
    return res.status(400).json({
      status: "fail",
      message: "Title and description must be strings",
    });
  }
  if (!PRIORITY_LEVELS.includes(priority)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid priority level",
    });
  }
  ID_COUNTER += 1;
  const newTask = {
    id: ID_COUNTER,
    title,
    description,
    completed: false,
    createdAt: new Date(),
    priority,
  };
  TASKS.push(newTask);
  res.status(201).json({
    status: "success",
    data: {
      task: newTask,
    },
  });
};

exports.updateTask = (req, res) => {
  const taskId = Number(req.params.id);
  const task = TASKS.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Task with the specified ID not found",
    });
  }
  if (req.body.title && typeof req.body.title !== "string") {
    return res.status(400).json({
      status: "fail",
      message: "Title must be a string",
    });
  }
  if (req.body.description && typeof req.body.description !== "string") {
    return res.status(400).json({
      status: "fail",
      message: "Description must be a string",
    });
  }
  if (req.body.priority && !PRIORITY_LEVELS.includes(req.body.priority)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid priority level",
    });
  }
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};

exports.deleteTask = (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = TASKS.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Task with the specified ID not found",
    });
  }

  TASKS = TASKS.filter((task) => task.id !== taskId);
  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.toggleTaskCompletion = (req, res) => {
  const taskId = Number(req.params.id);
  const task = TASKS.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Task with the specified ID not found",
    });
  }
  task.completed = !task.completed;
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};
