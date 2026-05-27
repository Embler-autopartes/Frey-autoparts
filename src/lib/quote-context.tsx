'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

export type QuoteItem = {
  id: string;
  partNumber: string;
  description: string;
  brand: string;
  qty: number;
  notes: string;
};

type State = {
  items: QuoteItem[];
  hydrated: boolean;
};

type Action =
  | { type: 'HYDRATE'; items: QuoteItem[] }
  | { type: 'ADD'; item: Omit<QuoteItem, 'id'> }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'CLEAR' };

const STORAGE_KEY = 'frey.quote.v1';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items, hydrated: true };
    case 'ADD': {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
      return { ...state, items: [...state.items, { id, ...action.item }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i,
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

type Ctx = {
  items: QuoteItem[];
  hydrated: boolean;
  add: (item: Omit<QuoteItem, 'id'>) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const QuoteCtx = createContext<Ctx | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], hydrated: false });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', items: parsed });
          return;
        }
      }
    } catch {
      /* ignore */
    }
    dispatch({ type: 'HYDRATE', items: [] });
  }, []);

  // Persist on every change (after hydration)
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* quota or private mode — ignore */
    }
  }, [state.items, state.hydrated]);

  const value = useMemo<Ctx>(
    () => ({
      items: state.items,
      hydrated: state.hydrated,
      add: (item) => dispatch({ type: 'ADD', item }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, state.hydrated],
  );

  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider');
  return ctx;
}
