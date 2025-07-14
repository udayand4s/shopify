'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useStore } from '@/contexts/StoreContext';
import { ExternalLink, Search, Star, Download } from 'lucide-react';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  github: string;
  tags: string[];
  stars: number;
  featured: boolean;
}

const SAMPLE_TEMPLATES: Template[] = [
  {
    id: 'medusa-starter',
    name: 'Medusa Next.js Starter',
    description: 'Full-featured e-commerce store built with Medusa and Next.js',
    preview: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    github: 'https://github.com/medusajs/nextjs-starter-medusa',
    tags: ['Next.js', 'Medusa', 'E-commerce', 'TypeScript'],
    stars: 1250,
    featured: true,
  },
  {
    id: 'shopify-hydrogen',
    name: 'Shopify Hydrogen Store',
    description: 'Modern Shopify storefront with Hydrogen framework',
    preview: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg',
    github: 'https://github.com/shopify/hydrogen',
    tags: ['Shopify', 'Hydrogen', 'React', 'GraphQL'],
    stars: 890,
    featured: true,
  },
  {
    id: 'nextjs-commerce',
    name: 'Next.js Commerce',
    description: 'High-performance e-commerce template with multiple providers',
    preview: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    github: 'https://github.com/vercel/commerce',
    tags: ['Next.js', 'Vercel', 'Multi-provider', 'Performance'],
    stars: 2100,
    featured: false,
  },
  {
    id: 'saleor-storefront',
    name: 'Saleor Storefront',
    description: 'GraphQL-powered storefront for Saleor e-commerce platform',
    preview: 'https://images.pexels.com/photos/1456735/pexels-photo-1456735.jpeg',
    github: 'https://github.com/saleor/storefront',
    tags: ['Saleor', 'GraphQL', 'React', 'TypeScript'],
    stars: 650,
    featured: false,
  },
];

export function TemplateSelector() {
  const { state, dispatch } = useStore();
  const [templates, setTemplates] = useState<Template[]>(SAMPLE_TEMPLATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredTemplates = filteredTemplates.filter(t => t.featured);
  const otherTemplates = filteredTemplates.filter(t => !t.featured);

  const handleSelectTemplate = (template: Template) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { selectedTemplate: template.id }
    });
    toast.success(`Selected template: ${template.name}`);
  };

  const handleFetchFromGitHub = async () => {
    setLoading(true);
    try {
      // Simulate GitHub API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Templates refreshed from GitHub');
    } catch (error) {
      toast.error('Failed to fetch templates from GitHub');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Choose a Template</h2>
          <p className="text-gray-600 mt-1">Select an e-commerce template to customize</p>
        </div>
        <Button onClick={handleFetchFromGitHub} disabled={loading}>
          <Download className="h-4 w-4 mr-2" />
          {loading ? 'Refreshing...' : 'Refresh from GitHub'}
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {featuredTemplates.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={state.settings.selectedTemplate === template.id}
                onSelect={() => handleSelectTemplate(template)}
              />
            ))}
          </div>
        </div>
      )}

      {otherTemplates.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">All Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={state.settings.selectedTemplate === template.id}
                onSelect={() => handleSelectTemplate(template)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TemplateCard({ 
  template, 
  isSelected, 
  onSelect 
}: { 
  template: Template; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  return (
    <Card className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
    }`}>
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{template.stars}</span>
              {template.featured && <Badge variant="secondary">Featured</Badge>}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(template.github, '_blank');
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="mb-4">{template.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button
          className="w-full"
          variant={isSelected ? "default" : "outline"}
          onClick={onSelect}
        >
          {isSelected ? 'Selected' : 'Select Template'}
        </Button>
      </CardContent>
    </Card>
  );
}