'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useEditor, EditorElement } from './EditorContext';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { 
  Type, 
  Image, 
  MousePointer, 
  Square, 
  Layers,
  Palette,
  Settings,
  Heading1,
  AlignLeft,
  Container,
  Shapes
} from 'lucide-react';

interface DraggableComponentProps {
  component: any;
  children: React.ReactNode;
}

function DraggableComponent({ component, children }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `component-${component.type}`,
    data: component,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

const componentCategories = [
  {
    name: 'Text',
    icon: Type,
    components: [
      {
        type: 'heading',
        name: 'Heading',
        icon: Heading1,
        preview: 'H1',
        defaultProps: {
          width: 400,
          height: 60,
          content: 'Your Heading Here',
          styles: {
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1f2937',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.2',
          },
        },
      },
      {
        type: 'paragraph',
        name: 'Paragraph',
        icon: AlignLeft,
        preview: 'P',
        defaultProps: {
          width: 400,
          height: 80,
          content: 'Your paragraph text goes here. Click to edit and customize.',
          styles: {
            fontSize: '16px',
            color: '#374151',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.6',
          },
        },
      },
      {
        type: 'text',
        name: 'Text',
        icon: Type,
        preview: 'Aa',
        defaultProps: {
          width: 200,
          height: 40,
          content: 'Your text here',
          styles: {
            fontSize: '16px',
            color: '#1f2937',
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
    ],
  },
  {
    name: 'Media',
    icon: Image,
    components: [
      {
        type: 'image',
        name: 'Image',
        icon: Image,
        preview: '🖼️',
        defaultProps: {
          width: 300,
          height: 200,
          src: '',
          alt: 'Image',
          styles: {
            borderRadius: '8px',
          },
        },
      },
    ],
  },
  {
    name: 'Interactive',
    icon: MousePointer,
    components: [
      {
        type: 'button',
        name: 'Button',
        icon: MousePointer,
        preview: 'BTN',
        defaultProps: {
          width: 150,
          height: 45,
          content: 'Click me',
          styles: {
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'center' as const,
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
            transition: 'all 0.2s ease',
          },
        },
      },
    ],
  },
  {
    name: 'Layout',
    icon: Container,
    components: [
      {
        type: 'container',
        name: 'Container',
        icon: Square,
        preview: '□',
        defaultProps: {
          width: 400,
          height: 200,
          content: '',
          styles: {
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            borderWidth: '2px',
            borderColor: '#e5e7eb',
            borderStyle: 'dashed',
          },
        },
      },
    ],
  },
];

export function ComponentLibrary() {
  const { dispatch } = useEditor();
  const [activeCategory, setActiveCategory] = useState('Text');

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Components</h2>
        <p className="text-sm text-gray-500">Drag to add to your page</p>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {componentCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeCategory === category.name
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Components */}
      <div className="flex-1 overflow-y-auto">
        {componentCategories
          .filter(category => category.name === activeCategory)
          .map((category) => (
            <div key={category.name} className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {category.components.map((component) => (
                  <DraggableComponent key={component.type} component={component}>
                    <Card className="p-4 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/50">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm">
                          {component.preview}
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">
                          {component.name}
                        </span>
                      </div>
                    </Card>
                  </DraggableComponent>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Need help?</span>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}