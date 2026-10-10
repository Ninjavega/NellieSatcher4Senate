import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- In-Memory Store with Seed Data ---

interface VolunteerRecord {
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

interface DonationRecord {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  frequency: 'one-time' | 'monthly';
  message?: string;
  anonymous: boolean;
  createdAt: string;
}

interface EndorsementRecord {
  id: string;
  name: string;
  title: string;
  neighborhood: string;
  quote: string;
  avatarUrl?: string;
  verified: boolean;
  createdAt: string;
}

interface EventRecord {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  capacity: number;
  rsvpsCount: number;
  attendees: Array<{ name: string; email: string }>;
}

let volunteers: VolunteerRecord[] = [
  {
    id: 'vol-1',
    firstName: 'Marcus',
    lastName: 'Robinson',
    email: 'marcus.robinson@example.com',
    phone: '(601) 555-0142',
    zipCode: '39208',
    interests: ['Host a Yard Sign', 'Canvassing'],
    notes: 'Excited to help organize our neighborhood block walk!',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'vol-2',
    firstName: 'Denise',
    lastName: 'Holloway',
    email: 'denise.h@example.com',
    phone: '(601) 555-0189',
    zipCode: '39042',
    interests: ['Host a Yard Sign', 'Phone Banking'],
    notes: 'Retired teacher, passionate about Cookie’s education plan.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'vol-3',
    firstName: 'Arthur',
    lastName: 'Jackson',
    email: 'ajackson@example.com',
    phone: '(601) 555-0211',
    zipCode: '39110',
    interests: ['Volunteer Time', 'Event Greeter'],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

let donations: DonationRecord[] = [
  {
    id: 'don-1',
    donorName: 'Evelyn Carter',
    email: 'evelyn.c@example.com',
    amount: 100,
    frequency: 'one-time',
    message: 'We believe in your vision for our public schools, Nellie!',
    anonymous: false,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'don-2',
    donorName: 'Anonymous Supporter',
    email: 'anon@example.com',
    amount: 250,
    frequency: 'one-time',
    message: 'Time for true transparency and community results.',
    anonymous: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'don-3',
    donorName: 'David & Sarah Miller',
    email: 'millers@example.com',
    amount: 50,
    frequency: 'monthly',
    message: 'Proud to back Nellie Satcher!',
    anonymous: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'don-4',
    donorName: 'Brenda Vance',
    email: 'bvance@example.com',
    amount: 500,
    frequency: 'one-time',
    message: 'District 34 needs your steady leadership.',
    anonymous: false,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'don-5',
    donorName: 'Kenrick Washington',
    email: 'kwash@example.com',
    amount: 25,
    frequency: 'one-time',
    message: 'Grassroots all the way!',
    anonymous: false,
    createdAt: new Date().toISOString(),
  },
];

let endorsements: EndorsementRecord[] = [
  {
    id: 'end-1',
    name: 'Rev. Kenneth Coleman',
    title: 'Senior Pastor & Community Outreach Chair',
    neighborhood: 'East Jackson / Rankin Metro',
    quote: 'Nellie has walked these streets and listened to our families for decades. She understands that real progress is built on faith, honesty, and showing up every single day.',
    verified: true,
    createdAt: '2026-09-12T10:00:00Z',
  },
  {
    id: 'end-2',
    name: 'Dr. Cheryl Ann Matthews',
    title: 'Public School Educator of 26 Years',
    neighborhood: 'Brandon / Pearl Valley',
    quote: 'Our classrooms are starved of resources while politics takes center stage. Cookie Satcher is the only non-partisan candidate with a detailed plan to put educators and kids first.',
    verified: true,
    createdAt: '2026-09-15T14:30:00Z',
  },
  {
    id: 'end-3',
    name: 'Raymond "Ray" Vance',
    title: 'Local Small Business Owner & Veteran',
    neighborhood: 'Flowood Commerce Corridor',
    quote: 'Small business owners don’t need partisan speeches—we need fair regulations, lower costs, and vibrant communities. Cookie delivers practical solutions we can trust.',
    verified: true,
    createdAt: '2026-09-20T09:15:00Z',
  },
  {
    id: 'end-4',
    name: 'Maria Gonzalez, RN',
    title: 'Community Health Nurse',
    neighborhood: 'District 34 South',
    quote: 'Cookie listens with her whole heart. Her healthcare platform will ensure our seniors have access to affordable medication and local clinical care.',
    verified: true,
    createdAt: '2026-09-28T16:45:00Z',
  },
];

let campaignEvents: EventRecord[] = [
  {
    id: 'evt-1',
    title: 'Coffee & Conversation with Nellie "Cookie" Satcher',
    date: 'Saturday, November 7, 2026',
    time: '9:30 AM – 11:30 AM',
    location: 'District 34 Community Commons',
    address: '1420 Main Street, Suite B',
    description: 'An informal neighborhood gathering to discuss education, small business support, and hear your priorities for the upcoming legislative session. Coffee and refreshments provided.',
    capacity: 75,
    rsvpsCount: 48,
    attendees: [],
  },
  {
    id: 'evt-2',
    title: 'Town Hall: Safe Neighborhoods & Youth Programs',
    date: 'Thursday, November 19, 2026',
    time: '6:30 PM – 8:00 PM',
    location: 'Lakeside Civic Auditorium',
    address: '800 Parkview Boulevard',
    description: 'A focused community forum featuring neighborhood leaders, first responders, and local parents discussing community policing and after-school opportunities.',
    capacity: 150,
    rsvpsCount: 92,
    attendees: [],
  },
  {
    id: 'evt-3',
    title: 'District 34 Day of Action & Volunteer Kickoff',
    date: 'Saturday, December 5, 2026',
    time: '10:00 AM – 2:00 PM',
    location: 'Campaign Headquarters',
    address: '2200 Commerce Way, Building 4',
    description: 'Join team Cookie for our citywide canvass, yard sign distribution, and voter registration mobilization as we head into the final weeks before Election Day.',
    capacity: 120,
    rsvpsCount: 84,
    attendees: [],
  },
];

const precinctsDatabase = [
  {
    zip: '39208',
    precinctName: 'Precinct 34-A (Pearl North)',
    pollingLocation: 'Pearl Civic Center Activity Hall',
    address: '2420 Old Brandon Rd, Pearl, MS 39208',
    hours: '7:00 AM – 7:00 PM',
    earlyVotingLocation: 'Rankin County Circuit Court / Voter Annex',
    earlyVotingDates: 'Nov 30 – Dec 19, 2026 (Mon-Fri 8am-5pm)',
  },
  {
    zip: '39042',
    precinctName: 'Precinct 34-B (Brandon Central)',
    pollingLocation: 'Brandon Middle School Gymnasium',
    address: '408 S College St, Brandon, MS 39042',
    hours: '7:00 AM – 7:00 PM',
    earlyVotingLocation: 'Brandon Municipal Community Center',
    earlyVotingDates: 'Nov 30 – Dec 19, 2026 (Mon-Fri 8am-5pm)',
  },
  {
    zip: '39047',
    precinctName: 'Precinct 34-C (Reservoir Community)',
    pollingLocation: 'Reservoir Fire Department & Community Room',
    address: '1030 Northshore Pkwy, Brandon, MS 39047',
    hours: '7:00 AM – 7:00 PM',
    earlyVotingLocation: 'Reservoir Public Library Annex',
    earlyVotingDates: 'Nov 30 – Dec 19, 2026 (Mon-Fri 8am-5pm)',
  },
  {
    zip: '39232',
    precinctName: 'Precinct 34-D (Flowood Metro)',
    pollingLocation: 'Flowood Community Center',
    address: '2255 Riverside Dr, Flowood, MS 39232',
    hours: '7:00 AM – 7:00 PM',
    earlyVotingLocation: 'Rankin County Courthouse Annex',
    earlyVotingDates: 'Nov 30 – Dec 19, 2026 (Mon-Fri 8am-5pm)',
  },
  {
    zip: '39110',
    precinctName: 'Precinct 34-E (Madison / Ridgeland Gateway)',
    pollingLocation: 'Highland Colony Civic Pavilion',
    address: '1000 Highland Colony Pkwy, Ridgeland, MS 39110',
    hours: '7:00 AM – 7:00 PM',
    earlyVotingLocation: 'Ridgeland Community Center',
    earlyVotingDates: 'Nov 30 – Dec 19, 2026 (Mon-Fri 8am-5pm)',
  },
];

// --- REST API Endpoints ---

// Volunteers
app.get('/api/volunteers', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: volunteers.length,
    volunteers,
  });
});

