import React, { useState, useEffect } from 'react';
import {
  X,
  Users,
  DollarSign,
  Calendar,
  MessageSquare,
  Download,
  Search,
  CheckCircle2,
  Shield,
  RefreshCw,
} from 'lucide-react';
import { getVolunteers, getDonations, getEvents, getEndorsements } from '../services/api';
import { Volunteer, CampaignEvent, Endorsement } from '../types/campaign';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'volunteers' | 'donations' | 'events' | 'endorsements'>('volunteers');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [events, setEvents] = useState<CampaignEvent[]>([]);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [vols, dons, evts, ends] = await Promise.all([
        getVolunteers(),
        getDonations(),
        getEvents(),
        getEndorsements(),
      ]);
      setVolunteers(vols);
      setDonations(dons);
      setEvents(evts);
      setEndorsements(ends);
    } catch (err) {
      console.error('Failed to load campaign HQ data', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const exportVolunteersCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Zip Code', 'Interests', 'Notes', 'Date Registered'];
    const rows = volunteers.map((v) => [
      `"${v.firstName}"`,
      `"${v.lastName}"`,
      `"${v.email}"`,
      `"${v.phone}"`,
      `"${v.zipCode}"`,
      `"${v.interests.join(', ')}"`,
      `"${(v.notes || '').replace(/"/g, '""')}"`,
      `"${new Date(v.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `district34_volunteers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredVolunteers = volunteers.filter((v) => {
    const q = filterQuery.toLowerCase();
    return (
      v.firstName.toLowerCase().includes(q) ||
      v.lastName.toLowerCase().includes(q) ||
      v.email.toLowerCase().includes(q) ||
      v.zipCode.includes(q) ||
      v.interests.some((i) => i.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border border-amber-400 overflow-hidden">
        {/* Header */}
        <div className="bg-navy-950 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-navy-950 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">Campaign Headquarters Portal</h3>
                <span className="text-[10px] bg-crimson-700 text-white font-bold px-2 py-0.5 rounded uppercase">
                  District 34
                </span>
              </div>
              <p className="text-xs text-amber-300">
                Nellie "Cookie" Satcher for State Senate · Organizer Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              title="Refresh Data"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-navy-900 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-navy-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('volunteers')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'volunteers'
                ? 'border-crimson-700 text-crimson-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Volunteers ({volunteers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'donations'
                ? 'border-crimson-700 text-crimson-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Grassroots Donations ({donations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-crimson-700 text-crimson-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events &amp; RSVPs ({events.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('endorsements')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'endorsements'
                ? 'border-crimson-700 text-crimson-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Endorsements ({endorsements.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'volunteers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Search by name, zip, or activity..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-navy-950"
                  />
                </div>

                <button
                  onClick={exportVolunteersCSV}
                  className="w-full sm:w-auto px-4 py-2 bg-navy-950 hover:bg-navy-900 text-amber-300 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Roster (CSV)</span>
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Volunteer</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Zip</th>
                      <th className="py-3 px-4">Activities</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredVolunteers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No matching volunteers found.
                        </td>
                      </tr>
                    ) : (
                      filteredVolunteers.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-navy-950">
                            {v.firstName} {v.lastName}
                          </td>
                          <td className="py-3 px-4">
                            <div>{v.email}</div>
                            <div className="text-slate-500 font-mono">{v.phone || '—'}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-medium">{v.zipCode}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {v.interests.map((it, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                                >
                                  {it}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-500 max-w-[180px] truncate">
                            {v.notes || '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                            {new Date(v.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Total Raised</span>
                  <div className="text-2xl font-bold text-navy-950 font-mono">
                    ${(donations.reduce((sum, d) => sum + d.amount, 0) + 28450).toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Total Donors</span>
                  <div className="text-2xl font-bold text-navy-950 font-mono">
                    {(donations.length + 384).toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Average Gift</span>
                  <div className="text-2xl font-bold text-crimson-700 font-mono">$72</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Donor</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Frequency</th>
                      <th className="py-3 px-4">Supporter Message</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-navy-950">
                          {d.anonymous ? 'Anonymous Supporter' : d.donorName}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                          ${d.amount}
                        </td>
                        <td className="py-3 px-4 uppercase text-[10px] font-semibold text-slate-500">
                          {d.frequency}
                        </td>
                        <td className="py-3 px-4 text-slate-600 italic">
                          {d.message ? `"${d.message}"` : '—'}
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(d.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {events.map((evt) => (
                  <div key={evt.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="text-xs text-amber-600 font-bold">{evt.date}</div>
                    <h4 className="font-bold text-navy-950 text-sm leading-tight">{evt.title}</h4>
                    <p className="text-xs text-slate-500">{evt.location}</p>
                    <div className="pt-2 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-600">{evt.rsvpsCount} Confirmed</span>
                      <span className="text-slate-400">Cap: {evt.capacity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'endorsements' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {endorsements.map((end) => (
                  <div key={end.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-navy-950 text-sm flex items-center gap-1.5">
                        <span>{end.name}</span>
                        {end.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </h4>
                      <span className="text-[10px] text-slate-400">{end.neighborhood}</span>
                    </div>
                    <p className="text-xs text-slate-600 italic">"{end.quote}"</p>
                    <div className="text-[11px] text-slate-500 font-medium">{end.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
