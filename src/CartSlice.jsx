import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      // expected fields: { name, cost, image, quantity }

      const existing = state.items.find(i => i.name === newItem.name);

      if (existing) {
        existing.quantity += 1; // or += newItem.quantity if provided
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity ?? 1 });
      }
    },

    removeItem: (state, action) => {
      const { name } = action.payload;
      state.items = state.items.filter(i => i.name !== name);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existing = state.items.find(i => i.name === name);

      if (existing) {
        existing.quantity = quantity;
        // optional safety: remove if quantity <= 0
        if (existing.quantity <= 0) {
          state.items = state.items.filter(i => i.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
