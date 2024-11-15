export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
  type: 'music_video' | 'live' | 'interview' | 'documentary' | 'behind_scenes';
  source: {
    platform: 'youtube' | 'vimeo';
    id: string;
  };
  likes?: number;
  comments?: number;
}