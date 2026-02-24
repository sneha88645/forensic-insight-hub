export interface ForensicContact {
  id: string;
  name: string;
  phone: string;
  callCount: number;
  smsCount: number;
  lastContact: string;
  riskLevel: "safe" | "suspicious" | "critical";
}

export interface ForensicMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  type: "sms" | "chat" | "email";
  app: string;
  deleted: boolean;
  flagged: boolean;
}

export interface TimelineEvent {
  id: string;
  type: "call" | "sms" | "app" | "location" | "media" | "browser";
  title: string;
  description: string;
  timestamp: string;
  source: string;
  flagged: boolean;
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  filename: string;
  dateTaken: string;
  gps: { lat: number; lng: number } | null;
  size: string;
  hash: string;
  flagged: boolean;
}

export interface LocationPing {
  id: string;
  lat: number;
  lng: number;
  timestamp: string;
  source: string;
  accuracy: number;
}

export interface AIInsight {
  id: string;
  type: "pattern" | "anomaly" | "risk";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  relatedArtifacts: number;
  confidence: number;
}

export const mockContacts: ForensicContact[] = [
  { id: "c1", name: "John Mercer", phone: "+1-555-0142", callCount: 47, smsCount: 312, lastContact: "2024-12-15T23:45:00Z", riskLevel: "critical" },
  { id: "c2", name: "Sarah Williams", phone: "+1-555-0198", callCount: 23, smsCount: 89, lastContact: "2024-12-14T14:20:00Z", riskLevel: "suspicious" },
  { id: "c3", name: "Mike Chen", phone: "+1-555-0234", callCount: 12, smsCount: 45, lastContact: "2024-12-13T09:15:00Z", riskLevel: "safe" },
  { id: "c4", name: "Unknown (+1-555-0999)", phone: "+1-555-0999", callCount: 8, smsCount: 2, lastContact: "2024-12-15T02:30:00Z", riskLevel: "critical" },
  { id: "c5", name: "Lisa Park", phone: "+1-555-0567", callCount: 5, smsCount: 156, lastContact: "2024-12-12T18:00:00Z", riskLevel: "safe" },
  { id: "c6", name: "David Okafor", phone: "+1-555-0321", callCount: 31, smsCount: 78, lastContact: "2024-12-15T01:10:00Z", riskLevel: "suspicious" },
];

export const mockMessages: ForensicMessage[] = [
  { id: "m1", from: "John Mercer", to: "Subject", content: "Package arriving Thursday. Use the back entrance.", timestamp: "2024-12-15T23:45:00Z", type: "sms", app: "Messages", deleted: false, flagged: true },
  { id: "m2", from: "Subject", to: "John Mercer", content: "Understood. Same location as last time?", timestamp: "2024-12-15T23:47:00Z", type: "sms", app: "Messages", deleted: true, flagged: true },
  { id: "m3", from: "Sarah Williams", to: "Subject", content: "Meeting rescheduled to 3pm", timestamp: "2024-12-14T14:20:00Z", type: "chat", app: "WhatsApp", deleted: false, flagged: false },
  { id: "m4", from: "Unknown (+1-555-0999)", to: "Subject", content: "[Encrypted message - unable to decode]", timestamp: "2024-12-15T02:30:00Z", type: "chat", app: "Signal", deleted: false, flagged: true },
  { id: "m5", from: "Subject", to: "Lisa Park", content: "Can you hold onto this for me? Don't tell anyone.", timestamp: "2024-12-12T18:00:00Z", type: "sms", app: "Messages", deleted: true, flagged: true },
  { id: "m6", from: "David Okafor", to: "Subject", content: "Transfer confirmed. Check account ending 4829.", timestamp: "2024-12-15T01:10:00Z", type: "chat", app: "Telegram", deleted: false, flagged: true },
  { id: "m7", from: "Mike Chen", to: "Subject", content: "Hey, lunch tomorrow?", timestamp: "2024-12-13T09:15:00Z", type: "sms", app: "Messages", deleted: false, flagged: false },
  { id: "m8", from: "Subject", to: "Sarah Williams", content: "I need you to delete our conversation history", timestamp: "2024-12-14T15:00:00Z", type: "chat", app: "WhatsApp", deleted: true, flagged: true },
];

export const mockTimeline: TimelineEvent[] = [
  { id: "t1", type: "call", title: "Incoming Call - John Mercer", description: "Duration: 12m 34s", timestamp: "2024-12-15T23:30:00Z", source: "Phone", flagged: true },
  { id: "t2", type: "sms", title: "SMS Sent to John Mercer", description: "Outbound message flagged", timestamp: "2024-12-15T23:47:00Z", source: "Messages", flagged: true },
  { id: "t3", type: "app", title: "Signal App Opened", description: "Active session: 15 minutes", timestamp: "2024-12-15T02:15:00Z", source: "App Monitor", flagged: true },
  { id: "t4", type: "location", title: "Location Changed", description: "Moved to 34.0522°N, 118.2437°W", timestamp: "2024-12-15T01:00:00Z", source: "GPS", flagged: false },
  { id: "t5", type: "media", title: "Photo Taken", description: "IMG_4892.jpg - Contains EXIF data", timestamp: "2024-12-14T16:30:00Z", source: "Camera", flagged: false },
  { id: "t6", type: "browser", title: "Browser History", description: "Visited: secure-transfer.onion", timestamp: "2024-12-15T02:45:00Z", source: "Tor Browser", flagged: true },
  { id: "t7", type: "app", title: "VPN Connected", description: "NordVPN - Server: Romania", timestamp: "2024-12-15T02:10:00Z", source: "VPN Client", flagged: true },
  { id: "t8", type: "call", title: "Outgoing Call - Unknown", description: "Duration: 2m 10s (Burner?)", timestamp: "2024-12-15T03:00:00Z", source: "Phone", flagged: true },
  { id: "t9", type: "sms", title: "SMS from Sarah Williams", description: "Meeting rescheduled", timestamp: "2024-12-14T14:20:00Z", source: "Messages", flagged: false },
  { id: "t10", type: "location", title: "Arrived at Warehouse District", description: "40.7128°N, 74.0060°W", timestamp: "2024-12-14T22:00:00Z", source: "GPS", flagged: true },
];

