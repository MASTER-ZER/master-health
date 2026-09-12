'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ClinicSettings } from '@/lib/types';
import { DEFAULT_CLINIC_SETTINGS } from '@/lib/settings';

interface ClinicSettingsContextType {
  settings: ClinicSettings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<ClinicSettings>) => Promise<{ success: boolean; error?: string }>;
}

const ClinicSettingsContext = createContext<ClinicSettingsContextType>({
  settings: DEFAULT_CLINIC_SETTINGS,
  loading: false,
  refreshSettings: async () => {},
  updateSettings: async () => ({ success: false }),
});

export function ClinicSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ClinicSettings>(DEFAULT_CLINIC_SETTINGS);
  const [loading, setLoading] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/settings', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      }
    } catch (err) {
      console.warn('Could not fetch clinic settings, using defaults:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (newSettings: Partial<ClinicSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, ...newSettings }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'فشل حفظ الإعدادات.' };
      }

      if (data.settings) {
        setSettings(data.settings);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'حدث خطأ في الاتصال بالسيرفر.' };
    }
  };

  return (
    <ClinicSettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
        updateSettings,
      }}
    >
      {children}
    </ClinicSettingsContext.Provider>
  );
}

export function useClinicSettings(): ClinicSettingsContextType {
  const context = useContext(ClinicSettingsContext);
  if (!context) {
    return {
      settings: DEFAULT_CLINIC_SETTINGS,
      loading: false,
      refreshSettings: async () => {},
      updateSettings: async () => ({ success: false, error: 'Context not found' }),
    };
  }
  return context;
}
