'use client';

import { useState, useRef, useCallback } from 'react';
import { EditorCanvas } from '@/app/components/editor/EditorCanvas';
import { ComponentLibrary } from '@/app/components/editor/ComponentLibrary';
import { EditorToolbar } from '@/app/components/editor/EditorToolbar';
import { PropertyPanel } from '@/app/components/editor/PropertyPanel';
import { EditorProvider } from '@/app/components/editor/EditorContext';

export default function WebsiteEditor() {
  return (
    <EditorProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Component Library Sidebar */}
        
        
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <EditorToolbar />
          
          {/* Canvas */}
          <div className="flex-1 flex">
            <EditorCanvas />
            
            {/* Property Panel */}
            <PropertyPanel />
          </div>
        </div>
      </div>
    </EditorProvider>
  );
}