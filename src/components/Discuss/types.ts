export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    reputation: number;
    badges: string[];
  };
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: Comment[];
  isEdited?: boolean;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    reputation: number;
    badges: string[];
  };
  category: Category;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  commentCount: number;
  viewCount: number;
  likes: number;
  isPinned?: boolean;
  isLocked?: boolean;
}

export type Category = 
  | 'general'
  | 'albums'
  | 'tours'
  | 'news'
  | 'gear'
  | 'help';