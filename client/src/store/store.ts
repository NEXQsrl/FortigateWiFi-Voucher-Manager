import { configureStore } from '@reduxjs/toolkit';
import { firewallReducer } from './firewallSlice'; // Importiamo il reducer

const store = configureStore({
    reducer: {
        firewall: firewallReducer,
    },
});

// Tipi per TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
