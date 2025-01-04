import { RootState } from "@/app/store";
import { ITask } from "@/type";
import { createSlice, PayloadAction , nanoid} from "@reduxjs/toolkit";
interface InitialSate {
    tasks: ITask[],
    filter: "All" | "high" |"medium" | "low"
}
const initialState:InitialSate = {
    tasks: [],
    filter: "All"

}

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">

const createTask = (taskData:DraftTask):ITask =>{
return {id:nanoid(), isCompleted: false, ...taskData};
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
    addTask : (state, action:PayloadAction<DraftTask>)=>{
        // const id = uuid()
        // const taskData = {
        //     ...action.payload,
        //     id
        // }
        const taskData = createTask(action.payload)
         state.tasks.push(taskData)
      }
    }
})

export const selectTasks = (state: RootState)=>{
    return state.todo.tasks
}

export const selectFilter = (state: RootState)=>{
    return state.todo.filter
}

export const {addTask} = taskSlice.actions
export default taskSlice.reducer