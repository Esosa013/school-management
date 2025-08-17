'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, Bell, Shield, Mail, Key, Upload } from 'lucide-react';

interface UserSettings {
  fullName: string;
  email: string;
  password: string;
  notificationsEnabled: boolean;
  profilePicture: string | null;
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<UserSettings>({
    fullName: '',
    email: '',
    password: '',
    notificationsEnabled: true,
    profilePicture: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState('profile');

  // Fetch settings on page load
  useEffect(() => {
    const fetchSettings = async () => {
      const email = 'user@example.com';  // Replace with the actual email of the logged-in user
      const id = '12345';  // Replace with the actual user ID

      try {
        const res = await fetch(`/api/settings?email=${email}&id=${id}`);
        const data = await res.json();
        if (data.user) {
          setSettings(data.user);
        } else {
          console.error('Error fetching settings:', data.error);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  // Handle form field changes
  const handleChange = (name: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit (update settings)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      const res = await fetch('/api/settings/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'userIdPlaceholder', // Replace with the actual userId
          updatedData: settings,
        }),
      });

      const data = await res.json();
      if (data.updatedUser) {
        setSuccessMessage('Settings updated successfully');
      } else {
        setSuccessMessage('Failed to update settings');
      }
    } catch (error) {
      setSuccessMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#ff9a8b]">Account Settings</h1>
          <Avatar className="h-16 w-16">
            <AvatarImage src={settings.profilePicture || ''} />
            <AvatarFallback className="bg-[#ff9a8b]/10">
              {settings.fullName?.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>

        {successMessage && (
          <Alert className={`mb-6 ${successMessage.includes('Failed') ? 'bg-red-50' : 'bg-green-50'}`}>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="profile">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        type="text"
                        value={settings.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        value={settings.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications">
                  <div>
                    <Label htmlFor="notificationsEnabled">Enable Notifications</Label>
                    <Switch
                        checked={settings.notificationsEnabled}
                        onCheckedChange={(checked: boolean) => handleChange('notificationsEnabled', checked)}
                    />
                  </div>
                </TabsContent>

                <Button type="submit" className="mt-6" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
