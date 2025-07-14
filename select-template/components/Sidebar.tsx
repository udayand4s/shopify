'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Palette, 
  Settings, 
  Package, 
  Layout,
  Store,
  Brush
} from 'lucide-react';
import type { ActiveTab } from './Dashboard';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'templates' as ActiveTab,
      label: 'Templates',
      icon: Layout,
      description: 'Choose & customize templates'
    },
    {
      id: 'store' as ActiveTab,
      label: 'Store Settings',
      icon: Store,
      description: 'Branding & store details'
    },
    {
      id: 'products' as ActiveTab,
      label: 'Products',
      icon: Package,
      description: 'Manage your inventory'
    },
    {
      id: 'themes' as ActiveTab,
      label: 'Themes',
      icon: Brush,
      description: 'Customize appearance'
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Store className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-lg text-gray-900">Builder</span>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start h-auto p-3',
                activeTab === item.id 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              )}
              onClick={() => onTabChange(item.id)}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </div>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}