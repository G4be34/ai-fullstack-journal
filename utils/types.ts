export type AnalysisType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  userId: string;
  mood: string;
  summary: string;
  color: string;
  negative: boolean;
  subject: string;
  sentimentScore: number;
};

export type UserType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  clerkId: string;
  entries: EntryType[];
  analyses: AnalysisType[];
};

export type EntryType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  analysis: AnalysisType | null;
  userId: string;
};
