'use client';

import { useEditor } from './EditorContext';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Separator } from '@/app/components/ui/separator';
import { Slider } from '@/app/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Switch } from '@/app/components/ui/switch';
import { 
  Trash2, 
  Move, 
  Palette, 
  Type, 
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Settings,
  Image as ImageIcon,
  Layers,
  Eye,
  EyeOff
} from 'lucide-react';

const fontFamilies = [
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
];

const colorPresets = [
  '#000000', '#ffffff', '#f3f4f6', '#1f2937', '#374151', '#6b7280',
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
];

export function PropertyPanel() {
  const { state, dispatch } = useEditor();
  const selectedElement = state.elements.find(el => el.id === state.selectedElementId);

  const handleUpdate = (updates: any) => {
    if (selectedElement) {
      dispatch({ 
        type: 'UPDATE_ELEMENT', 
        id: selectedElement.id, 
        updates 
      });
    }
  };

  const handleStyleUpdate = (styleUpdates: any) => {
    if (selectedElement) {
      handleUpdate({
        styles: { ...selectedElement.styles, ...styleUpdates }
      });
    }
  };

  const handlePageSettingsUpdate = (settings: any) => {
    dispatch({ type: 'UPDATE_PAGE_SETTINGS', settings });
  };

  const handleDelete = () => {
    if (selectedElement) {
      dispatch({ type: 'DELETE_ELEMENT', id: selectedElement.id });
    }
  };

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Page Settings */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Page Settings</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium">Background Color</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="color"
                  value={state.pageSettings.backgroundColor}
                  onChange={(e) => handlePageSettingsUpdate({ backgroundColor: e.target.value })}
                  className="w-12 h-8 p-1 rounded"
                />
                <Input
                  value={state.pageSettings.backgroundColor}
                  onChange={(e) => handlePageSettingsUpdate({ backgroundColor: e.target.value })}
                  className="h-8 flex-1 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {colorPresets.slice(0, 12).map((color) => (
                <button
                  key={color}
                  onClick={() => handlePageSettingsUpdate({ backgroundColor: color })}
                  className="w-full h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div>
              <Label className="text-xs font-medium">Font Family</Label>
              <Select
                value={state.pageSettings.fontFamily}
                onValueChange={(value) => handlePageSettingsUpdate({ fontFamily: value })}
              >
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Show Grid</Label>
              <Switch
                checked={state.gridEnabled}
                onCheckedChange={() => dispatch({ type: 'TOGGLE_GRID' })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Snap to Grid</Label>
              <Switch
                checked={state.snapToGrid}
                onCheckedChange={() => dispatch({ type: 'TOGGLE_SNAP_TO_GRID' })}
              />
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-gray-500">
            <Layout className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Select an element to edit its properties</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 capitalize">
            {selectedElement.type} Properties
          </h3>
          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>

      {/* Properties Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3 m-2">
            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
            <TabsTrigger value="style" className="text-xs">Style</TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="p-4 space-y-4">
            {/* Content Properties */}
            {(selectedElement.type === 'text' || selectedElement.type === 'button' || selectedElement.type === 'heading' || selectedElement.type === 'paragraph') && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Type className="w-4 h-4" />
                  <Label className="font-medium">Text Content</Label>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="content" className="text-xs">Content</Label>
                    <Input
                      id="content"
                      value={selectedElement.content || ''}
                      onChange={(e) => handleUpdate({ content: e.target.value })}
                      className="h-8 mt-1"
                    />
                  </div>
                </div>
              </Card>
            )}

            {selectedElement.type === 'image' && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4" />
                  <Label className="font-medium">Image</Label>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="src" className="text-xs">Image URL</Label>
                    <Input
                      id="src"
                      value={selectedElement.src || ''}
                      onChange={(e) => handleUpdate({ src: e.target.value })}
                      className="h-8 mt-1"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="alt" className="text-xs">Alt Text</Label>
                    <Input
                      id="alt"
                      value={selectedElement.alt || ''}
                      onChange={(e) => handleUpdate({ alt: e.target.value })}
                      className="h-8 mt-1"
                      placeholder="Describe the image"
                    />
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="style" className="p-4 space-y-4">
            {/* Typography */}
            {(selectedElement.type === 'text' || selectedElement.type === 'button' || selectedElement.type === 'heading' || selectedElement.type === 'paragraph') && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Type className="w-4 h-4" />
                  <Label className="font-medium">Typography</Label>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Font Family</Label>
                    <Select
                      value={selectedElement.styles?.fontFamily || 'Inter, sans-serif'}
                      onValueChange={(value) => handleStyleUpdate({ fontFamily: value })}
                    >
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontFamilies.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Font Size</Label>
                      <Input
                        value={selectedElement.styles?.fontSize || '16px'}
                        onChange={(e) => handleStyleUpdate({ fontSize: e.target.value })}
                        className="h-8 mt-1"
                        placeholder="16px"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Line Height</Label>
                      <Input
                        value={selectedElement.styles?.lineHeight || '1.5'}
                        onChange={(e) => handleStyleUpdate({ lineHeight: e.target.value })}
                        className="h-8 mt-1"
                        placeholder="1.5"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs">Font Weight</Label>
                    <Select
                      value={selectedElement.styles?.fontWeight || 'normal'}
                      onValueChange={(value) => handleStyleUpdate({ fontWeight: value })}
                    >
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Light</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="500">Medium</SelectItem>
                        <SelectItem value="600">Semi Bold</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="800">Extra Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-xs">Text Alignment</Label>
                    <div className="flex gap-1 mt-1">
                      <Button
                        variant={selectedElement.styles?.textAlign === 'left' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handleStyleUpdate({ textAlign: 'left' })}
                      >
                        <AlignLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={selectedElement.styles?.textAlign === 'center' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handleStyleUpdate({ textAlign: 'center' })}
                      >
                        <AlignCenter className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={selectedElement.styles?.textAlign === 'right' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handleStyleUpdate({ textAlign: 'right' })}
                      >
                        <AlignRight className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={selectedElement.styles?.textAlign === 'justify' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handleStyleUpdate({ textAlign: 'justify' })}
                      >
                        <AlignJustify className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Colors */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4" />
                <Label className="font-medium">Colors</Label>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Text Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={selectedElement.styles?.color || '#000000'}
                      onChange={(e) => handleStyleUpdate({ color: e.target.value })}
                      className="w-12 h-8 p-1 rounded"
                    />
                    <Input
                      value={selectedElement.styles?.color || '#000000'}
                      onChange={(e) => handleStyleUpdate({ color: e.target.value })}
                      className="h-8 flex-1 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-1 mt-2">
                    {colorPresets.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleStyleUpdate({ color })}
                        className="w-6 h-6 rounded border border-gray-300 hover:border-gray-500 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs">Background Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={selectedElement.styles?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
                      className="w-12 h-8 p-1 rounded"
                    />
                    <Input
                      value={selectedElement.styles?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
                      className="h-8 flex-1 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-1 mt-2">
                    {colorPresets.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleStyleUpdate({ backgroundColor: color })}
                        className="w-6 h-6 rounded border border-gray-300 hover:border-gray-500 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Border & Effects */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4" />
                <Label className="font-medium">Border & Effects</Label>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Border Radius</Label>
                  <Input
                    value={selectedElement.styles?.borderRadius || '0px'}
                    onChange={(e) => handleStyleUpdate({ borderRadius: e.target.value })}
                    className="h-8 mt-1"
                    placeholder="8px"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Border Width</Label>
                    <Input
                      value={selectedElement.styles?.borderWidth || '0px'}
                      onChange={(e) => handleStyleUpdate({ borderWidth: e.target.value })}
                      className="h-8 mt-1"
                      placeholder="1px"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">Border Color</Label>
                    <Input
                      type="color"
                      value={selectedElement.styles?.borderColor || '#e5e7eb'}
                      onChange={(e) => handleStyleUpdate({ borderColor: e.target.value })}
                      className="w-full h-8 p-1 rounded mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Border Style</Label>
                  <Select
                    value={selectedElement.styles?.borderStyle || 'solid'}
                    onValueChange={(value) => handleStyleUpdate({ borderStyle: value })}
                  >
                    <SelectTrigger className="h-8 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs">Box Shadow</Label>
                  <Select
                    value={selectedElement.styles?.boxShadow || 'none'}
                    onValueChange={(value) => handleStyleUpdate({ boxShadow: value === 'none' ? '' : value })}
                  >
                    <SelectTrigger className="h-8 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="0 1px 3px rgba(0, 0, 0, 0.1)">Small</SelectItem>
                      <SelectItem value="0 4px 6px rgba(0, 0, 0, 0.1)">Medium</SelectItem>
                      <SelectItem value="0 10px 15px rgba(0, 0, 0, 0.1)">Large</SelectItem>
                      <SelectItem value="0 20px 25px rgba(0, 0, 0, 0.1)">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs">Opacity</Label>
                    <div className="flex items-center gap-2 mt-1">
                    <Slider
                      value={[parseFloat(selectedElement.styles?.opacity as string || '1') * 100]}
                      onValueChange={(value: number[]) => handleStyleUpdate({ opacity: (value[0] / 100).toString() })}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs w-8">{Math.round(parseFloat(selectedElement.styles?.opacity as string || '1') * 100)}%</span>
                    </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="p-4 space-y-4">
            {/* Position & Size */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Move className="w-4 h-4" />
                <Label className="font-medium">Position & Size</Label>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">X Position</Label>
                    <Input
                      type="number"
                      value={selectedElement.x}
                      onChange={(e) => handleUpdate({ x: parseInt(e.target.value) || 0 })}
                      className="h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Y Position</Label>
                    <Input
                      type="number"
                      value={selectedElement.y}
                      onChange={(e) => handleUpdate({ y: parseInt(e.target.value) || 0 })}
                      className="h-8 mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Width</Label>
                    <Input
                      type="number"
                      value={selectedElement.width}
                      onChange={(e) => handleUpdate({ width: parseInt(e.target.value) || 0 })}
                      className="h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Height</Label>
                    <Input
                      type="number"
                      value={selectedElement.height}
                      onChange={(e) => handleUpdate({ height: parseInt(e.target.value) || 0 })}
                      className="h-8 mt-1"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Spacing */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Layout className="w-4 h-4" />
                <Label className="font-medium">Spacing</Label>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Padding</Label>
                  <Input
                    value={selectedElement.styles?.padding || '0px'}
                    onChange={(e) => handleStyleUpdate({ padding: e.target.value })}
                    className="h-8 mt-1"
                    placeholder="16px"
                  />
                </div>
                
                <div>
                  <Label className="text-xs">Margin</Label>
                  <Input
                    value={selectedElement.styles?.margin || '0px'}
                    onChange={(e) => handleStyleUpdate({ margin: e.target.value })}
                    className="h-8 mt-1"
                    placeholder="16px"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}