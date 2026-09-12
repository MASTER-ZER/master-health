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
        const text = await res.text();
        if (text) {
          try {
            const data = JSON.parse(text);
            if (data.settings) {
              setSettings((prev) => ({ ...prev, ...data.settings }));
            }
          } catch (e) {
            console.warn('Could not parse settings JSON:', e);
          }
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, ...newSettings }),
      });

      let data: any = null;
      try {
        const text = await res.text();
        if (text) {
          data = JSON.parse(text);
        }
      } catch (parseErr) {
        console.error('Failed to parse settings response:', parseErr);
      }

      if (!res.ok) {
        return {
          success: false,
          error:
            (data && data.error) ||
            `فشل حفظ الإعدادات في الخادم (رمز الخطأ: ${res.status} ${res.statusText || ''})`,
        };
      }

      if (data && data.settings) {
        setSettings(data.settings);
      }
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'حدث خطأ غير متوقع أثناء الاتصال بالسيرفر.',
      };
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
