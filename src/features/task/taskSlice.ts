import { RootState } from "@/app/store";
import { ITask } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
interface InitialSate {
    tasks: ITask[],
    filter: "All" | "high" |"medium" | "low"
}
const initialState:InitialSate = {
    tasks: [
        {
            id: "cdscsfr456t",
            title:"Initialize frontend",
            description: "create home page",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "High"
        },
        {
            id: "cdscsfr456t",
            title:"Initialize backend",
            description: "create home page",
            dueDate: "2025-11",
            isCompleted: true,
            priority: "Low"
        },
    ],
    filter: "All"

}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {}
})

export const selectTasks = (state: RootState)=>{
    return state.todo.tasks
}

export const selectFilter = (state: RootState)=>{
    return state.todo.filter
}

export default taskSlice.reducer