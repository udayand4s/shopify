'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'container' | 'heading' | 'paragraph';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  src?: string;
  alt?: string;
  styles?: {
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: string;
    borderWidth?: string;
    borderColor?: string;
    borderStyle?: string;
    padding?: string;
    margin?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    lineHeight?: string;
    letterSpacing?: string;
    textDecoration?: string;
    boxShadow?: string;
    opacity?: string;
    transform?: string;
    transition?: string;
  };
  children?: string[];
}

interface PageSettings {
  backgroundColor: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  fontFamily: string;
  maxWidth: string;
  padding: string;
}

interface EditorState {
  elements: EditorElement[];
  selectedElementId: string | null;
  draggedElement: EditorElement | null;
  history: EditorElement[][];
  historyIndex: number;
  canvasWidth: number;
  canvasHeight: number;
  pageSettings: PageSettings;
  zoom: number;
  gridEnabled: boolean;
  snapToGrid: boolean;
}

type EditorAction =
  | { type: 'ADD_ELEMENT'; element: EditorElement }
  | { type: 'UPDATE_ELEMENT'; id: string; updates: Partial<EditorElement> }
  | { type: 'DELETE_ELEMENT'; id: string }
  | { type: 'SELECT_ELEMENT'; id: string | null }
  | { type: 'SET_DRAGGED_ELEMENT'; element: EditorElement | null }
  | { type: 'MOVE_ELEMENT'; id: string; x: number; y: number }
  | { type: 'RESIZE_ELEMENT'; id: string; width: number; height: number }
  | { type: 'UPDATE_PAGE_SETTINGS'; settings: Partial<PageSettings> }
  | { type: 'SET_ZOOM'; zoom: number }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_SNAP_TO_GRID' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE_TO_HISTORY' };

const initialElements: EditorElement[] = [
  {
    id: '1',
    type: 'heading',
    x: 100,
    y: 80,
    width: 600,
    height: 60,
    content: 'Welcome to Your Website',
    styles: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
      lineHeight: '1.2',
    },
  },
  {
    id: '2',
    type: 'paragraph',
    x: 100,
    y: 160,
    width: 600,
    height: 80,
    content: 'Create beautiful websites with our drag-and-drop editor. Customize every element to match your vision.',
    styles: {
      fontSize: '18px',
      color: '#6b7280',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
      lineHeight: '1.6',
    },
  },
  {
    id: '3',
    type: 'button',
    x: 300,
    y: 260,
    width: 200,
    height: 50,
    content: 'Get Started',
    styles: {
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
      transition: 'all 0.3s ease',
    },
  },
  {
    id: '4',
    type: 'image',
    x: 100,
    y: 340,
    width: 600,
    height: 300,
    src: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Hero Image',
    styles: {
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
  },
];

const initialPageSettings: PageSettings = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  maxWidth: '1200px',
  padding: '40px',
};

const initialState: EditorState = {
  elements: initialElements,
  selectedElementId: null,
  draggedElement: null,
  history: [initialElements],
  historyIndex: 0,
  canvasWidth: 1200,
  canvasHeight: 800,
  pageSettings: initialPageSettings,
  zoom: 1,
  gridEnabled: true,
  snapToGrid: true,
};

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'ADD_ELEMENT':
      const newElements = [...state.elements, action.element];
      return {
        ...state,
        elements: newElements,
        selectedElementId: action.element.id,
      };

    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(el =>
          el.id === action.id ? { ...el, ...action.updates } : el
        ),
      };

    case 'DELETE_ELEMENT':
      return {
        ...state,
        elements: state.elements.filter(el => el.id !== action.id),
        selectedElementId: state.selectedElementId === action.id ? null : state.selectedElementId,
      };

    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElementId: action.id,
      };

    case 'SET_DRAGGED_ELEMENT':
      return {
        ...state,
        draggedElement: action.element,
      };

    case 'MOVE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(el =>
          el.id === action.id ? { ...el, x: action.x, y: action.y } : el
        ),
      };

    case 'RESIZE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(el =>
          el.id === action.id ? { ...el, width: action.width, height: action.height } : el
        ),
      };

    case 'UPDATE_PAGE_SETTINGS':
      return {
        ...state,
        pageSettings: { ...state.pageSettings, ...action.settings },
      };

    case 'SET_ZOOM':
      return {
        ...state,
        zoom: action.zoom,
      };

    case 'TOGGLE_GRID':
      return {
        ...state,
        gridEnabled: !state.gridEnabled,
      };

    case 'TOGGLE_SNAP_TO_GRID':
      return {
        ...state,
        snapToGrid: !state.snapToGrid,
      };

    case 'SAVE_TO_HISTORY':
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push([...state.elements]);
      return {
        ...state,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };

    case 'UNDO':
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          ...state,
          elements: [...state.history[newIndex]],
          historyIndex: newIndex,
        };
      }
      return state;

    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          ...state,
          elements: [...state.history[newIndex]],
          historyIndex: newIndex,
        };
      }
      return state;

    default:
      return state;
  }
}

const EditorContext = createContext<{
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
} | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}