import React, { useState } from 'react';
import { Heart, X, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';
import { submitDonation } from '../services/api';
import { DonationStats, Donation } from '../types/campaign';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationComplete?: (stats: DonationStats) => void;
}

const AMOUNTS = [25, 50, 100, 250, 500];

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  onDonationComplete,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successDonation, setSuccessDonation] = useState<Donation | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const getEffectiveAmount = () => {
    if (isCustom) {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount;
  };

  const handleProcessDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveAmount = getEffectiveAmount();

    if (effectiveAmount <= 0) {
      setError('Please select or enter a valid donation amount.');
      return;
    }

    if (!anonymous && !donorName.trim()) {
      setError('Please provide your name or check anonymous.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await submitDonation({
        donorName: donorName.trim() || 'Supporter',
        email: email.trim() || 'friend@district34.org',
        amount: effectiveAmount,
        frequency,
        message: message.trim() || undefined,
        anonymous,
      });

      setSuccessDonation(res.donation);
      if (onDonationComplete) {
        onDonationComplete(res.stats);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction could not be completed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccessDonation(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border-2 border-amber-400 my-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close donation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successDonation ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
              Thank You For Your Support!
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
              Your contribution of{' '}
              <strong className="text-navy-950 font-mono text-base">
                ${successDonation.amount.toLocaleString()}
              </strong>{' '}
              ({successDonation.frequency}) directly fuels lawn signs, local flyers, and neighborhood outreach for Nellie "Cookie" Satcher.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-bold text-slate-800">{successDonation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="text-slate-800">{new Date(successDonation.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient:</span>
                <span className="text-slate-800">Nellie Satcher for Senate Committee</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              A receipt confirmation has been issued. Contributions to candidate committees are not tax-deductible for federal tax purposes.
            </p>

            <div className="pt-2">
              <button
                onClick={handleClose}
                className="w-full py-3 bg-navy-950 hover:bg-navy-900 text-amber-300 font-bold rounded-xl text-sm transition-all"
              >
                Return To Campaign Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-crimson-100 text-crimson-700 rounded-full flex items-center justify-center mx-auto mb-2 text-xl">
                <Heart className="w-6 h-6 fill-crimson-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy-950">
                Support Nellie's Campaign
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Invest in Experienced Non-Partisan Leadership for District 34
              </p>
            </div>

            {/* Frequency Segmented Control */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`py-2 rounded-lg transition-all ${
                  frequency === 'one-time'
                    ? 'bg-white text-navy-950 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                One-Time Gift
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`py-2 rounded-lg transition-all ${
                  frequency === 'monthly'
                    ? 'bg-white text-navy-950 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Sustainer
              </button>
            </div>

            {/* Amount Selection */}
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setIsCustom(false);
                  }}
                  className={`py-3 px-2 rounded-xl font-bold text-base transition-all border-2 font-mono ${
                    !isCustom && selectedAmount === amt
                      ? 'border-crimson-700 bg-crimson-50 text-crimson-700 shadow-sm'
                      : 'border-slate-200 text-navy-950 hover:border-amber-400'
                  }`}
                >
                  ${amt}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`py-3 px-2 rounded-xl font-bold text-sm transition-all border-2 ${
                  isCustom
                    ? 'border-crimson-700 bg-crimson-50 text-crimson-700 shadow-sm'
                    : 'border-slate-200 text-navy-950 hover:border-amber-400'
                }`}
              >
                Custom
              </button>
            </div>

            {isCustom && (
              <div className="mb-4">
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="number"
                    min="5"
                    step="5"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border-2 border-crimson-700 rounded-xl font-mono text-base font-bold focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleProcessDonation} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                  Contributor Name *
                </label>
                <input
                  type="text"
                  required={!anonymous}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                  Words of Support for Nellie (Optional)
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Keep fighting for District 34!"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anon-check"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="rounded text-crimson-700 focus:ring-crimson-600"
                />
                <label htmlFor="anon-check" className="text-xs text-slate-600 cursor-pointer">
                  Keep my donation anonymous on public supporter rosters
                </label>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Encrypted grassroots campaign processor. All funds comply with state ethics laws.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-crimson-700 to-crimson-800 hover:from-crimson-800 hover:to-crimson-900 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-base flex items-center justify-center gap-2 mt-3"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>
                  {loading
                    ? 'Processing Contribution...'
                    : `Contribute $${getEffectiveAmount() || 0} ${
                        frequency === 'monthly' ? '/ Month' : 'Today'
                      }`}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
