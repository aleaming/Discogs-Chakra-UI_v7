import type { Video } from '../components/Videos/types';

export const videos: Video[] = [
  {
    id: '1',
    title: 'Get Lucky (Official Video) ft. Pharrell Williams, Nile Rodgers',
    description: 'The lead single from Random Access Memories, featuring Pharrell Williams and Nile Rodgers.',
    thumbnail: 'https://i.ytimg.com/vi/5NV6Rdv1a3I/maxresdefault.jpg',
    duration: '4:08',
    views: 824000000,
    uploadDate: '2013-05-10',
    type: 'music_video',
    source: {
      platform: 'youtube',
      id: '5NV6Rdv1a3I'
    },
    likes: 4200000,
    comments: 185000
  },
  {
    id: '2',
    title: 'Alive 2007 (Full Concert)',
    description: 'Complete live performance from the legendary Alive 2007 tour.',
    thumbnail: 'https://i.ytimg.com/vi/udvYSd2TIkg/maxresdefault.jpg',
    duration: '1:25:42',
    views: 12500000,
    uploadDate: '2007-06-14',
    type: 'live',
    source: {
      platform: 'youtube',
      id: 'udvYSd2TIkg'
    },
    likes: 850000,
    comments: 45000
  },
  {
    id: '3',
    title: 'The Collaborators: Giorgio Moroder',
    description: 'Interview with legendary producer Giorgio Moroder about his collaboration on Random Access Memories.',
    thumbnail: 'https://i.ytimg.com/vi/eYDvxo-M0OQ/maxresdefault.jpg',
    duration: '8:30',
    views: 2100000,
    uploadDate: '2013-04-03',
    type: 'interview',
    source: {
      platform: 'youtube',
      id: 'eYDvxo-M0OQ'
    },
    likes: 125000,
    comments: 8500
  },
  {
    id: '4',
    title: 'TRON: Legacy - Derezzed (Official Video)',
    description: 'Official music video for Derezzed from the TRON: Legacy soundtrack.',
    thumbnail: 'https://i.ytimg.com/vi/m4cgLL8JaVI/maxresdefault.jpg',
    duration: '2:58',
    views: 45000000,
    uploadDate: '2010-12-07',
    type: 'music_video',
    source: {
      platform: 'youtube',
      id: 'm4cgLL8JaVI'
    },
    likes: 950000,
    comments: 65000
  },
  {
    id: '5',
    title: 'The Making of Random Access Memories',
    description: 'Behind the scenes documentary about the creation of Random Access Memories.',
    thumbnail: 'https://i.ytimg.com/vi/yf2bu0P_4Vo/maxresdefault.jpg',
    duration: '10:25',
    views: 3800000,
    uploadDate: '2013-05-24',
    type: 'documentary',
    source: {
      platform: 'youtube',
      id: 'yf2bu0P_4Vo'
    },
    likes: 285000,
    comments: 18500
  }
];