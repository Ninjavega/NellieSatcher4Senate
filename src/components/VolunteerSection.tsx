import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { registerVolunteer } from '../services/api';
import { Volunteer } from '../types/campaign';

interface VolunteerSectionProps {
  onSuccessRegistered?: (vol: Volunteer) => void;
  onOpenDonate: () => void;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({
  onSuccessRegistered,
  onOpenDonate,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [interests, setInterests] = useState<string[]>(['Host a Yard Sign']);
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !zipCode.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await registerVolunteer({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        zipCode: zipCode.trim(),
        interests,
        notes: notes.trim(),
      });

      setSubmitted(true);
      if (onSuccessRegistered) {
        onSuccessRegistered(res.volunteer);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setZipCode('');
    setInterests(['Host a Yard Sign']);
    setNotes('');
  };

  return (
    <section id="volunteer" className="py-20 md:py-28 bg-gradient-to-b from-navy-900 to-navy-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mobilization Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-300 font-extrabold text-xs tracking-widest uppercase bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              Grassroots Momentum
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              A Campaign Powered By Our Neighbors
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Every yard sign placed, every door knocked, and every conversation shared brings District 34 closer to responsive leadership that works for everyone.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Free Lawn Signs Delivered</h3>
                  <p className="text-xs text-slate-400">
                    Check "Host a Yard Sign" and our volunteer field team will deliver and place a sign in your yard.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-crimson-600/30 text-crimson-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Flexible Volunteer Shifts</h3>
                  <p className="text-xs text-slate-400">
                    Whether you have 1 hour a week or 10, there's a place for your talents on Team Cookie.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-amber-400/30">
              <p className="font-serif italic text-xs text-amber-200">
                "Our strength isn't big corporate donors. Our strength is every mother, father, worker, and retiree who wants District 34 to thrive."
              </p>
              <div className="text-[11px] text-amber-400 font-bold mt-1.5">— Nellie "Cookie" Satcher</div>
            </div>
          </div>

          {/* Right Column: Supporter Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl border-2 border-amber-400 relative">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-navy-950">
                    Thank You For Standing With Us!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Your commitment makes a tangible difference for District 34. A member of the Nellie "Cookie" Satcher field team will reach out with your yard sign or volunteer schedule.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                    >
                      Register Another Supporter
                    </button>
                    <button
                      onClick={onOpenDonate}
                      className="px-5 py-2.5 rounded-lg bg-crimson-700 text-white text-xs font-bold hover:bg-crimson-800 flex items-center gap-1.5 shadow"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Fuel The Campaign with a $25 Gift</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <span className="text-crimson-700 font-extrabold text-xs uppercase tracking-widest bg-crimson-50 px-3 py-1 rounded-full">
                      Make Your Voice Heard
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-2">
                      Join Team Cookie Today!
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">
                      Sign up to volunteer, request a yard sign, or stay informed on local issues.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg mb-4">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Jane"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-950 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-950 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-950 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-950 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="39xxx"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-950 text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                        How would you like to help? (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-medium">
                        {[
                          'Host a Yard Sign',
                          'Volunteer Time',
                          'Phone Banking',
                          'Door Knocking',
                          'Event Greeter',
                          'Precinct Captain',
                        ].map((option) => (
                          <label
                            key={option}
                            className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${
                              interests.includes(option)
                                ? 'border-amber-500 bg-amber-50/50 text-navy-950 font-bold'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={interests.includes(option)}
                              onChange={() => toggleInterest(option)}
                              className="rounded text-crimson-700 focus:ring-crimson-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                        Notes or Questions for Cookie (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us what matters most to your neighborhood..."
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-950 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 hover:from-navy-900 hover:to-navy-800 text-amber-300 font-extrabold text-base shadow-lg transition-all transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2"
                    >
                      <span>{loading ? 'Submitting...' : 'Count Me In!'}</span>
                      <ArrowRight className="w-5 h-5 text-amber-400" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
