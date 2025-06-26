// store/cart-store.ts
import { create } from 'zustand'

type CartItem = {
  productId: string
  name: string
  image?: string
  price: number
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existing = get().items.find((i) => i.productId === item.productId)
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      })
    } else {
      set({ items: [...get().items, item] })
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.productId !== id) })
  },
  updateQuantity: (id, quantity) => {
    set({
      items: get().items.map((i) =>
        i.productId === id ? { ...i, quantity } : i
      ),
    })
  },
  clearCart: () => set({ items: [] }),
}))
