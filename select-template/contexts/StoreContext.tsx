'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inventory: number;
  featured: boolean;
}

export interface StoreSettings {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: string;
  selectedTemplate: string;
  selectedTheme: string;
}

export interface StoreState {
  settings: StoreSettings;
  products: Product[];
  categories: string[];
}

type StoreAction =
  | { type: 'UPDATE_SETTINGS'; payload: Partial<StoreSettings> }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: string }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'LOAD_STATE'; payload: StoreState };

const initialState: StoreState = {
  settings: {
    name: 'My E-commerce Store',
    logo: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    accentColor: '#F59E0B',
    fontFamily: 'Inter',
    fontSize: '16',
    selectedTemplate: 'medusa-starter',
    selectedTheme: 'default',
  },
  products: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg',
      inventory: 50,
      featured: true,
    },
    {
      id: '2',
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable and sustainable cotton t-shirt',
      price: 29.99,
      category: 'Clothing',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      inventory: 100,
      featured: false,
    },
  ],
  categories: ['Electronics', 'Clothing', 'Home & Garden', 'Sports'],
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat !== action.payload),
        products: state.products.map(product =>
          product.category === action.payload
            ? { ...product, category: 'Uncategorized' }
            : product
        ),
      };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
} | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('ecommerce-builder-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ecommerce-builder-state', JSON.stringify(state));
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}