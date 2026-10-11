import React, { useState, useEffect } from 'react';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PlatformCommitments } from './components/PlatformCommitments';
import { VoterHub } from './components/VoterHub';
import { EventsSection } from './components/EventsSection';
import { EndorsementsSection } from './components/EndorsementsSection';
import { VolunteerSection } from './components/VolunteerSection';
import { Footer } from './components/Footer';
import { DonateModal } from './components/DonateModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { getCampaignStats } from './services/api';
import { CampaignStats, DonationStats, Volunteer } from './types/campaign';

export default function App() {
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getCampaignStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load campaign statistics', err);
    }
  };

  const handleDonationComplete = (donationStats: DonationStats) => {
    setStats((prev) =>
      prev
        ? {
            ...prev,
            fundsRaised: donationStats.totalRaised,
            donorsCount: donationStats.donorCount,
          }
        : null
    );
  };

  const handleVolunteerRegistered = (vol: Volunteer) => {
    setStats((prev) => {
      if (!prev) return null;
      const isYardSign = vol.interests.some((i) =>
        i.toLowerCase().includes('yard sign')
      );
      return {
        ...prev,
        volunteersCount: prev.volunteersCount + 1,
        yardSignsRequested: isYardSign
          ? prev.yardSignsRequested + 1
          : prev.yardSignsRequested,
      };
    });
  };

  const handleScrollToDonate = () => {
    const el = document.getElementById('donate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-amber-400 selection:text-navy-950 font-sans">
      {/* Header Banner */}
      <TopBanner />

      {/* Main Sticky Navigation */}
      <Navbar
        onOpenDonate={handleScrollToDonate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Embedded Grassroots Donation Panel */}
        <Hero stats={stats} onOpenDonate={handleScrollToDonate} />

        {/* About Nellie "Cookie" Satcher */}
        <AboutSection />

        

        {/* Volunteer Mobilization & Yard Sign Request */}
        <VolunteerSection
          onSuccessRegistered={handleVolunteerRegistered}
          onOpenDonate={handleScrollToDonate}
        />
      </main>

      {/* Campaign Footer */}
      <Footer
        onOpenDonate={handleScrollToDonate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Grassroots Donation Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        onDonationComplete={handleDonationComplete}
      />

      {/* Campaign Headquarters Management Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
