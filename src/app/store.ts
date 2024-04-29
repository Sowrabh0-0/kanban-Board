import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/user/userSlice';
import taskReducer from '../features/tasks/taskSlice';
import labelReducer from '../features/labels/labelSlice';
import filterReducer from '../features/filters/filterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    labels: labelReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