app.post('/api/volunteers', (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, zipCode, interests, notes } = req.body;

  if (!firstName || !lastName || !email || !zipCode) {
    return res.status(400).json({
      success: false,
      error: 'First name, last name, email, and zip code are required.',
    });
  }

  const newVolunteer: VolunteerRecord = {
    id: `vol-${Date.now()}`,
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    email: String(email).trim().toLowerCase(),
    phone: phone ? String(phone).trim() : '',
    zipCode: String(zipCode).trim(),
    interests: Array.isArray(interests) ? interests : [],
    notes: notes ? String(notes).trim() : undefined,
    createdAt: new Date().toISOString(),
  };

  volunteers.unshift(newVolunteer);

  res.status(201).json({
    success: true,
    message: 'Thank you for volunteering with Nellie "Cookie" Satcher for Senate!',
    volunteer: newVolunteer,
    totalVolunteers: volunteers.length,
  });
});

// Donations
app.get('/api/donations', (req: Request, res: Response) => {
  res.json({
    success: true,
    donations,
  });
});

app.get('/api/donations/stats', (req: Request, res: Response) => {
  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0) + 28450; // base seed grassroots
  const donorCount = donations.length + 384;
  const goal = 50000;
  const averageGift = Math.round(totalRaised / donorCount);

  res.json({
    success: true,
    stats: {
      totalRaised,
      donorCount,
      goal,
      averageGift,
    },
  });
});

