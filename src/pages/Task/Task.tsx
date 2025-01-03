import { useAppSelector } from "@/app/hook";
import { selectFilter, selectTasks } from "@/features/task/taskSlice";
import { AddTaskModal } from "@/module/task/AddTaskModal";
import TaskCard from "@/module/task/TaskCard";

const Task = () => {
  const tasks = useAppSelector(selectTasks);

  // const filter = useAppSelector(selectFilter)
  // console.log(filter)
  return (
    <div>
        <div className="px-56 py-4 flex justify-between  items-center">
            <h1>Tasks</h1>
            <AddTaskModal />
        </div>
      {tasks.map((task, index) => {
        return <TaskCard key={index} task={task} />;
      })}
    </div>
  );
};

export default Task;