export const mockMedia: MediaItem[] = [
  { id: "md1", type: "image", filename: "IMG_4892.jpg", dateTaken: "2024-12-14T16:30:00Z", gps: { lat: 34.0522, lng: -118.2437 }, size: "3.2 MB", hash: "a1b2c3d4e5f6", flagged: false },
  { id: "md2", type: "image", filename: "Screenshot_20241215.png", dateTaken: "2024-12-15T02:50:00Z", gps: null, size: "1.1 MB", hash: "f6e5d4c3b2a1", flagged: true },
  { id: "md3", type: "video", filename: "VID_20241214.mp4", dateTaken: "2024-12-14T22:15:00Z", gps: { lat: 40.7128, lng: -74.006 }, size: "45.7 MB", hash: "1a2b3c4d5e6f", flagged: true },
  { id: "md4", type: "image", filename: "Contact_Photo_JM.jpg", dateTaken: "2024-11-20T10:00:00Z", gps: null, size: "0.5 MB", hash: "6f5e4d3c2b1a", flagged: false },
  { id: "md5", type: "image", filename: "IMG_4910.jpg", dateTaken: "2024-12-15T01:05:00Z", gps: { lat: 40.7128, lng: -74.006 }, size: "2.8 MB", hash: "b2c3d4e5f6a1", flagged: true },
  { id: "md6", type: "image", filename: "Document_Scan.pdf.jpg", dateTaken: "2024-12-13T11:30:00Z", gps: null, size: "4.1 MB", hash: "c3d4e5f6a1b2", flagged: true },
];

export const mockLocations: LocationPing[] = [
  { id: "l1", lat: 34.0522, lng: -118.2437, timestamp: "2024-12-14T16:30:00Z", source: "GPS", accuracy: 5 },
  { id: "l2", lat: 34.0195, lng: -118.4912, timestamp: "2024-12-14T18:00:00Z", source: "Cell Tower", accuracy: 200 },
  { id: "l3", lat: 40.7128, lng: -74.006, timestamp: "2024-12-14T22:00:00Z", source: "GPS", accuracy: 10 },
  { id: "l4", lat: 40.7589, lng: -73.9851, timestamp: "2024-12-15T01:00:00Z", source: "WiFi", accuracy: 50 },
  { id: "l5", lat: 40.7614, lng: -73.9776, timestamp: "2024-12-15T02:30:00Z", source: "GPS", accuracy: 8 },
  { id: "l6", lat: 40.7484, lng: -73.9857, timestamp: "2024-12-15T03:15:00Z", source: "Cell Tower", accuracy: 150 },
];

export const mockInsights: AIInsight[] = [
  { id: "ai1", type: "pattern", title: "Recurring Late-Night Communication", description: "Subject shows a pattern of contacting John Mercer and Unknown numbers between 11PM-3AM, occurring 12 times in 14 days.", severity: "high", relatedArtifacts: 24, confidence: 94 },
  { id: "ai2", type: "anomaly", title: "Deleted Message Cluster", description: "8 messages were deleted within a 30-minute window on Dec 14. Recovery shows references to 'package' and 'transfer'.", severity: "critical", relatedArtifacts: 8, confidence: 87 },
  { id: "ai3", type: "risk", title: "Encrypted Communication Channel", description: "Subject switched to Signal after SMS conversation with John Mercer, suggesting awareness of monitoring.", severity: "high", relatedArtifacts: 5, confidence: 91 },
  { id: "ai4", type: "pattern", title: "Geographic Pattern - Warehouse District", description: "Subject visited the same warehouse location 4 times in the past week, always between 10PM-2AM.", severity: "medium", relatedArtifacts: 12, confidence: 78 },
  { id: "ai5", type: "anomaly", title: "VPN + Tor Usage Spike", description: "Subject activated VPN and Tor browser simultaneously at 2:10AM, unusual for their normal browsing behavior.", severity: "high", relatedArtifacts: 3, confidence: 96 },
  { id: "ai6", type: "risk", title: "Financial Reference Detected", description: "Message from David Okafor references account number and 'transfer confirmed'. Cross-reference with financial records recommended.", severity: "critical", relatedArtifacts: 2, confidence: 89 },
];

export const caseInfo = {
  caseNumber: "CF-2024-00847",
  deviceModel: "Samsung Galaxy S24 Ultra",
  deviceSerial: "R5CX30ABCDE",
  osVersion: "Android 14 (One UI 6.1)",
  extractionDate: "2024-12-16T08:30:00Z",
  extractionType: "Full File System (UFDR)",
  examiner: "Det. Rachel Torres",
  totalArtifacts: 14829,
  timeRange: "2024-11-01 to 2024-12-16",
};
