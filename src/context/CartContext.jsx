import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { useAuth } from "./AuthContext.jsx";
import * as cartService from "../services/cartService.js";

// ─── Reducer (igual que antes, sólo maneja estado local) ─────────────────────

const CartContext = createContext(null);
const LS_KEY = "voltx_cart_v1";

function loadLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { items: [] };
    const p = JSON.parse(raw);
    return Array.isArray(p.items) ? p : { items: [] };
  } catch {
    return { items: [] };
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_ITEMS":
      return { items: action.payload };

    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id
              ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock,
            quantity: Math.min(quantity, product.stock),
          },
        ],
      };
    }

    case "SET_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) return { items: state.items.filter((i) => i.id !== id) };
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: Math.min(quantity, i.stock) } : i
        ),
      };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, undefined, loadLocal);
  const syncTimer = useRef(null);

  // Persistir en localStorage siempre (funciona offline/sin sesión)
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  // Al iniciar sesión → cargar carrito del servidor; al cerrarla → limpiar
  useEffect(() => {
    if (isAuthenticated) {
      cartService
        .fetchCart()
        .then((items) => dispatch({ type: "SET_ITEMS", payload: items }))
        .catch(() => {}); // si falla, se queda con el carrito local
    } else {
      dispatch({ type: "CLEAR_CART" });
    }
  }, [isAuthenticated]);

  // Sincronizar con el servidor tras cada cambio (debounced 800ms)
  useEffect(() => {
    if (!isAuthenticated) return;
    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      cartService.syncCart(state.items).catch(() => {});
    }, 800);
    return () => clearTimeout(syncTimer.current);
  }, [state.items, isAuthenticated]);

  const addItem = useCallback(
    (product, quantity = 1) => dispatch({ type: "ADD_ITEM", payload: { product, quantity } }),
    []
  );
  const setQuantity = useCallback(
    (id, quantity) => dispatch({ type: "SET_QUANTITY", payload: { id, quantity } }),
    []
  );
  const removeItem = useCallback(
    (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
    []
  );
  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
    if (isAuthenticated) cartService.clearCartApi().catch(() => {});
  }, [isAuthenticated]);

  const totalItems = useMemo(
    () => state.items.reduce((acc, i) => acc + i.quantity, 0),
    [state.items]
  );
  const subtotal = useMemo(
    () => state.items.reduce((acc, i) => acc + i.quantity * i.price, 0),
    [state.items]
  );

  const value = {
    items: state.items,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
