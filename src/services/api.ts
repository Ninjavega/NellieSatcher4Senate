import {
  Volunteer,
  Donation,
  DonationStats,
  Endorsement,
  CampaignEvent,
  Precinct,
  CampaignStats,
} from '../types/campaign';

export async function getCampaignStats(): Promise<CampaignStats> {
  const res = await fetch('/api/stats');
  if (!res.ok) throw new Error('Failed to fetch stats');
  const data = await res.json();
  return data.stats;
}

export async function getDonationStats(): Promise<DonationStats> {
  const res = await fetch('/api/donations/stats');
  if (!res.ok) throw new Error('Failed to fetch donation stats');
  const data = await res.json();
  return data.stats;
}

export async function getDonations(): Promise<Donation[]> {
  const res = await fetch('/api/donations');
  if (!res.ok) throw new Error('Failed to fetch donations');
  const data = await res.json();
  return data.donations;
}

export async function submitDonation(donation: {
  donorName: string;
  email: string;
  amount: number;
  frequency: 'one-time' | 'monthly';
  message?: string;
  anonymous: boolean;
}): Promise<{ donation: Donation; stats: DonationStats }> {
  const res = await fetch('/api/donations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donation),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit donation');
  }
  return res.json();
}

export async function getVolunteers(): Promise<Volunteer[]> {
  const res = await fetch('/api/volunteers');
  if (!res.ok) throw new Error('Failed to fetch volunteers');
  const data = await res.json();
  return data.volunteers;
}

export async function registerVolunteer(payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  interests: string[];
  notes?: string;
}): Promise<{ message: string; volunteer: Volunteer; totalVolunteers: number }> {
  const res = await fetch('/api/volunteers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to register volunteer');
  }
  return res.json();
}

export async function getEndorsements(): Promise<Endorsement[]> {
  const res = await fetch('/api/endorsements');
  if (!res.ok) throw new Error('Failed to fetch endorsements');
  const data = await res.json();
  return data.endorsements;
}

export async function submitEndorsement(payload: {
  name: string;
  title?: string;
  neighborhood?: string;
  quote: string;
}): Promise<{ message: string; endorsement: Endorsement }> {
  const res = await fetch('/api/endorsements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit endorsement');
  }
  return res.json();
}

export async function getEvents(): Promise<CampaignEvent[]> {
  const res = await fetch('/api/events');
  if (!res.ok) throw new Error('Failed to fetch events');
  const data = await res.json();
  return data.events;
}

export async function rsvpEvent(
  eventId: string,
  payload: { name: string; email: string }
): Promise<{ message: string; rsvpsCount: number }> {
  const res = await fetch(`/api/events/${eventId}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to RSVP');
  }
  return res.json();
}

export async function lookupPrecinct(zip: string): Promise<{ found: boolean; precinct: Precinct }> {
  const res = await fetch(`/api/precincts/lookup?zip=${encodeURIComponent(zip)}`);
  if (!res.ok) throw new Error('Failed to look up precinct');
  return res.json();
}
