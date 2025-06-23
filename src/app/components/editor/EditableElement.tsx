'use client';

import { useState, useRef, useEffect } from 'react';
import { EditorElement } from './EditorContext';
import { cn } from '@/lib/utils';

interface EditableElementProps {
  element: EditorElement;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
  onUpdate: (updates: Partial<EditorElement>) => void;
}

export function EditableElement({
  element,
  isSelected,
  onSelect,
  onMove,
  onResize,
  onUpdate,
}: EditableElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: element.width,
      height: element.height,
    });
  };

  const handleDoubleClick = () => {
    if (element.type === 'text' || element.type === 'button' || element.type === 'heading' || element.type === 'paragraph') {
      setIsEditing(true);
    }
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    if (textRef.current) {
      onUpdate({ content: textRef.current.textContent || '' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdate({ src: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        onMove(Math.max(0, newX), Math.max(0, newY));
      }
      
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(50, resizeStart.width + deltaX);
        const newHeight = Math.max(30, resizeStart.height + deltaY);
        onResize(newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, onMove, onResize]);

  const renderElement = () => {
    const commonProps = {
      className: cn(
        'absolute cursor-move select-none transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        isDragging && 'opacity-75 z-50',
        'hover:shadow-lg'
      ),
      style: {
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        ...element.styles,
      },
      onMouseDown: handleMouseDown,
      onDoubleClick: handleDoubleClick,
      ref: elementRef,
    };

    switch (element.type) {
      case 'heading':
        return (
          <h1 {...commonProps}>
            <div
              ref={textRef}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={handleTextBlur}
              className={cn(
                'w-full h-full outline-none flex items-center',
                isEditing && 'bg-white border border-blue-500 rounded px-2 py-1'
              )}
              style={{
                fontSize: element.styles?.fontSize,
                fontWeight: element.styles?.fontWeight,
                fontFamily: element.styles?.fontFamily,
                color: element.styles?.color,
                textAlign: element.styles?.textAlign,
                lineHeight: element.styles?.lineHeight,
                letterSpacing: element.styles?.letterSpacing,
                textDecoration: element.styles?.textDecoration,
              }}
            >
              {element.content}
            </div>
          </h1>
        );

      case 'paragraph':
        return (
          <p {...commonProps}>
            <div
              ref={textRef}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={handleTextBlur}
              className={cn(
                'w-full h-full outline-none',
                isEditing && 'bg-white border border-blue-500 rounded px-2 py-1'
              )}
              style={{
                fontSize: element.styles?.fontSize,
                fontWeight: element.styles?.fontWeight,
                fontFamily: element.styles?.fontFamily,
                color: element.styles?.color,
                textAlign: element.styles?.textAlign,
                lineHeight: element.styles?.lineHeight,
                letterSpacing: element.styles?.letterSpacing,
                textDecoration: element.styles?.textDecoration,
                padding: element.styles?.padding,
              }}
            >
              {element.content}
            </div>
          </p>
        );

      case 'text':
        return (
          <div {...commonProps}>
            <div
              ref={textRef}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={handleTextBlur}
              className={cn(
                'w-full h-full outline-none flex items-center',
                isEditing && 'bg-white border border-blue-500 rounded px-2 py-1'
              )}
              style={{
                fontSize: element.styles?.fontSize,
                fontWeight: element.styles?.fontWeight,
                fontFamily: element.styles?.fontFamily,
                color: element.styles?.color,
                textAlign: element.styles?.textAlign,
                lineHeight: element.styles?.lineHeight,
                letterSpacing: element.styles?.letterSpacing,
                textDecoration: element.styles?.textDecoration,
                padding: element.styles?.padding,
              }}
            >
              {element.content}
            </div>
          </div>
        );

      case 'button':
        return (
          <button
            {...commonProps}
            className={cn(
              commonProps.className,
              'flex items-center justify-center border-none outline-none hover:scale-105 active:scale-95'
            )}
          >
            <div
              ref={textRef}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={handleTextBlur}
              className={cn(
                'outline-none',
                isEditing && 'bg-white border border-blue-500 rounded px-2 py-1'
              )}
              style={{
                fontSize: element.styles?.fontSize,
                fontWeight: element.styles?.fontWeight,
                fontFamily: element.styles?.fontFamily,
                color: element.styles?.color,
              }}
            >
              {element.content}
            </div>
          </button>
        );

      case 'image':
        return (
          <div {...commonProps} className={cn(commonProps.className, 'overflow-hidden')}>
            {element.src ? (
              <img
                src={element.src}
                alt={element.alt}
                className="w-full h-full object-cover"
                style={{
                  borderRadius: element.styles?.borderRadius,
                }}
              />
            ) : (
              <div 
                className="w-full h-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400"
                style={{
                  borderRadius: element.styles?.borderRadius,
                }}
              >
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🖼️</div>
                  <span className="text-sm">Click to add image</span>
                </div>
              </div>
            )}
            {isSelected && (
              <label className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-600 transition-colors">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        );

      case 'container':
        return (
          <div {...commonProps} className={cn(commonProps.className, 'flex items-center justify-center')}>
            <div className="text-gray-400 text-center pointer-events-none">
              <div className="text-2xl mb-1">📦</div>
              <span className="text-xs">Container</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderElement()}
      
      {/* Resize handles */}
      {isSelected && !isEditing && (
        <>
          {/* Corner resize handle */}
          <div
            className="absolute bg-blue-500 cursor-se-resize hover:bg-blue-600 transition-colors"
            style={{
              left: element.x + element.width - 4,
              top: element.y + element.height - 4,
              width: 8,
              height: 8,
              borderRadius: '50%',
            }}
            onMouseDown={handleResizeMouseDown}
          />
          
          {/* Selection indicator */}
          <div
            className="absolute pointer-events-none border-2 border-blue-500 bg-blue-500/10"
            style={{
              left: element.x - 2,
              top: element.y - 2,
              width: element.width + 4,
              height: element.height + 4,
              borderRadius: '4px',
            }}
          />
        </>
      )}
    </div>
  );
}