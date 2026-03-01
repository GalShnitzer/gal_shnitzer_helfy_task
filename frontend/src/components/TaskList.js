import InfiniteCarousel from "./InfCarousel";
import TaskItem from "./TaskItem";

export default function TaskList({
  sortedTasks,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onOpenEdit,
  isPaused = false,
}) {
  // Only use carousel if there are 3+ tasks, otherwise use simple flex layout
  if (sortedTasks.length < 3) {
    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px 0",
          paddingLeft: "60px",
          minWidth: 0,
        }}
      >
        {sortedTasks.map((task) => (
          <div key={task.id} style={{ minWidth: "280px", maxWidth: "280px" }}>
            <TaskItem
              task={task}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onToggleTask={onToggleTask}
              onOpenEdit={onOpenEdit}
              isEditing={isPaused}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <InfiniteCarousel
      items={sortedTasks}
      paused={isPaused}
      renderItem={(task) => (
        <TaskItem
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onOpenEdit={onOpenEdit}
          isEditing={isPaused}
        />
      )}
    />
  );
}
