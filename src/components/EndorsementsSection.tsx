import React, { useState, useEffect } from 'react';
import { Quote, MessageSquarePlus, CheckCircle2, X } from 'lucide-react';
import { getEndorsements, submitEndorsement } from '../services/api';
import { Endorsement } from '../types/campaign';

export const EndorsementsSection: React.FC = () => {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEndorsements();
  }, []);

  const loadEndorsements = async () => {
    try {
      const data = await getEndorsements();
      setEndorsements(data);
    } catch (err) {
      console.error('Failed to load endorsements', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await submitEndorsement({
        name: name.trim(),
        title: title.trim() || 'District 34 Neighbor',
        neighborhood: neighborhood.trim() || 'District 34',
        quote: quote.trim(),
      });
      setSuccess(res.message);
      setEndorsements((prev) => [res.endorsement, ...prev]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit endorsement.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setName('');
    setTitle('');
    setNeighborhood('');
    setQuote('');
    setSuccess(null);
    setError(null);
  };

  return (
    <section id="endorsements" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-block text-crimson-700 font-extrabold text-xs tracking-widest uppercase bg-crimson-100 px-3 py-1 rounded-full">
              Voices of District 34
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950">
              Standing with Nellie "Cookie" Satcher
            </h2>
            <div className="w-20 h-1 bg-amber-400 rounded-full" />
            <p className="text-slate-600 text-sm md:text-base">
              From classroom teachers to small business owners and faith leaders, our community is uniting behind independent, experienced leadership.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-300 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 self-start md:self-auto transition-colors shadow-md shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Add Your Endorsement</span>
          </button>
        </div>

        {/* Endorsements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {endorsements.map((end) => (
            <div
              key={end.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between relative group hover:border-amber-400/60 transition-colors"
            >
              <Quote className="w-8 h-8 text-amber-400/40 mb-3" />
              <p className="font-serif italic text-slate-700 text-base md:text-lg leading-relaxed mb-6">
                "{end.quote}"
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-navy-950 flex items-center gap-1.5">
                    <span>{end.name}</span>
                    {end.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {end.title} · <span className="text-slate-400">{end.neighborhood}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Endorsement Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl border border-amber-400">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy-950">Thank You For Your Voice!</h3>
                <p className="text-slate-600 text-sm">{success}</p>
                <div className="pt-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 rounded-lg bg-navy-950 text-white font-semibold text-xs uppercase"
                  >
                    View On Wall
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-crimson-700 bg-crimson-50 px-2 py-0.5 rounded">
                  Community Endorsement
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1 mb-1">
                  Why Are You Supporting Cookie?
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Share your testimonial with neighbors across District 34.
                </p>

                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg mb-3">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Brenda Vance"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                        Title / Role
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Local Teacher, Parent"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                        Neighborhood / City
                      </label>
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="e.g. Pearl / Rankin Metro"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                      Your Endorsement Statement *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Nellie understands our schools and community..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-300 font-bold text-sm transition-all shadow-md mt-2"
                  >
                    {submitting ? 'Publishing...' : 'Submit Endorsement'}
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
