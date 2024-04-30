import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/user/userSlice';
import taskReducer from '../app/features/tasks/taskSlice';
import labelReducer from '../app/features/labels/labelSlice';
import filterReducer from '../app/features/filters/filterSlice';

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
