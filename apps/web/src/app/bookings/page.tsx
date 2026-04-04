'use client';

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Calendar as CalendarIcon, Clock, Video, ChevronLeft, ChevronRight, List } from "lucide-react";
import { useState } from "react";

export default function BookingsPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const upcomingBookings = [
    { id: 1, name: "Ahmed Al-Maktoum", type: "Product Demo", date: "Today", time: "14:00 (GST)", agent: "Sales Qualification", status: "confirmed" },
    { id: 2, name: "Sarah Connor", type: "Technical Consultation", date: "Tomorrow", time: "10:30 (GST)", agent: "Support L1", status: "pending" },
    { id: 3, name: "Mohammed Tariq", type: "Enterprise Onboarding", date: "May 18", time: "09:00 (GST)", agent: "Sales Qualification", status: "confirmed" },
  ];

  // Mock calendar data
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = Array.from({ length: 35 }, (_, i) => i - 2); // Start from previous month's end

  return (
    <AppShell title="Bookings & Meetings">
      <div className="flex flex-col gap-6">

        {/* Actions & Filters */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={view === 'list' ? 'secondary' : 'tertiary'}
              className={`gap-2 ${view === 'list' ? 'bg-white/5' : ''}`}
              onClick={() => setView('list')}
            >
              <List className="w-4 h-4" />
              List View
            </Button>
            <Button
              variant={view === 'calendar' ? 'secondary' : 'tertiary'}
              className={`gap-2 ${view === 'calendar' ? 'bg-white/5' : ''}`}
              onClick={() => setView('calendar')}
            >
              <CalendarIcon className="w-4 h-4" />
              Calendar View
            </Button>
          </div>
          <Button className="gap-2">
            Connect Google Calendar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Content Area */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-display font-medium text-white">
                {view === 'list' ? 'Upcoming Meetings' : 'May 2024'}
              </h2>
              <div className="flex gap-2">
                <Button variant="icon" size="sm"><ChevronLeft className="w-4 h-4" /></Button>
                <Button variant="icon" size="sm"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>

            {view === 'list' ? (
              // List View
              <>
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="p-5" elite={booking.date === 'Today'}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-sm bg-surface-high border border-white/10 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] uppercase text-text-secondary font-medium tracking-widest">{booking.date === 'Today' ? 'MAY' : booking.date === 'Tomorrow' ? 'MAY' : 'MAY'}</span>
                          <span className="text-lg font-display text-white font-bold leading-none">{booking.date === 'Today' ? '15' : booking.date === 'Tomorrow' ? '16' : '18'}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-medium text-white">{booking.name}</h3>
                            <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'} className="text-[10px]">
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-text-secondary">{booking.type}</div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-text-secondary">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {booking.time}</span>
                            <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Google Meet</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2">
                        <Button variant="secondary" size="sm" className="w-full sm:w-auto">Reschedule</Button>
                        <Button size="sm" className="w-full sm:w-auto">Join Meeting</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              // Calendar View
              <Card className="p-0 overflow-hidden border border-white/10">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 border-b border-white/10 bg-surface-low">
                  {daysOfWeek.map(day => (
                    <div key={day} className="py-2 text-center text-xs font-medium uppercase tracking-wider text-text-secondary border-r border-white/5 last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 grid-rows-5 bg-surface-high">
                  {calendarDays.map((day, i) => {
                    const isCurrentMonth = day > 0 && day <= 31;
                    const isToday = day === 15;
                    const hasEvent = isCurrentMonth && (day === 15 || day === 16 || day === 18);

                    return (
                      <div
                        key={i}
                        className={`min-h-[100px] p-2 border-b border-r border-white/5 ${!isCurrentMonth ? 'bg-surface-low/50 text-white/20' : 'bg-surface hover:bg-white/5 transition-colors'} ${i % 7 === 6 ? 'border-r-0' : ''}`}
                      >
                        <div className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-white' : (isCurrentMonth ? 'text-white/70' : '')}`}>
                          {day > 0 ? (day > 31 ? day - 31 : day) : 30 + day}
                        </div>

                        {/* Mock Events */}
                        {hasEvent && (
                          <div className="mt-1 flex flex-col gap-1">
                            {day === 15 && (
                              <div className="text-[10px] px-1.5 py-0.5 rounded-sm bg-primary/20 text-primary border border-primary/20 truncate">
                                14:00 Ahmed A.
                              </div>
                            )}
                            {day === 16 && (
                              <div className="text-[10px] px-1.5 py-0.5 rounded-sm bg-tertiary/20 text-tertiary border border-tertiary/20 truncate">
                                10:30 Sarah C.
                              </div>
                            )}
                            {day === 18 && (
                              <div className="text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary/20 text-secondary border border-secondary/20 truncate">
                                09:00 Mohd T.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <Card className="p-5 bg-surface-low">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white mb-4">Scheduling Intelligence</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-text-secondary mb-1">Total Meetings Scheduled via AI</div>
                  <div className="text-2xl font-display font-bold text-white">142</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary mb-1">Most Active Scheduling Agent</div>
                  <div className="text-sm font-medium text-white">Sales Qualification</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary mb-1">No-show Rate</div>
                  <div className="text-sm font-medium text-emerald-400">4.2% (Low)</div>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-dashed border-white/20 bg-transparent flex flex-col items-center justify-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-high flex items-center justify-center text-text-secondary">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Connect More Calendars</h3>
              <p className="text-xs text-text-secondary">Allow agents to book across multiple team members&apos; schedules.</p>
              </div>
              <Button variant="secondary" size="sm">Add Integration</Button>
            </Card>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
