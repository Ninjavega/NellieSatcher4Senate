export interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  interests: string[];
  notes?: string;
  createdAt: string;
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  frequency: 'one-time' | 'monthly';
  message?: string;
  anonymous: boolean;
  createdAt: string;
}

export interface DonationStats {
  totalRaised: number;
  donorCount: number;
  goal: number;
  averageGift: number;
}

export interface Endorsement {
  id: string;
  name: string;
  title: string;
  neighborhood: string;
  quote: string;
  avatarUrl?: string;
  verified: boolean;
  createdAt: string;
}

export interface CampaignEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  capacity: number;
  rsvpsCount: number;
}

export interface Precinct {
  zip: string;
  precinctName: string;
  pollingLocation: string;
  address: string;
  hours: string;
  earlyVotingLocation: string;
  earlyVotingDates: string;
}

export interface CampaignStats {
  daysUntilElection: number;
  volunteersCount: number;
  yardSignsRequested: number;
  fundsRaised: number;
  donorsCount: number;
}
