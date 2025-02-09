import { RootState } from "@/app/store";
import { ITask } from "@/type";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { deleteUser } from "../user/userSlice";

type TaskFilter = "All" | "High" | "Medium" | "Low";
interface InitialSate {
  tasks: ITask[];
  filter: TaskFilter;
}
const initialState: InitialSate = {
  tasks: [
    {
      id: "cdscsfr456t",
      title: "Initialize frontend",
      description: "create home page",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "High",
      assignTo: null,
    },
  ],
  filter: "All",
};

type DraftTask = Pick<
  ITask,
  "title" | "description" | "dueDate" | "priority" | "assignTo"
>;

const createTask = (taskData: DraftTask): ITask => {
  return {
    ...taskData,
    id: nanoid(),
    isCompleted: false,
    assignTo: taskData.assignTo ? taskData.assignTo : "",
  };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      // const id = uuid()
      // const taskData = {
      //     ...action.payload,
      //     id
      // }
      const taskData = createTask(action.payload);
      state.tasks.push(taskData);
    },
    toggleStateCompleted: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.tasks.forEach((task) => {
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task;
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(deleteUser, (state,action)=>{
      state.tasks.forEach(task=> task.assignTo===action.payload ? (task.assignTo=null): task)
    })
  }
});

export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;
  if (filter === "Low") {
    return state.todo.tasks.filter((task) => task.priority === "Low");
  }
  if (filter === "Medium") {
    return state.todo.tasks.filter((task) => task.priority === "Medium");
  }
  if (filter === "High") {
    return state.todo.tasks.filter((task) => task.priority === "High");
  } else {
    return state.todo.tasks;
  }
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export const { addTask, toggleStateCompleted, deleteTask, updateFilter } =
  taskSlice.actions;
export default taskSlice.reducer;
