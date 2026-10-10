import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  CheckCircle,
  AlertCircle,
  Car,
  FileText,
} from 'lucide-react';
import { lookupPrecinct } from '../services/api';
import { Precinct } from '../types/campaign';

interface VoterHubProps {
  onOpenVolunteer: () => void;
}

export const VoterHub: React.FC<VoterHubProps> = ({ onOpenVolunteer }) => {
  const [zipInput, setZipInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ found: boolean; precinct: Precinct } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rideRequested, setRideRequested] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await lookupPrecinct(zipInput.trim());
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to find precinct information.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="election" className="py-20 md:py-28 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-block text-amber-300 font-extrabold text-xs tracking-widest uppercase bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
            Voter Resource Center
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white">
            Make Your Vote Count in District 34
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full" />
          <p className="text-slate-300 text-sm md:text-base pt-1">
            Find your polling location, review key deadlines, and get ready for Election Day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Key Election Info Card */}
          <div className="lg:col-span-5 bg-navy-900/90 rounded-2xl p-7 border border-amber-400/30 shadow-2xl relative">
            <div className="flex items-center gap-2 text-amber-300 mb-3">
              <Calendar className="w-5 h-5" />
              <span className="font-bold tracking-wider uppercase text-xs">Official Election Dates</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-1">
              ELECTION DAY
            </h3>
            <div className="text-xl font-bold text-amber-400 font-serif mb-5">
              Tuesday, December 22, 2026
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-navy-950/80 border border-slate-800 text-sm mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Office:</span>
                <span className="font-bold text-white">District 34 State Senate</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Ballot Category:</span>
                <span className="font-bold text-amber-400">Non-Partisan</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Election Hours:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  7:00 AM – 7:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">In-Person Early Voting:</span>
                <span className="font-bold text-white">Nov 30 – Dec 19, 2026</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>What To Bring To The Polls</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Valid Government Photo ID (Driver's License, State ID, or Passport)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>If registered, your name will appear on the precinct poll book</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Curbside voting is available for voters with mobility limitations</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800">
              {rideRequested ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Ride assistance requested! Campaign dispatch will contact you.</span>
                </div>
              ) : (
                <button
                  onClick={() => setRideRequested(true)}
                  className="w-full py-2.5 px-4 bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Car className="w-4 h-4 text-amber-400" />
                  <span>Need a Free Ride to the Polls on Election Day?</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Precinct Finder Right */}
          <div className="lg:col-span-7 bg-navy-900/80 rounded-2xl p-7 md:p-8 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="font-bold tracking-wider uppercase text-xs">Precinct &amp; Polling Place Lookup</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Find Your Voting Location
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Enter your 5-digit zip code to locate your designated precinct and polling station for District 34.
            </p>

            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                maxLength={5}
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 5-digit zip code (e.g. 39208)"
                className="flex-1 px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm font-mono"
              />
              <button
                type="submit"
                disabled={loading || zipInput.length < 5}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 hover:from-crimson-700 hover:to-crimson-800 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? 'Searching...' : 'Find My Precinct'}</span>
              </button>
            </form>

            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
              <span>Try common District 34 zip codes:</span>
              {['39208', '39042', '39047', '39232', '39110'].map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => {
                    setZipInput(z);
                  }}
                  className="px-2 py-0.5 rounded bg-navy-950 border border-slate-700 text-amber-300 hover:border-amber-400 font-mono text-[11px]"
                >
                  {z}
                </button>
              ))}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <div className="p-6 rounded-xl bg-navy-950 border border-amber-400/40 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                      {result.precinct.precinctName}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-1">
                      {result.precinct.pollingLocation}
                    </h4>
                    <p className="text-sm text-slate-300 mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {result.precinct.address}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Election Day Hours:</span>
                    <span className="font-bold text-white">{result.precinct.hours}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Early Voting Location:</span>
                    <span className="font-bold text-amber-300">{result.precinct.earlyVotingLocation}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 italic">
                  Note: If you have recently moved within District 34, make sure to update your address with the Circuit Clerk before the voter registration cutoff.
                </div>
              </div>
            )}

            {!result && (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-slate-400 text-sm">
                Enter your zip code above to preview your assigned polling place and early voting center.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
