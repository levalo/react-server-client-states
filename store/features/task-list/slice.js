import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []

export const pushTask = createAsyncThunk(
    'tasks/push',
    async (task, thunkApi) => {
        const res = await axios.post('/api/data', { task })

        return task
    }
)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push({ id: state.length, text: action.payload })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(pushTask.fulfilled, (state, { payload }) => state.filter(x => x.id !== payload.id))
    }
})

export const { addTask } = tasksSlice.actions 

export default tasksSlice.reducer