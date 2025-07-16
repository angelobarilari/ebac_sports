import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../App'

type CartState = {
  itens: Produto[]
}

const initialState: CartState = {
  itens: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Produto>) => {
      const existe = state.itens.find((p) => p.id === action.payload.id)
      if (!existe) {
        state.itens.push(action.payload)
      }
    },
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((p) => p.id !== action.payload)
    },
    limpar: (state) => {
      state.itens = []
    }
  }
})

export const { adicionar, remover, limpar } = cartSlice.actions
export default cartSlice.reducer
