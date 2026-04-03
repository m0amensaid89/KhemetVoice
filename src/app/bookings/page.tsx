import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Calendar as CalendarIcon, Clock, Video, ChevronLeft, ChevronRight } from "lucide-react";

export default function BookingsPage() {
  const upcomingBookings = [
    { id: 1, name: "Ahmed Al-Maktoum", type: "Product Demo", date: "Today", time: "14:00 (GST)", agent: "Sales Qualification", status: "confirmed" },
    { id: 2, name: "Sarah Connor", type: "Technical Consultation", date: "Tomorrow", time: "10:30 (GST)", agent: "Support L1", status: "pending" },
    { id: 3, name: "Mohammed Tariq", type: "Enterprise Onboarding", date: "May 18", time: "09:00 (GST)", agent: "Sales Qualification", status: "confirmed" },
  ];

  return (
    <AppShell title="Bookings & Meetings">
      <div className="flex flex-col gap-6">

        {/* Actions & Filters */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2 bg-white/5">
              <CalendarIcon className="w-4 h-4" />
              List View
            </Button>
            <Button variant="tertiary" className="gap-2">
              Calendar View
            </Button>
          </div>
          <Button className="gap-2">
            Connect Google Calendar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-display font-medium text-white">Upcoming Meetings</h2>
              <div className="flex gap-2">
                <Button variant="icon" size="sm"><ChevronLeft className="w-4 h-4" /></Button>
                <Button variant="icon" size="sm"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>

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
