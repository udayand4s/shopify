'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TemplateSelector } from './TemplateSelector';
import { StoreCustomizer } from './StoreCustomizer';
import { ProductManager } from './ProductManager';
import { ThemeCustomizer } from './ThemeCustomizer';
import { LivePreview } from './LivePreview';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export type ActiveTab = 'templates' | 'store' | 'products' | 'themes';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('templates');
  const [showPreview, setShowPreview] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'templates':
        return <TemplateSelector />;
      case 'store':
        return <StoreCustomizer />;
      case 'products':
        return <ProductManager />;
      case 'themes':
        return <ThemeCustomizer />;
      default:
        return <TemplateSelector />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex">
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                E-commerce Platform Builder
              </h1>
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
            {renderContent()}
          </div>
        </div>
        
        {showPreview && (
          <div className="w-1/2 border-l border-gray-200">
            <LivePreview />
          </div>
        )}
      </div>
    </div>
  );
}