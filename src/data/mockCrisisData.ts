// Mock data for flood crisis scenario
export interface Claim {
  id: string;
  text: string;
  source: string;
  timestamp: Date;
  status: 'pending' | 'verifying' | 'verified' | 'false' | 'misleading';
  threatLevel: 'critical' | 'high' | 'medium' | 'low';
  location: {
    city: string;
    lat: number;
    lng: number;
  };
  mediaType: 'text' | 'image' | 'video' | 'audio';
  viralCoefficient: number; // How fast it's spreading
  verificationDetails?: {
    agents: string[];
    factCheckSources: string[];
    reasoning: string;
  };
}

export interface RegionData {
  region: string;
  lat: number;
  lng: number;
  activeClaims: number;
  threatLevel: 'critical' | 'high' | 'medium' | 'low';
  falseClaims: number;
  verifiedClaims: number;
}

export const mockClaims: Claim[] = [
  {
    id: 'claim-001',
    text: 'Kedarnath dam has burst, immediate evacuation needed in all downstream areas',
    source: 'WhatsApp Forward',
    timestamp: new Date(Date.now() - 30 * 60000),
    status: 'false',
    threatLevel: 'critical',
    location: { city: 'Kedarnath', lat: 30.7346, lng: 79.0669 },
    mediaType: 'text',
    viralCoefficient: 8.5,
    verificationDetails: {
      agents: ['Fact Verification Agent', 'Government Portal Check'],
      factCheckSources: ['Uttarakhand Government Portal', 'NDMA'],
      reasoning: 'No dam burst reported. Water release was controlled and announced 6 hours in advance by authorities.'
    }
  },
  {
    id: 'claim-002',
    text: 'Military helicopters dropping relief supplies in flood-affected areas',
    source: 'Twitter',
    timestamp: new Date(Date.now() - 15 * 60000),
    status: 'verified',
    threatLevel: 'low',
    location: { city: 'Rudraprayag', lat: 30.2837, lng: 78.9811 },
    mediaType: 'image',
    viralCoefficient: 4.2,
    verificationDetails: {
      agents: ['Media Verification Agent', 'Image Analysis'],
      factCheckSources: ['Indian Air Force Twitter', 'PIB Fact Check'],
      reasoning: 'Image verified as current. IAF confirmed relief operations in the region.'
    }
  },
  {
    id: 'claim-003',
    text: 'Government releasing 50,000 cusecs water without warning',
    source: 'Facebook',
    timestamp: new Date(Date.now() - 45 * 60000),
    status: 'misleading',
    threatLevel: 'high',
    location: { city: 'Tehri', lat: 30.3903, lng: 78.4803 },
    mediaType: 'text',
    viralCoefficient: 7.1,
    verificationDetails: {
      agents: ['Claim Detection Agent', 'Fact Verification Agent'],
      factCheckSources: ['Tehri Dam Authority', 'Uttarakhand SDMA'],
      reasoning: 'Water release is happening but warning was issued 12 hours ago via SMS, TV, and radio. Release is controlled.'
    }
  },
  {
    id: 'claim-004',
    text: 'Bridge collapse video from Kerala floods being shared as current Uttarakhand incident',
    source: 'WhatsApp',
    timestamp: new Date(Date.now() - 10 * 60000),
    status: 'false',
    threatLevel: 'medium',
    location: { city: 'Srinagar', lat: 30.2233, lng: 78.7833 },
    mediaType: 'video',
    viralCoefficient: 6.8,
    verificationDetails: {
      agents: ['Media Forgery Detection', 'Reverse Image Search'],
      factCheckSources: ['Alt News', 'Boom Live'],
      reasoning: 'Video is from 2018 Kerala floods. Geotagging and metadata confirm it\'s not from current location.'
    }
  },
  {
    id: 'claim-005',
    text: 'Rescue operations halted due to bad weather',
    source: 'Telegram',
    timestamp: new Date(Date.now() - 5 * 60000),
    status: 'verifying',
    threatLevel: 'medium',
    location: { city: 'Chamoli', lat: 30.4000, lng: 79.3300 },
    mediaType: 'text',
    viralCoefficient: 5.3,
  },
  {
    id: 'claim-006',
    text: 'Fake QR codes for flood relief donations circulating online',
    source: 'Instagram',
    timestamp: new Date(Date.now() - 2 * 60000),
    status: 'verified',
    threatLevel: 'critical',
    location: { city: 'Dehradun', lat: 30.3165, lng: 78.0322 },
    mediaType: 'image',
    viralCoefficient: 9.2,
    verificationDetails: {
      agents: ['Fraud Detection Agent', 'Claim Verification'],
      factCheckSources: ['Cyber Crime Portal', 'Uttarakhand Police'],
      reasoning: 'Multiple fake donation accounts identified. Official relief fund details available on CM Relief Fund website only.'
    }
  }
];

export const mockRegionData: RegionData[] = [
  { region: 'Kedarnath', lat: 30.7346, lng: 79.0669, activeClaims: 12, threatLevel: 'critical', falseClaims: 8, verifiedClaims: 4 },
  { region: 'Rudraprayag', lat: 30.2837, lng: 78.9811, activeClaims: 8, threatLevel: 'high', falseClaims: 5, verifiedClaims: 3 },
  { region: 'Tehri', lat: 30.3903, lng: 78.4803, activeClaims: 15, threatLevel: 'critical', falseClaims: 10, verifiedClaims: 5 },
  { region: 'Chamoli', lat: 30.4000, lng: 79.3300, activeClaims: 6, threatLevel: 'medium', falseClaims: 3, verifiedClaims: 3 },
  { region: 'Srinagar', lat: 30.2233, lng: 78.7833, activeClaims: 9, threatLevel: 'high', falseClaims: 6, verifiedClaims: 3 },
  { region: 'Dehradun', lat: 30.3165, lng: 78.0322, activeClaims: 11, threatLevel: 'high', falseClaims: 7, verifiedClaims: 4 },
];

export const mockAnalytics = {
  totalClaims: 347,
  verifiedClaims: 142,
  falseClaims: 168,
  pendingClaims: 37,
  averageVerificationTime: 12, // minutes
  topSources: [
    { name: 'WhatsApp', count: 156 },
    { name: 'Facebook', count: 89 },
    { name: 'Twitter', count: 67 },
    { name: 'Telegram', count: 35 },
  ],
  hourlyTrends: [
    { hour: '00:00', claims: 12, false: 8, verified: 4 },
    { hour: '04:00', claims: 8, false: 5, verified: 3 },
    { hour: '08:00', claims: 24, false: 16, verified: 8 },
    { hour: '12:00', claims: 45, false: 28, verified: 17 },
    { hour: '16:00', claims: 38, false: 22, verified: 16 },
    { hour: '20:00', claims: 52, false: 35, verified: 17 },
  ],
  threatDistribution: [
    { name: 'Critical', value: 45 },
    { name: 'High', value: 89 },
    { name: 'Medium', value: 134 },
    { name: 'Low', value: 79 },
  ]
};
