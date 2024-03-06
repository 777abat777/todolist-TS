import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { Task } from '../../components/Todolist/Todolist'
import { todoApi } from '../../api/api'

export type taskListType = {
  id: number
  title: string
  tasks: Array<Task>
}

export type initialStateTypes = {
  taskLists: taskListType[]
  loading: boolean
  error: null | boolean | SerializedError
}

const initialState: initialStateTypes = {
  taskLists: [],
  loading: false,
  error: null,
}

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export const TodosSlice = createAppSlice({
  name: 'todos',
  initialState,
  selectors: {
    selectTodos: state => state.taskLists
  },
  reducers: (create) => ({
    fetchTodos: create.asyncThunk(
      async (_:void) => {
        const response: any = await todoApi.getTodos()
        return await response.data
      },
      {
        pending: (state) => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.error = null
          state.taskLists=action.payload
        },
        rejected: (state, action) => {
          state.error = action.error
          state.loading = false
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false
        },
      }
    ),
    setTodos: create.reducer((state, action: PayloadAction<taskListType[]>) => {
      state.taskLists = action.payload
    }),
  })
})

export const { setTodos, fetchTodos } = TodosSlice.actions
export const { selectTodos } = TodosSlice.selectors
export default TodosSlice.reducer