import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../components/Todolist/Todolist'

export type taskListType = {
    id: number
    title: string
    filter: filterValuesTypes
}
export type taskObjectsTypes = {
    [key: string]: Array<Task>
}
export type filterValuesTypes = "all" | 'active' | 'completed'

export type initialStateTypes = {
    taskLists: Array<taskListType>
    taskObjects: taskObjectsTypes
    loading: boolean
    error: null | boolean
}

let todolist1Id = 1
let todolist2Id = 2

let initialTasks: Array<taskListType> = [
    { id: todolist1Id, title: "first", filter: 'all' },
    { id: todolist2Id, title: "second", filter: 'completed' },
]
let initialtaskObjects = {
    [todolist1Id]: [
        { id: 1, title: 'Html', isDone: true },
        { id: 2, title: 'css', isDone: false },
        { id: 3, title: 'js', isDone: false }
    ],
    [todolist2Id]: [
        { id: 1, title: 'Html', isDone: true },
        { id: 2, title: 'css', isDone: false },
        { id: 3, title: 'js', isDone: false }
    ]
}

const initialState: initialStateTypes = {
    taskLists: initialTasks,
    taskObjects: initialtaskObjects,
    loading: false,
    error: null,
}

// export const fetchPosts = createAsyncThunk(
//     'posts/fetchPosts',
//     async (_, { rejectWithValue, dispatch }) => {
//         const response: any = await postApi.getPosts()
//         if (response.status !== 200) {
//             return rejectWithValue(`Server error ${response.message}`)
//         }
//         const data: Array<PostType> = await response.data
//         dispatch(setPosts(data))

//     }
// )


export const TodosSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.taskLists = action.payload
        },
        setTaskObjects: (state, action) => {
            state.taskObjects = action.payload
        },
        removeTaskAction(state, action) {
            let outputTasks = state.taskObjects[action.payload.taskListId].filter(el => el.id !== action.payload.id)
            state.taskObjects[action.payload.taskListId] = outputTasks
            setTaskObjects({ ...state.taskObjects })
        }

    },
    // extraReducers(builder) {
    //     builder
    // .addCase(fetchPosts.pending, (state) => {
    //     state.loading = true
    //     state.error = null
    // })
    // .addCase(fetchPosts.fulfilled, (state, action) => {
    //     state.loading = false
    //     state.error = null

    // })
    // .addCase(fetchPosts.rejected, (state, action) => {
    //     state.error = action.error
    //     state.loading = false
    //     console.log(state.error)
    // })
    // },
}
)

export const { setTodos, setTaskObjects, removeTaskAction } = TodosSlice.actions
export default TodosSlice.reducer