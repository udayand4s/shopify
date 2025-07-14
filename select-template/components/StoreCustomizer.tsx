'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/contexts/StoreContext';
import { Upload, Palette } from 'lucide-react';
import { toast } from 'sonner';

export function StoreCustomizer() {
  const { state, dispatch } = useStore();

  const handleSettingChange = (key: string, value: string) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { [key]: value }
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleSettingChange('logo', result);
        toast.success('Logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Store Settings</h2>
        <p className="text-gray-600 mt-1">Customize your store branding and appearance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Basic store details and branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={state.settings.name}
                onChange={(e) => handleSettingChange('name', e.target.value)}
                placeholder="Enter your store name"
              />
            </div>

            <div>
              <Label htmlFor="logo">Store Logo</Label>
              <div className="mt-2">
                {state.settings.logo ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={state.settings.logo}
                      alt="Store logo"
                      className="h-16 w-16 object-contain border rounded"
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleSettingChange('logo', '')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload your store logo</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logoUpload"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('logoUpload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
            <CardDescription>Define your brand color palette</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  id="primaryColor"
                  value={state.settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300"
                />
                <Input
                  value={state.settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  id="secondaryColor"
                  value={state.settings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300"
                />
                <Input
                  value={state.settings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  id="accentColor"
                  value={state.settings.accentColor}
                  onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300"
                />
                <Input
                  value={state.settings.accentColor}
                  onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Customize fonts and text styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select
                value={state.settings.fontFamily}
                onValueChange={(value) => handleSettingChange('fontFamily', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Poppins">Poppins</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Lato">Lato</SelectItem>
                  <SelectItem value="Montserrat">Montserrat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fontSize">Base Font Size</Label>
              <Select
                value={state.settings.fontSize}
                onValueChange={(value) => handleSettingChange('fontSize', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14">14px (Small)</SelectItem>
                  <SelectItem value="16">16px (Medium)</SelectItem>
                  <SelectItem value="18">18px (Large)</SelectItem>
                  <SelectItem value="20">20px (Extra Large)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>See how your brand settings look</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: state.settings.primaryColor + '10',
                borderColor: state.settings.primaryColor,
                fontFamily: state.settings.fontFamily,
                fontSize: state.settings.fontSize + 'px'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                {state.settings.logo && (
                  <img
                    src={state.settings.logo}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                  />
                )}
                <h3 
                  style={{ color: state.settings.secondaryColor }}
                  className="font-bold text-lg"
                >
                  {state.settings.name}
                </h3>
              </div>
              <p style={{ color: state.settings.secondaryColor }} className="mb-2">
                This is how your store branding will appear.
              </p>
              <button
                style={{
                  backgroundColor: state.settings.accentColor,
                  color: 'white'
                }}
                className="px-4 py-2 rounded font-medium"
              >
                Shop Now
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}