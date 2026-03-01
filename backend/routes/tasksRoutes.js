const express = require("express");
const tasksController = require("../controllers/tasksController");

const router = express.Router();

router
  .route("/")
  .get(tasksController.getAllTasks)
  .post(tasksController.createNewTask);
router
  .route("/:id")
  .put(tasksController.updateTask)
  .delete(tasksController.deleteTask);

router.patch("/:id/toggle", tasksController.toggleTaskCompletion);

module.exports = router;
