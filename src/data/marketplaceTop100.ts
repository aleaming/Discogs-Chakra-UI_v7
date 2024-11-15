import type { MarketplaceItem } from '../components/MarketplaceGrid/types';

export const top100Items: MarketplaceItem[] = [
  {
    id: '1',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    price: '149.99',
    image: 'https://i.discogs.com/AQR6252kFekhTZYYVXUPxXe-4sxZGd_Zy_yCXjt_RoE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNzMw/MTUtMTY2NTM0MTYy/OS05ODQzLmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['LP', 'Album', 'Remastered'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'VG+',
    },
    seller: {
      name: 'VinylVault',
      rating: 0.99,
      totalRatings: 2548,
    },
    shipping: {
      cost: '12.00',
      from: 'United Kingdom',
    },
  },
  {
    id: '2',
    title: 'Thriller',
    artist: 'Michael Jackson',
    price: '199.99',
    image: 'https://i.discogs.com/8FHj1s2qbYFVR3OgNHWnNT5bGgJLGpK0FRbdJn7Ysxg/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0ODEz/MTctMTY1ODg2MzAy/NC05NzE5LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['LP', 'Album', 'Original'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG',
    },
    seller: {
      name: 'ClassicRecords',
      rating: 0.98,
      totalRatings: 1853,
    },
    shipping: {
      cost: '15.00',
      from: 'United States',
    },
  },
  {
    id: '3',
    title: 'Abbey Road',
    artist: 'The Beatles',
    price: '299.99',
    image: 'https://i.discogs.com/HXjYKQDtjh_OeFbVkxVGC4gYGvQvVKgEpxvuAzbOaXE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2NDEx/ODctMTYxMDEwNTE4/OS03NzU5LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['LP', 'Album', 'First Press'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'M',
      sleeve: 'NM',
    },
    seller: {
      name: 'RareVinylUK',
      rating: 1.0,
      totalRatings: 984,
    },
    shipping: {
      cost: '20.00',
      from: 'United Kingdom',
    },
  },
  {
    id: '4',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    price: '249.99',
    image: 'https://i.discogs.com/KqHYtQSg_RrHVx8QT_kqaVJlWgVKGYtyBUVpqhDW4YE/rs:fit/g:sm/q:90/h:600/w:597/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExODY3/NDc4LTE1MjQxNDk0/NjEtNzE5Mi5qcGVn.jpeg',
    format: {
      type: 'Vinyl',
      details: ['LP', 'Album', 'Mono'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG+',
    },
    seller: {
      name: 'JazzCollector',
      rating: 0.97,
      totalRatings: 456,
    },
    shipping: {
      cost: '18.00',
      from: 'Japan',
    },
  },
  {
    id: '5',
    title: 'Nevermind',
    artist: 'Nirvana',
    price: '179.99',
    image: 'https://i.discogs.com/NEoKxJTGk_mJ5mK_r4CQKqsHFVDwJcgHnPmyWXu8UaY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4MTQ4/NTI5LTE2MTcwNTY0/NjEtNzc1OC5qcGVn.jpeg',
    format: {
      type: 'Vinyl',
      details: ['LP', 'Album', 'Reissue'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'NM',
    },
    seller: {
      name: 'GrungeVinyl',
      rating: 0.99,
      totalRatings: 1200,
    },
    shipping: {
      cost: '14.00',
      from: 'Germany',
    },
  }
  // Note: This is a sample of 5 items. In a real implementation,
  // this would contain all 100 top albums with similar detailed information
];