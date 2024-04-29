export interface ISummarization {
  id: string;
  user: string;
  article: string;
  summary: string;
  insights: string[];
  createdAt: Date;
}
