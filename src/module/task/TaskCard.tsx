import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteTask, selectTasks, toggleStateCompleted } from "@/features/task/taskSlice";
import { selectUsers } from "@/features/user/userSlice";
import { cn } from "@/lib/utils";
import { ITask } from "@/type";

interface IProps {
  task:ITask
}


export default function TaskCard({ task }: IProps) {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers);
  const assignUser = users.find((user)=>user.id===task.assignTo)

console.log(task)
  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex  gap-2 items-center">
          <div className={cn("size-3 rounded-full ", {
            "bg-green-500": task.priority==="Low",
            "bg-yellow-500": task.priority==="High",
            "bg-green-300": task.priority==="Medium",
          })}></div>
          <div className="">
          <h1 className={cn({"line-through": task.isCompleted})}>{task.title}</h1>
         <h1>{assignUser? assignUser.name : "no user"} </h1>
          </div>
        </div>
        
        <div className="flex gap-3 items-center">
          <Button onClick={()=>dispatch(deleteTask(task.id))} variant="link" className="p-0 text-red-500">
            Trash2
          </Button>
          <Checkbox checked={task.isCompleted} onClick={()=>dispatch(toggleStateCompleted(task.id))} />
        </div>
      </div>
      <p className="mt-5">{task.description}</p>
    </div>
  );
}
