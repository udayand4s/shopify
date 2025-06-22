'use client'
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectScrollDownButton, SelectScrollUpButton } from '@/components/ui/select';
import React from 'react';
import axios from 'axios';
import countriesData from '@/app/data/countries.json';
import { useRouter } from 'next/navigation';

interface BusinessData {
  name: string;
  BusinessName: string;
  Industry: string;
  Location: string;
  PhoneNumber: string;
}

interface Country {
  name: string;
  code: string;
  dialCode: string;
}

function Setup() {
  
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [formData, setFormData] = React.useState<BusinessData>({
    name: '',
    BusinessName: '',
    Industry: '',
    Location: '',
    PhoneNumber: ''
  });

  const countries: Country[] = countriesData.sort((a, b) => a.name.localeCompare(b.name));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setFormData(prev => ({
        ...prev,
        Location: country.name,
        PhoneNumber: country.dialCode + phoneNumber.replace(/^\+?\d+\s?/, '')
      }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const phoneOnly = value.replace(selectedCountry?.dialCode || '', '').trim();
    setPhoneNumber(phoneOnly);
    
    setFormData(prev => ({
      ...prev,
      PhoneNumber: selectedCountry ? selectedCountry.dialCode + ' ' + phoneOnly : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user data is loaded
    if (!isLoaded || !user) {
      console.error('User data not available');
      return;
    }

    setIsSubmitting(true);

    try {
      
      const payload = { 
        ...formData, 
        userId: user.id 
      };
      
      const res = await axios.post('/api/businessSetup', payload);
     
      console.log('Business created:', res.data);
       router.push('/select-template'); 
      // Handle success (redirect, show message, etc.)
    } catch (error) {
      console.error('Error creating business:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Setup Your Business</h1>
          
          <p className="text-gray-400">Get started in just a few steps</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Your Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
              required
            />
          </div>

          <div>
            <label htmlFor="BusinessName" className="block text-sm font-medium text-white mb-2">
              Business Name
            </label>
            <Input
              id="BusinessName"
              name="BusinessName"
              type="text"
              value={formData.BusinessName}
              onChange={handleInputChange}
              placeholder="Enter your business name"
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
              required
            />
          </div>

          <div>
            <label htmlFor="Industry" className="block text-sm font-medium text-white mb-2">
              Industry
            </label>
            <Input
              id="Industry"
              name="Industry"
              type="text"
              value={formData.Industry}
              onChange={handleInputChange}
              placeholder="e.g., Retail, Technology, Healthcare"
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
              required
            />
          </div>

          <div>
            <label htmlFor="Location" className="block text-sm font-medium text-white mb-2">
              Country
            </label>
            <Select onValueChange={handleCountryChange} required>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white focus:border-white focus:ring-white">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white max-h-60">
                <SelectScrollUpButton />
                {countries.map((country) => (
                  <SelectItem 
                    key={country.code} 
                    value={country.code}
                    className="text-white hover:bg-gray-800 focus:bg-gray-800"
                  >
                    {country.name}
                  </SelectItem>
                ))}
                <SelectScrollDownButton />
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="PhoneNumber" className="block text-sm font-medium text-white mb-2">
              Phone Number
            </label>
            <div className="flex">
              <div className="bg-gray-900 border border-gray-700 border-r-0 rounded-l-md px-3 py-2 text-gray-400 text-sm flex items-center min-w-[70px]">
                {selectedCountry?.dialCode || '+1'}
              </div>
              <Input
                id="PhoneNumber"
                name="PhoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="123-456-7890"
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white rounded-l-none border-l-0"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-semibold py-3 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Setting up...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Setup
