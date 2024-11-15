export interface ArtistHeroProps {
  /** The artist's name */
  name: string;
  /** URL to the artist's profile image */
  image: string;
  /** URL to the artist's cover image */
  coverImage: string;
  /** Number of monthly listeners */
  monthlyListeners: number;
  /** Array of music genres */
  genres?: string[];
  /** Artist's description or biography */
  description: string;
  /** Whether the artist is verified */
  isVerified?: boolean;
  /** Whether to show the compact version */
  isCompact?: boolean;
  /** Currently selected tab index */
  selectedTab?: number;
  /** Callback function when play button is clicked */
  onPlay?: () => void;
  /** Callback function when follow button is clicked */
  onFollow?: () => void;
  /** Callback function when share button is clicked */
  onShare?: () => void;
}