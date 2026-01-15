export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ViewMode = 'home' | 'editor' | 'view' | 'search';
