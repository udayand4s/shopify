'use client';

import { useRef, useCallback } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useEditor } from './EditorContext';
import { EditableElement } from './EditableElement';
import { ComponentLibrary } from './ComponentLibrary';
import { cn } from '@/lib/utils';

function DroppableCanvas() {
  const { state, dispatch } = useEditor();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'SELECT_ELEMENT', id: null });
    }
  };

  const snapToGrid = (value: number, gridSize: number = 20) => {
    return Math.round(value / gridSize) * gridSize;
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <div className="p-8">
        <div
          ref={setNodeRef}
          className="relative mx-auto shadow-2xl"
          style={{
            width: state.canvasWidth,
            height: state.canvasHeight,
            minHeight: '800px',
            backgroundColor: state.pageSettings.backgroundColor,
            backgroundImage: state.pageSettings.backgroundImage,
            backgroundSize: state.pageSettings.backgroundSize,
            backgroundPosition: state.pageSettings.backgroundPosition,
            backgroundRepeat: state.pageSettings.backgroundRepeat,
            transform: `scale(${state.zoom})`,
            transformOrigin: 'top left',
          }}
          onClick={handleCanvasClick}
        >
          {/* Grid overlay */}
          {state.gridEnabled && (
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          )}
          
          {/* Render elements */}
          {state.elements.map((element) => (
            <EditableElement
              key={element.id}
              element={element}
              isSelected={state.selectedElementId === element.id}
              onSelect={() => dispatch({ type: 'SELECT_ELEMENT', id: element.id })}
              onMove={(x, y) => {
                const newX = state.snapToGrid ? snapToGrid(x) : x;
                const newY = state.snapToGrid ? snapToGrid(y) : y;
                dispatch({ type: 'MOVE_ELEMENT', id: element.id, x: newX, y: newY });
              }}
              onResize={(width, height) => {
                const newWidth = state.snapToGrid ? snapToGrid(width) : width;
                const newHeight = state.snapToGrid ? snapToGrid(height) : height;
                dispatch({ type: 'RESIZE_ELEMENT', id: element.id, width: newWidth, height: newHeight });
              }}
              onUpdate={(updates) => {
                dispatch({ type: 'UPDATE_ELEMENT', id: element.id, updates });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function EditorCanvas() {
  const { state, dispatch } = useEditor();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current) {
      const componentData = active.data.current;
      const newElement = {
        id: Date.now().toString(),
        type: componentData.type,
        x: 0,
        y: 0,
        ...componentData.defaultProps,
      };
      dispatch({ type: 'SET_DRAGGED_ELEMENT', element: newElement });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    
    if (over && over.id === 'canvas' && state.draggedElement) {
      // Calculate position relative to canvas
      const canvasRect = document.querySelector('[data-canvas="true"]')?.getBoundingClientRect();
      if (canvasRect) {
        const x = Math.max(0, (event.activatorEvent as MouseEvent).clientX - canvasRect.left - 100);
        const y = Math.max(0, (event.activatorEvent as MouseEvent).clientY - canvasRect.top - 50);
        
        const newElement = {
          ...state.draggedElement,
          x: state.snapToGrid ? Math.round(x / 20) * 20 : x,
          y: state.snapToGrid ? Math.round(y / 20) * 20 : y,
        };
        
        dispatch({ type: 'ADD_ELEMENT', element: newElement });
        dispatch({ type: 'SAVE_TO_HISTORY' });
      }
    }
    
    dispatch({ type: 'SET_DRAGGED_ELEMENT', element: null });
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full">
        <ComponentLibrary />
        <div className="flex-1 relative" data-canvas="true">
          <DroppableCanvas />
        </div>
      </div>
      
      <DragOverlay>
        {state.draggedElement ? (
          <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500 opacity-90">
            <div className="text-sm font-medium text-gray-900">
              {state.draggedElement.type.charAt(0).toUpperCase() + state.draggedElement.type.slice(1)}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}