import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2, X } from 'lucide-react';
import { getEvents, rsvpEvent } from '../services/api';
import { CampaignEvent } from '../types/campaign';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<CampaignEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CampaignEvent | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load events', err);
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !rsvpName.trim() || !rsvpEmail.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await rsvpEvent(selectedEvent.id, {
        name: rsvpName.trim(),
        email: rsvpEmail.trim(),
      });
      setRsvpSuccess(res.message);
      // update state
      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === selectedEvent.id ? { ...evt, rsvpsCount: res.rsvpsCount } : evt
        )
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'RSVP failed. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setRsvpName('');
    setRsvpEmail('');
    setRsvpSuccess(null);
    setError(null);
  };

  return (
    <section id="events" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block text-crimson-700 font-extrabold text-xs tracking-widest uppercase bg-crimson-50 px-3 py-1 rounded-full">
            On The Campaign Trail
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950">
            Meet Nellie In Your Neighborhood
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full" />
          <p className="text-slate-600 text-base">
            Join Cookie for community coffees, policy roundtables, and volunteer action days across District 34.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-amber-600 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {evt.date}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-crimson-700 transition-colors leading-snug">
                  {evt.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-navy-900 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-navy-900 shrink-0" />
                    <span className="font-medium text-slate-800">{evt.location}</span>
                  </div>
                  <div className="text-slate-500 pl-5.5">{evt.address}</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  {evt.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{evt.rsvpsCount} RSVPs</span>
                </div>

                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="px-4 py-2 rounded-lg bg-navy-950 hover:bg-crimson-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  RSVP Free
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative shadow-2xl border border-amber-400">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-navy-950">You're on the Guest List!</h4>
                <p className="text-slate-600 text-sm">{rsvpSuccess}</p>
                <div className="pt-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 rounded-lg bg-navy-950 text-white font-semibold text-xs uppercase"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-crimson-700 bg-crimson-50 px-2 py-0.5 rounded">
                  Community Event
                </span>
                <h3 className="font-serif text-xl font-bold text-navy-950 mt-1 mb-1">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {selectedEvent.date} · {selectedEvent.time}
                </p>

                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg mb-3">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRsvpSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500">
                    We'll email you a calendar invite and location details. Admission is completely free!
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-300 font-bold text-sm transition-all shadow-md mt-2"
                  >
                    {submitting ? 'Confirming...' : 'Confirm My RSVP'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
