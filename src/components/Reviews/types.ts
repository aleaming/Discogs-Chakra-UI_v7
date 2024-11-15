export interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
    totalReviews?: number;
    isDeleted?: boolean;
  };
  rating: number;
  title: string;
  content: string;
  date: string;
  helpfulVotes: number;
  totalVotes: number;
  type: 'purchase' | 'collection' | 'community';
  verified?: boolean;
  images?: string[];
}