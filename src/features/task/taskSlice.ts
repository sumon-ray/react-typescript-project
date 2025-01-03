import { ITask } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
interface InitialSate {
    task: ITask[]
}
const initialState:InitialSate = {
    task: [
        {
            id: "cdscsfr456t",
            title:"Initialize frontend",
            description: "create home page",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "High"
        }
    ]
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {}
})

export default taskSlice.reducer