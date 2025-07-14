'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/contexts/StoreContext';
import { Palette, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  category: string;
}

const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and modern default theme',
    preview: {
      primary: '#3B82F6',
      secondary: '#1F2937',
      accent: '#F59E0B',
      background: '#FFFFFF',
    },
    category: 'Business',
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    description: 'Calming ocean-inspired color palette',
    preview: {
      primary: '#0EA5E9',
      secondary: '#0F172A',
      accent: '#06B6D4',
      background: '#F0F9FF',
    },
    category: 'Nature',
  },
  {
    id: 'forest',
    name: 'Forest Green',
    description: 'Natural and eco-friendly green theme',
    preview: {
      primary: '#059669',
      secondary: '#064E3B',
      accent: '#10B981',
      background: '#F0FDF4',
    },
    category: 'Nature',
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    description: 'Warm and energetic orange theme',
    preview: {
      primary: '#EA580C',
      secondary: '#7C2D12',
      accent: '#F97316',
      background: '#FFF7ED',
    },
    category: 'Warm',
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    description: 'Elegant and luxurious purple theme',
    preview: {
      primary: '#7C3AED',
      secondary: '#3730A3',
      accent: '#A855F7',
      background: '#FAF5FF',
    },
    category: 'Luxury',
  },
  {
    id: 'rose',
    name: 'Rose Pink',
    description: 'Soft and romantic pink theme',
    preview: {
      primary: '#E11D48',
      secondary: '#881337',
      accent: '#F43F5E',
      background: '#FFF1F2',
    },
    category: 'Soft',
  },
  {
    id: 'midnight',
    name: 'Midnight Dark',
    description: 'Sleek dark theme for modern stores',
    preview: {
      primary: '#6366F1',
      secondary: '#111827',
      accent: '#8B5CF6',
      background: '#1F2937',
    },
    category: 'Dark',
  },
  {
    id: 'golden',
    name: 'Golden Luxury',
    description: 'Premium gold and black theme',
    preview: {
      primary: '#D97706',
      secondary: '#1C1917',
      accent: '#F59E0B',
      background: '#FFFBEB',
    },
    category: 'Luxury',
  },
];

const CATEGORIES = ['All', 'Business', 'Nature', 'Warm', 'Luxury', 'Soft', 'Dark'];

export function ThemeCustomizer() {
  const { state, dispatch } = useStore();

  const handleSelectTheme = (theme: Theme) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        selectedTheme: theme.id,
        primaryColor: theme.preview.primary,
        secondaryColor: theme.preview.secondary,
        accentColor: theme.preview.accent,
      }
    });
    toast.success(`Applied theme: ${theme.name}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Theme Customization</h2>
        <p className="text-gray-600 mt-1">Choose from pre-built themes or customize your own</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Gallery
          </CardTitle>
          <CardDescription>
            Select a theme to instantly update your store's appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THEMES.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={state.settings.selectedTheme === theme.id}
                onSelect={() => handleSelectTheme(theme)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Theme Settings</CardTitle>
          <CardDescription>Your active theme configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Color Palette</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: state.settings.primaryColor }}
                  />
                  <div>
                    <p className="text-sm font-medium">Primary</p>
                    <p className="text-xs text-gray-500">{state.settings.primaryColor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: state.settings.secondaryColor }}
                  />
                  <div>
                    <p className="text-sm font-medium">Secondary</p>
                    <p className="text-xs text-gray-500">{state.settings.secondaryColor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: state.settings.accentColor }}
                  />
                  <div>
                    <p className="text-sm font-medium">Accent</p>
                    <p className="text-xs text-gray-500">{state.settings.accentColor}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Typography</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Font Family</p>
                  <p className="font-medium" style={{ fontFamily: state.settings.fontFamily }}>
                    {state.settings.fontFamily}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Base Font Size</p>
                  <p className="font-medium">{state.settings.fontSize}px</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ThemeCard({ 
  theme, 
  isSelected, 
  onSelect 
}: { 
  theme: Theme; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{theme.name}</h3>
            {isSelected && <Check className="h-4 w-4 text-blue-600" />}
          </div>
          <p className="text-sm text-gray-600 mb-2">{theme.description}</p>
          <Badge variant="outline" className="text-xs">
            {theme.category}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-gray-500 mb-1">Color Preview</div>
          <div className="flex gap-1">
            <div
              className="flex-1 h-8 rounded-l"
              style={{ backgroundColor: theme.preview.primary }}
            />
            <div
              className="flex-1 h-8"
              style={{ backgroundColor: theme.preview.secondary }}
            />
            <div
              className="flex-1 h-8"
              style={{ backgroundColor: theme.preview.accent }}
            />
            <div
              className="flex-1 h-8 rounded-r border"
              style={{ backgroundColor: theme.preview.background }}
            />
          </div>
        </div>
        
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="w-full mt-3"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? 'Applied' : 'Apply Theme'}
        </Button>
      </CardContent>
    </Card>
  );
}