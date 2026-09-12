'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Booking, BookingStatus } from '@/lib/types';
import AdminHeader from '@/components/AdminHeader';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch bookings directly from Supabase
  const fetchBookings = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (!res.ok || data.error) {
        setFetchError(data.error || 'تعذر تحميل الحجوزات من قاعدة بيانات Supabase.');
        setBookings([]);
      } else {
        setBookings(data.bookings || []);
      }
    } catch (err: any) {
      console.error('Failed to fetch bookings:', err);
      setFetchError(err.message || 'حدث خطأ في الاتصال بالسيرفر.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Protect client side as secondary defense
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/me');
        if (!res.ok) {
          router.replace('/admin/login');
        }
      } catch (e) {
        router.replace('/admin/login');
      }
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update Status
  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    setActionLoadingId(id);
    // Optimistic UI update
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل تحديث الحالة');
      }
    } catch (err) {
      console.error('Update status failed:', err);
      // Refetch if optimistic update failed
      fetchBookings();
    } finally {
      setActionLoadingId(null);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    router.push('/admin/login');
    router.refresh();
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === 'pending').length;
    const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
    const cancelled = bookings.filter((b) => b.status === 'cancelled').length;
    return { total, pending, confirmed, cancelled };
  }, [bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Status filter
      if (selectedStatus !== 'all' && b.status !== selectedStatus) {
        return false;
      }
      // Search query (name, phone, or id)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = b.patient_name?.toLowerCase().includes(q);
        const matchesPhone = b.phone?.includes(q);
        const matchesId = b.id?.toLowerCase().includes(q);
        return matchesName || matchesPhone || matchesId;
      }
      return true;
    });
  }, [bookings, selectedStatus, searchQuery]);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-success-light text-success-dark">
            <span className="w-2 h-2 rounded-full bg-success" />
            مؤكد
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-error-light text-error-dark">
            <span className="w-2 h-2 rounded-full bg-error" />
            ملغي
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-warning-light text-warning-dark">
            <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
            قيد الانتظار
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      
      {/* Top Dedicated Admin Header */}
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Page Title & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div>
            <h1 className="text-xl font-extrabold text-heading">سجل مواعيد وحجوزات المرضى</h1>
            <p className="text-xs text-muted mt-0.5">
              متابعة طلبات الكشف وتحديث الحالات فورياً في قاعدة بيانات Supabase
            </p>
          </div>
          <button
            type="button"
            onClick={fetchBookings}
            disabled={loading}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-base ${loading ? 'animate-spin' : ''}`}>sync</span>
            <span>{loading ? 'جاري التحديث...' : 'تحديث البيانات'}</span>
          </button>
        </div>

        {/* Error Alert if Supabase fails */}
        {fetchError && (
          <div className="p-4 rounded-2xl bg-error/10 border border-error/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-error">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-error text-xl shrink-0">error</span>
              <span className="font-semibold">{fetchError}</span>
            </div>
            <button
              type="button"
              onClick={fetchBookings}
              className="shrink-0 px-3 py-1 bg-white border border-error/30 text-error rounded-lg font-bold hover:bg-error hover:text-white transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* KPI Metrics Grid (2x2 on mobile, 4 columns on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white border border-border/80 p-3.5 sm:p-5 rounded-2xl shadow-card flex items-center justify-between">
            <div>
              <p className="text-[11px] sm:text-xs text-muted font-medium">إجمالي الحجوزات</p>
              <p className="text-xl sm:text-2xl font-extrabold text-heading mt-1">{stats.total}</p>
            </div>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-2xl">calendar_month</span>
            </div>
          </div>

          <div className="bg-white border border-border/80 p-3.5 sm:p-5 rounded-2xl shadow-card flex items-center justify-between">
            <div>
              <p className="text-[11px] sm:text-xs text-muted font-medium">بانتظار التأكيد</p>
              <p className="text-xl sm:text-2xl font-extrabold text-warning-dark mt-1">{stats.pending}</p>
            </div>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-warning-light text-warning-dark flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-2xl">hourglass_empty</span>
            </div>
          </div>

          <div className="bg-white border border-border/80 p-3.5 sm:p-5 rounded-2xl shadow-card flex items-center justify-between">
            <div>
              <p className="text-[11px] sm:text-xs text-muted font-medium">مواعيد مؤكدة</p>
              <p className="text-xl sm:text-2xl font-extrabold text-success mt-1">{stats.confirmed}</p>
            </div>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-success-light text-success flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-2xl">check_circle</span>
            </div>
          </div>

          <div className="bg-white border border-border/80 p-3.5 sm:p-5 rounded-2xl shadow-card flex items-center justify-between">
            <div>
              <p className="text-[11px] sm:text-xs text-muted font-medium">مواعيد ملغاة</p>
              <p className="text-xl sm:text-2xl font-extrabold text-error mt-1">{stats.cancelled}</p>
            </div>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-error-light text-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-2xl">cancel</span>
            </div>
          </div>

        </div>

        {/* Search & Filter Control Bar */}
        <div className="bg-white border border-border/80 p-3.5 sm:p-4 rounded-2xl shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-muted text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث باسم المريض، رقم الهاتف، أو رقم الحجز..."
              className="w-full pr-11 pl-4 h-11 rounded-xl bg-background border border-border/80 text-heading text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Status Filter Chips (Horizontally scrollable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 shrink-0">
            {[
              { id: 'all', label: `الكل (${stats.total})` },
              { id: 'pending', label: `قيد الانتظار (${stats.pending})` },
              { id: 'confirmed', label: `مؤكد (${stats.confirmed})` },
              { id: 'cancelled', label: `ملغي (${stats.cancelled})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                  selectedStatus === tab.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-background hover:bg-surface-muted text-body border border-border/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Bookings Container Card */}
        <div className="bg-white border border-border/80 rounded-2xl shadow-card overflow-hidden">
          
          {/* Table Header Strip */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-border/80 flex items-center justify-between bg-surface-muted/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">table_chart</span>
              <h2 className="text-xs sm:text-sm font-bold text-heading">قائمة الحجوزات الطبية</h2>
              <span className="px-2 py-0.5 rounded-md bg-white border border-border text-[10px] sm:text-[11px] font-bold text-muted">
                {filteredBookings.length} موعد
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-muted flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              تحديث فوري
            </span>
          </div>

          {/* Body content */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-muted font-medium">جاري تحميل جدول الحجوزات...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-16 text-center space-y-3 px-4">
              <div className="w-14 h-14 rounded-2xl bg-surface-muted flex items-center justify-center text-muted mx-auto">
                <span className="material-symbols-outlined text-3xl">event_busy</span>
              </div>
              <h3 className="text-base font-bold text-heading">لا توجد حجوزات مطابقة</h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                لم يتم العثور على أي حجز مطابق لمعايير البحث أو التصفية الحالية.
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  مسح البحث
                </button>
              )}
            </div>
          ) : (
            <>
              {/* 1. Mobile Cards View (Visible on screens < 768px) */}
              <div className="md:hidden divide-y divide-border/80">
                {filteredBookings.map((b) => {
                  const isRowBusy = actionLoadingId === b.id;
                  const refCode = b.id.length > 8 ? `#MH-${b.id.slice(0, 5).toUpperCase()}` : `#${b.id}`;

                  return (
                    <div key={b.id} className="p-4 space-y-3 bg-white hover:bg-surface-muted/30 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                            {b.patient_name.slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-heading text-xs sm:text-sm truncate">{b.patient_name}</h3>
                            <span className="text-[10px] font-mono text-muted">{refCode}</span>
                          </div>
                        </div>
                        <div className="shrink-0">
                          {getStatusBadge(b.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-background p-2.5 rounded-xl border border-border/70 text-xs">
                        <div>
                          <span className="text-[10px] text-muted block">الموعد:</span>
                          <span className="font-bold text-heading text-xs">{b.preferred_date}</span>
                          <span className="text-[10px] text-muted block mt-0.5">{b.preferred_time}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted block">الجوال:</span>
                          <a href={`tel:${b.phone}`} className="font-bold text-primary font-mono text-xs inline-flex items-center gap-1 mt-0.5" dir="ltr">
                            <span className="material-symbols-outlined text-xs">call</span>
                            <span>{b.phone}</span>
                          </a>
                        </div>
                      </div>

                      {b.note && (
                        <div className="text-[11px] text-muted bg-surface-muted/50 p-2 rounded-lg border border-border/50">
                          <span className="font-semibold text-heading">ملاحظة: </span>
                          <span>{b.note}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-border/60">
                        <span className="text-[11px] font-bold text-muted">تحديث:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={isRowBusy || b.status === 'confirmed'}
                            onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 active:scale-95 ${
                              b.status === 'confirmed'
                                ? 'bg-success/15 text-success cursor-default'
                                : 'bg-background hover:bg-success hover:text-white text-muted border border-border'
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm">check</span>
                            <span>تأكيد</span>
                          </button>
                          <button
                            type="button"
                            disabled={isRowBusy || b.status === 'pending'}
                            onClick={() => handleUpdateStatus(b.id, 'pending')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 active:scale-95 ${
                              b.status === 'pending'
                                ? 'bg-warning/15 text-warning-dark cursor-default'
                                : 'bg-background hover:bg-warning hover:text-white text-muted border border-border'
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                            <span>انتظار</span>
                          </button>
                          <button
                            type="button"
                            disabled={isRowBusy || b.status === 'cancelled'}
                            onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 active:scale-95 ${
                              b.status === 'cancelled'
                                ? 'bg-error/15 text-error cursor-default'
                                : 'bg-background hover:bg-error hover:text-white text-muted border border-border'
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                            <span>إلغاء</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. Desktop Table View (Visible on screens >= 768px) */}
              <div className="hidden md:block overflow-x-auto w-full">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-background text-muted font-bold border-b border-border">
                    <tr>
                      <th className="py-3.5 px-6">رقم الحجز</th>
                      <th className="py-3.5 px-6">اسم المريض</th>
                      <th className="py-3.5 px-6">رقم الجوال</th>
                      <th className="py-3.5 px-6">الموعد والتوقيت</th>
                      <th className="py-3.5 px-6">الملاحظات</th>
                      <th className="py-3.5 px-6 text-center">الحالة</th>
                      <th className="py-3.5 px-6 text-center">تغيير الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredBookings.map((b) => {
                      const isRowBusy = actionLoadingId === b.id;
                      const refCode = b.id.length > 8 ? `#MH-${b.id.slice(0, 5).toUpperCase()}` : `#${b.id}`;

                      return (
                        <tr key={b.id} className="hover:bg-primary/[0.02] transition-colors">
                          
                          {/* Reference */}
                          <td className="py-4 px-6 font-mono font-bold text-primary">
                            {refCode}
                          </td>

                          {/* Patient Name */}
                          <td className="py-4 px-6 font-bold text-heading">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[11px] shrink-0">
                                {b.patient_name.slice(0, 2)}
                              </div>
                              <span>{b.patient_name}</span>
                            </div>
                          </td>

                          {/* Phone */}
                          <td className="py-4 px-6 font-mono text-body" dir="ltr">
                            <a
                              href={`tel:${b.phone}`}
                              className="hover:text-primary transition-colors inline-flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-xs text-muted">call</span>
                              <span>{b.phone}</span>
                            </a>
                          </td>

                          {/* Date & Time */}
                          <td className="py-4 px-6">
                            <div className="font-bold text-heading">{b.preferred_date}</div>
                            <div className="text-[11px] text-muted">{b.preferred_time}</div>
                          </td>

                          {/* Note */}
                          <td className="py-4 px-6 text-muted text-xs max-w-xs truncate" title={b.note || ''}>
                            {b.note || '—'}
                          </td>

                          {/* Status */}
                          <td className="py-4 px-6 text-center">
                            {getStatusBadge(b.status)}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-center">
                            <div className="inline-flex items-center gap-1.5">
                              
                              {/* Confirm Action */}
                              <button
                                type="button"
                                disabled={isRowBusy || b.status === 'confirmed'}
                                onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                                className={`p-1.5 rounded-lg transition-all ${
                                  b.status === 'confirmed'
                                    ? 'bg-success/15 text-success cursor-default'
                                    : 'bg-background hover:bg-success hover:text-white text-muted border border-border'
                                }`}
                                title="تأكيد الحجز"
                              >
                                <span className="material-symbols-outlined text-base">check</span>
                              </button>

                              {/* Pending Action */}
                              <button
                                type="button"
                                disabled={isRowBusy || b.status === 'pending'}
                                onClick={() => handleUpdateStatus(b.id, 'pending')}
                                className={`p-1.5 rounded-lg transition-all ${
                                  b.status === 'pending'
                                    ? 'bg-warning/15 text-warning-dark cursor-default'
                                    : 'bg-background hover:bg-warning hover:text-white text-muted border border-border'
                                }`}
                                title="إعادة لقيد الانتظار"
                              >
                                <span className="material-symbols-outlined text-base">hourglass_empty</span>
                              </button>

                              {/* Cancel Action */}
                              <button
                                type="button"
                                disabled={isRowBusy || b.status === 'cancelled'}
                                onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                                className={`p-1.5 rounded-lg transition-all ${
                                  b.status === 'cancelled'
                                    ? 'bg-error/15 text-error cursor-default'
                                    : 'bg-background hover:bg-error hover:text-white text-muted border border-border'
                                }`}
                                title="إلغاء الحجز"
                              >
                                <span className="material-symbols-outlined text-base">close</span>
                              </button>

                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}
