import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Firewall } from '@/types/Firewall';

const initialState: { selectedFirewall: Firewall | null } = {
    selectedFirewall: null,
  };
  
  const firewallSlice = createSlice({
    name: 'firewall',
    initialState,
    reducers: {
      setSelectedFirewall: (state, action: PayloadAction<Firewall>) => {
        state.selectedFirewall = action.payload;
      },
    },
  });

  
// Esporta le azioni
export const { setSelectedFirewall } = firewallSlice.actions;

// Esporta il reducer per lo store
export const firewallReducer = firewallSlice.reducer;