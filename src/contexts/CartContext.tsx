import { createContext, useContext, useReducer } from 'react';
import type { MarketplaceItem } from '../components/MarketplaceGrid/MarketplaceGridView';

interface CartItem extends MarketplaceItem {
  quantity: number;
}

interface CartBySeller {
  [sellerId: string]: {
    items: CartItem[];
    seller: {
      name: string;
      rating: number;
      totalRatings: number;
    };
    shipping: {
      cost: string;
      from: string;
    };
  };
}

interface CartState {
  cartBySeller: CartBySeller;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: MarketplaceItem }
  | { type: 'REMOVE_ITEM'; payload: { sellerId: string; itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { sellerId: string; itemId: string; quantity: number } }
  | { type: 'CLEAR_SELLER_CART'; payload: { sellerId: string } }
  | { type: 'SAVE_FOR_LATER'; payload: { sellerId: string; itemId: string } }
  | { type: 'CLEAR_ALL' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const sellerId = item.seller.name;
      const existingSellerCart = state.cartBySeller[sellerId];
      const existingItem = existingSellerCart?.items.find((i) => i.id === item.id);

      if (existingItem) {
        return {
          ...state,
          cartBySeller: {
            ...state.cartBySeller,
            [sellerId]: {
              ...existingSellerCart,
              items: existingSellerCart.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            },
          },
          itemCount: state.itemCount + 1,
        };
      }

      return {
        ...state,
        cartBySeller: {
          ...state.cartBySeller,
          [sellerId]: {
            items: [...(existingSellerCart?.items || []), { ...item, quantity: 1 }],
            seller: item.seller,
            shipping: item.shipping,
          },
        },
        itemCount: state.itemCount + 1,
      };
    }

    case 'REMOVE_ITEM': {
      const { sellerId, itemId } = action.payload;
      const sellerCart = state.cartBySeller[sellerId];
      const removedItem = sellerCart.items.find((i) => i.id === itemId);
      const remainingItems = sellerCart.items.filter((i) => i.id !== itemId);

      if (remainingItems.length === 0) {
        const { [sellerId]: _, ...restCarts } = state.cartBySeller;
        return {
          ...state,
          cartBySeller: restCarts,
          itemCount: state.itemCount - (removedItem?.quantity || 0),
        };
      }

      return {
        ...state,
        cartBySeller: {
          ...state.cartBySeller,
          [sellerId]: {
            ...sellerCart,
            items: remainingItems,
          },
        },
        itemCount: state.itemCount - (removedItem?.quantity || 0),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { sellerId, itemId, quantity } = action.payload;
      const sellerCart = state.cartBySeller[sellerId];
      const item = sellerCart.items.find((i) => i.id === itemId);
      const oldQuantity = item?.quantity || 0;

      return {
        ...state,
        cartBySeller: {
          ...state.cartBySeller,
          [sellerId]: {
            ...sellerCart,
            items: sellerCart.items.map((i) =>
              i.id === itemId ? { ...i, quantity } : i
            ),
          },
        },
        itemCount: state.itemCount + (quantity - oldQuantity),
      };
    }

    case 'CLEAR_SELLER_CART': {
      const { sellerId } = action.payload;
      const sellerCart = state.cartBySeller[sellerId];
      const sellerItemCount = sellerCart.items.reduce((acc, item) => acc + item.quantity, 0);
      const { [sellerId]: _, ...restCarts } = state.cartBySeller;

      return {
        ...state,
        cartBySeller: restCarts,
        itemCount: state.itemCount - sellerItemCount,
      };
    }

    case 'CLEAR_ALL':
      return {
        cartBySeller: {},
        itemCount: 0,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartBySeller: {},
    itemCount: 0,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};