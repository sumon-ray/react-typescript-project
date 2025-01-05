import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectFilter, selectTasks, updateFilter } from "@/features/task/taskSlice";
import { AddTaskModal } from "@/module/task/AddTaskModal";
import TaskCard from "@/module/task/TaskCard";

const Task = () => {
  const tasks = useAppSelector(selectTasks);
const dispatch = useAppDispatch()
  // const filter = useAppSelector(selectFilter)
  // console.log(filter)
  return (
    <div>
      <div className="px-20 gap-7 py-4 flex justify-center  items-center">
        <h1 className="mr-auto">Tasks</h1>
        <Tabs defaultValue="All">
          <TabsList>
            <TabsTrigger onClick={()=>dispatch(updateFilter("All"))}  value="All">All</TabsTrigger>
            <TabsTrigger onClick={()=>dispatch(updateFilter("High"))} value="High">High</TabsTrigger>
            <TabsTrigger  onClick={()=>dispatch(updateFilter("Medium"))} value="Medium">Medium</TabsTrigger>
            <TabsTrigger onClick={()=>dispatch(updateFilter("Low"))} value="Low">Low</TabsTrigger>
          </TabsList>
        </Tabs>
        <AddTaskModal />
      </div>
      {tasks.map((task, index) => {
        return <TaskCard key={index} task={task} />;
      })}
    </div>
  );
};

export default Task;
