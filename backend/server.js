const express = require("express");

const tasksRouter = require("./routes/tasksRoutes");

const app = express();

// GLOBAL MIDDLEWARES

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// ROUTES
app.use("/api/tasks", tasksRouter);

app.all("/{*path}", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

const port = 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
