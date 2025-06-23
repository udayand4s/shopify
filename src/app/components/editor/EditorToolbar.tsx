'use client';

import { useEditor } from './EditorContext';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Undo, 
  Redo, 
  Save, 
  Eye, 
  Monitor, 
  Tablet, 
  Smartphone,
  Download,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Magnet
} from 'lucide-react';

export function EditorToolbar() {
  const { state, dispatch } = useEditor();

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO' });
  };

  const handleSave = () => {
    console.log('Saving website...', { elements: state.elements, pageSettings: state.pageSettings });
    alert('Website saved successfully!');
  };

  const handlePreview = () => {
    console.log('Opening preview...', { elements: state.elements, pageSettings: state.pageSettings });
    alert('Preview functionality would open here!');
  };

  const handleExport = () => {
    const websiteData = JSON.stringify({
      elements: state.elements,
      pageSettings: state.pageSettings,
      version: '1.0'
    }, null, 2);
    const blob = new Blob([websiteData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleZoomChange = (zoom: string) => {
    dispatch({ type: 'SET_ZOOM', zoom: parseFloat(zoom) });
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left side - History controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUndo}
          disabled={state.historyIndex <= 0}
          className="hover:bg-gray-100"
        >
          <Undo className="w-4 h-4 mr-1" />
          Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRedo}
          disabled={state.historyIndex >= state.history.length - 1}
          className="hover:bg-gray-100"
        >
          <Redo className="w-4 h-4 mr-1" />
          Redo
        </Button>
        <Separator orientation="vertical" className="h-6" />
        
        {/* View controls */}
        <Button
          variant={state.gridEnabled ? 'default' : 'ghost'}
          size="sm"
          onClick={() => dispatch({ type: 'TOGGLE_GRID' })}
          className="hover:bg-gray-100"
        >
          <Grid3X3 className="w-4 h-4 mr-1" />
          Grid
        </Button>
        <Button
          variant={state.snapToGrid ? 'default' : 'ghost'}
          size="sm"
          onClick={() => dispatch({ type: 'TOGGLE_SNAP_TO_GRID' })}
          className="hover:bg-gray-100"
        >
          <Magnet className="w-4 h-4 mr-1" />
          Snap
        </Button>
      </div>

      {/* Center - Device preview toggles and zoom */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Button variant="ghost" size="sm" className="bg-white shadow-sm">
            <Monitor className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Tablet className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleZoomChange(Math.max(0.25, state.zoom - 0.25).toString())}
            disabled={state.zoom <= 0.25}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Select value={state.zoom.toString()} onValueChange={handleZoomChange}>
            <SelectTrigger className="w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.25">25%</SelectItem>
              <SelectItem value="0.5">50%</SelectItem>
              <SelectItem value="0.75">75%</SelectItem>
              <SelectItem value="1">100%</SelectItem>
              <SelectItem value="1.25">125%</SelectItem>
              <SelectItem value="1.5">150%</SelectItem>
              <SelectItem value="2">200%</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleZoomChange(Math.min(2, state.zoom + 0.25).toString())}
            disabled={state.zoom >= 2}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={handleExport} className="hover:bg-gray-100">
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
        <Button variant="ghost" size="sm" onClick={handlePreview} className="hover:bg-gray-100">
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
        <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
}