app.post('/api/donations', (req: Request, res: Response) => {
  const { donorName, email, amount, frequency, message, anonymous } = req.body;
  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid donation amount.',
    });
  }

  const newDonation: DonationRecord = {
    id: `don-${Date.now()}`,
    donorName: anonymous ? 'Anonymous Supporter' : (donorName ? String(donorName).trim() : 'Friend of the Campaign'),
    email: email ? String(email).trim().toLowerCase() : 'grassroots@supporter.local',
    amount: parsedAmount,
    frequency: frequency === 'monthly' ? 'monthly' : 'one-time',
    message: message ? String(message).trim() : undefined,
    anonymous: Boolean(anonymous),
    createdAt: new Date().toISOString(),
  };

  donations.unshift(newDonation);

  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0) + 28450;
  const donorCount = donations.length + 384;

  res.status(201).json({
    success: true,
    message: `Thank you for contributing $${parsedAmount} to Nellie "Cookie" Satcher for Senate!`,
    donation: newDonation,
    stats: {
      totalRaised,
      donorCount,
      goal: 50000,
    },
  });
});

// Endorsements
app.get('/api/endorsements', (req: Request, res: Response) => {
  res.json({
    success: true,
    endorsements,
  });
});

app.post('/api/endorsements', (req: Request, res: Response) => {
  const { name, title, neighborhood, quote } = req.body;

  if (!name || !quote) {
    return res.status(400).json({
      success: false,
      error: 'Name and testimonial statement are required.',
    });
  }

  const newEndorsement: EndorsementRecord = {
    id: `end-${Date.now()}`,
    name: String(name).trim(),
    title: title ? String(title).trim() : 'District 34 Resident',
    neighborhood: neighborhood ? String(neighborhood).trim() : 'District 34',
    quote: String(quote).trim(),
    verified: true,
    createdAt: new Date().toISOString(),
  };

  endorsements.unshift(newEndorsement);

  res.status(201).json({
    success: true,
    message: 'Your endorsement has been added! Thank you for standing with Cookie.',
    endorsement: newEndorsement,
  });
});

// Events
app.get('/api/events', (req: Request, res: Response) => {
  res.json({
    success: true,
    events: campaignEvents,
  });
});

app.post('/api/events/:id/rsvp', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const event = campaignEvents.find((e) => e.id === id);
  if (!event) {
    return res.status(404).json({ success: false, error: 'Event not found.' });
  }

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required for RSVP.' });
  }

  event.rsvpsCount += 1;
  event.attendees.push({ name: String(name).trim(), email: String(email).trim() });

  res.json({
    success: true,
    message: `You are confirmed for "${event.title}"! We look forward to seeing you.`,
    rsvpsCount: event.rsvpsCount,
  });
});

// Precinct Lookup
app.get('/api/precincts/lookup', (req: Request, res: Response) => {
  const zip = String(req.query.zip || '').trim();

  if (!zip) {
    return res.status(400).json({ success: false, error: 'Zip code is required.' });
  }

  const matched = precinctsDatabase.find((p) => p.zip === zip);

  if (matched) {
    return res.json({
      success: true,
      found: true,
      precinct: matched,
    });
  }

  // Fallback default precinct information for District 34
  return res.json({
    success: true,
    found: false,
    precinct: {
      zip,
      precinctName: `District 34 General Precinct (${zip})`,
      pollingLocation: 'Local District 34 Consolidated Municipal Hall',
      address: 'Contact County Circuit Clerk for assigned voting ward',
      hours: '7:00 AM – 7:00 PM',
      earlyVotingLocation: 'County Courthouse & Circuit Clerk Annex',
      earlyVotingDates: 'Nov 30 – Dec 19, 2026 (Mon-Fri 8am-5pm)',
    },
  });
});

// Aggregate Campaign Stats
app.get('/api/stats', (req: Request, res: Response) => {
  const electionDate = new Date('2026-12-22T07:00:00Z').getTime();
  const now = Date.now();
  const diffDays = Math.max(0, Math.ceil((electionDate - now) / (1000 * 60 * 60 * 24)));

  const yardSigns = volunteers.filter((v) =>
    v.interests.some((i) => i.toLowerCase().includes('yard sign'))
  ).length + 312;

  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0) + 28450;
  const donorCount = donations.length + 384;

  res.json({
    success: true,
    stats: {
      daysUntilElection: diffDays,
      volunteersCount: volunteers.length + 185,
      yardSignsRequested: yardSigns,
      fundsRaised: totalRaised,
      donorsCount: donorCount,
      eventsCount: campaignEvents.length,
    },
  });
});

// --- Server Lifecycle & Dev Middleware ---

async function startServer() {
  if (!isProduction) {
    // Dev mode: Mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve dist static files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Campaign server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
