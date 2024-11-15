import type { MarketplaceItem } from '../components/MarketplaceGrid/types';

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    price: '125.00',
    image:
      'https://i.discogs.com/dpjki5D9NGsBXt2LP4MtgOOQr1Hc8A7ujT0DQnXk7-Y/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3NDMy/OTQxLTE2NTY0ODY3/MTUtNTM1NS5qcGVn.jpeg',
    format: {
      type: 'Vinyl',
      details: ['2xLP', 'Album', 'RE', '180'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'M',
      sleeve: 'VG+',
    },
    seller: {
      name: 'VinylPowerRecords',
      rating: 1.0,
      totalRatings: 1674,
    },
    shipping: {
      cost: '14.50',
      from: 'Sweden',
    },
  },
  {
    id: '2',
    title: 'Random Access Memories (Drumless Edition)',
    artist: 'Daft Punk',
    price: '55.00',
    image:
      'https://i.discogs.com/RWaI2l9A55wC-rH_S-zhbY18c3QyB_2T7D0G2DTatzg/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4OTI0/MTIwLTE3MDg0MzQ5/NzktMzU1OC5qcGVn.jpeg',
    format: {
      type: 'Vinyl',
      details: ['Drumless Edition', '2xLP', 'Album', '180'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'M',
      sleeve: 'M',
    },
    seller: {
      name: 'Move.On',
      rating: 0.998,
      totalRatings: 1373,
    },
    shipping: {
      cost: '38.00',
      from: 'Italy',
    },
  },
  {
    id: '3',
    title: 'Alive 1997',
    artist: 'Daft Punk',
    price: '36.00',
    image:
      'https://i.discogs.com/RurTPjcwF0Onlkp_W_B6pY4OkTDrF7I_h4D5b56McLM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzMDUy/ODg3LTE2NTEyMzg5/NDctMjM3NC5qcGVn.jpeg',
    format: {
      type: 'Vinyl',
      details: ['LP', 'Album', 'RE', '180'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'VG',
      sleeve: 'Generic',
    },
    seller: {
      name: 'Move.On',
      rating: 0.998,
      totalRatings: 1853,
    },
    shipping: {
      cost: '38.00',
      from: 'Italy',
    },
  },
  {
    id: '4',
    title: 'Homework',
    artist: 'Daft Punk',
    price: '42.00',
    image:
      'https://i.discogs.com/Yn3aJUMqSo84ggop41e6kQU5xUy4xqfKwy6lzwoz_Ek/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyOTg4/OTA2LTE2NTA3NjA4/NTYtNjU0NC5qcGVn.jpeg',
    format: {
      type: 'Vinyl',
      details: ['2xLP', 'Album', 'RE', 'RP'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'G+',
    },
    seller: {
      name: 'Move.On',
      rating: 1.0,
      totalRatings: 74,
    },
    shipping: {
      cost: '38.00',
      from: 'Italy',
    },
  },
  {
    id: '5',
    title: 'Discovery',
    artist: 'Daft Punk',
    price: '42.00',
    image:
      'https://i.discogs.com/AZ69pceh7rjWsU2rECFI1Ql0SfCp-V9IcIYF4cA3Sak/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2MDMx/NDk5LTE2NzYwMjgx/OTEtNzYzNi5qcGVn.jpeg',
    format: {
      type: 'Vinyl',
      details: ['2xLP', 'Album', 'RE', 'Gat'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'Generic',
    },
    seller: {
      name: 'Move.On',
      rating: 0.998,
      totalRatings: 2548,
    },
    shipping: {
      cost: '38.00',
      from: 'Italy',
    },
  },
  {
    id: '6',
    title: 'Human After All',
    artist: 'Daft Punk',
    price: '50.00',
    image:
      'https://i.discogs.com/3x-Z5l96vFzUVtwpLTGcGVHNsryG73FGm0fed67q_xE/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0NDU1/NjY5LTE2NjI3MzA3/NDEtMzU5Ni5wbmc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['LP', 'Album', 'RE'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'NM',
    },
    seller: {
      name: 'MusicShopUSA',
      rating: 0.985,
      totalRatings: 984,
    },
    shipping: {
      cost: '12.00',
      from: 'United States',
    },
  },
  {
    id: '7',
    title: 'TRON: Legacy',
    artist: 'Daft Punk',
    price: '65.00',
    image:
      'https://i.discogs.com/4QDguKcN7GEfWo-CfU9S3jBDNimhweSypvGnaO6fwhE/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyMDY1/NTgwLTE3MDY0OTAz/NzYtMTMwMi5qcGVn.jpeg',
    format: {
      type: 'Vinyl',
      details: ['2xLP', 'Album', 'Soundtrack', '180'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG',
    },
    seller: {
      name: 'SoundtrackMania',
      rating: 0.97,
      totalRatings: 456,
    },
    shipping: {
      cost: '15.00',
      from: 'Germany',
    },
  },
  {
    id: '8',
    title: 'One More Time',
    artist: 'Daft Punk',
    price: '40.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'VG',
      sleeve: 'VG+',
    },
    seller: {
      name: 'VinylPlanet',
      rating: 0.96,
      totalRatings: 812,
    },
    shipping: {
      cost: '10.00',
      from: 'United Kingdom',
    },
  },
  {
    id: '9',
    title: 'Daft Club',
    artist: 'Daft Punk',
    price: '55.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['2xLP', 'Compilation'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'VG+',
    },
    seller: {
      name: 'RetroVinylShop',
      rating: 0.975,
      totalRatings: 527,
    },
    shipping: {
      cost: '8.00',
      from: 'France',
    },
  },
  {
    id: '10',
    title: 'Alive 2007',
    artist: 'Daft Punk',
    price: '70.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['2xLP', 'Album', 'Live'],
      weight: '180g',
      speed: '33 ⅓ RPM',
    },
    condition: {
      media: 'M',
      sleeve: 'NM',
    },
    seller: {
      name: 'LiveMusicHub',
      rating: 0.99,
      totalRatings: 1200,
    },
    shipping: {
      cost: '13.00',
      from: 'Netherlands',
    },
  },
  {
    id: '11',
    title: 'Get Lucky',
    artist: 'Daft Punk',
    price: '30.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG+',
    },
    seller: {
      name: 'ClassicRecords',
      rating: 0.975,
      totalRatings: 1050,
    },
    shipping: {
      cost: '9.00',
      from: 'Italy',
    },
  },
  {
    id: '12',
    title: 'Revolution 909',
    artist: 'Daft Punk',
    price: '25.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'VG',
      sleeve: 'VG+',
    },
    seller: {
      name: 'DanceRecords',
      rating: 0.95,
      totalRatings: 670,
    },
    shipping: {
      cost: '11.00',
      from: 'Spain',
    },
  },
  {
    id: '13',
    title: 'Aerodynamic',
    artist: 'Daft Punk',
    price: '28.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'VG',
    },
    seller: {
      name: 'ElectronicBeats',
      rating: 0.965,
      totalRatings: 450,
    },
    shipping: {
      cost: '12.00',
      from: 'France',
    },
  },
  {
    id: '14',
    title: 'Digital Love',
    artist: 'Daft Punk',
    price: '35.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'M',
      sleeve: 'VG+',
    },
    seller: {
      name: 'VinylDreams',
      rating: 0.99,
      totalRatings: 980,
    },
    shipping: {
      cost: '13.00',
      from: 'Netherlands',
    },
  },
  {
    id: '15',
    title: "Burnin'",
    artist: 'Daft Punk',
    price: '27.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG',
    },
    seller: {
      name: 'HouseGrooves',
      rating: 0.945,
      totalRatings: 720,
    },
    shipping: {
      cost: '10.00',
      from: 'Germany',
    },
  },
  {
    id: '16',
    title: 'Robot Rock',
    artist: 'Daft Punk',
    price: '33.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'VG+',
    },
    seller: {
      name: 'ElectronicVinyls',
      rating: 0.98,
      totalRatings: 1100,
    },
    shipping: {
      cost: '10.50',
      from: 'UK',
    },
  },
  {
    id: '17',
    title: 'The Prime Time of Your Life',
    artist: 'Daft Punk',
    price: '32.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG',
    },
    seller: {
      name: 'TimeMachineRecords',
      rating: 0.96,
      totalRatings: 690,
    },
    shipping: {
      cost: '12.00',
      from: 'France',
    },
  },
  {
    id: '18',
    title: 'Technologic',
    artist: 'Daft Punk',
    price: '38.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'M',
      sleeve: 'NM',
    },
    seller: {
      name: 'FutureSounds',
      rating: 0.99,
      totalRatings: 845,
    },
    shipping: {
      cost: '11.50',
      from: 'Italy',
    },
  },
  {
    id: '19',
    title: 'Harder, Better, Faster, Stronger',
    artist: 'Daft Punk',
    price: '50.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG',
    },
    seller: {
      name: 'DanceClassics',
      rating: 0.965,
      totalRatings: 1340,
    },
    shipping: {
      cost: '13.00',
      from: 'Germany',
    },
  },
  {
    id: '20',
    title: 'Something About Us',
    artist: 'Daft Punk',
    price: '48.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'VG+',
    },
    seller: {
      name: 'SmoothGrooves',
      rating: 0.975,
      totalRatings: 890,
    },
    shipping: {
      cost: '10.00',
      from: 'Spain',
    },
  },
  {
    id: '21',
    title: 'Lose Yourself to Dance',
    artist: 'Daft Punk',
    price: '29.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG',
    },
    seller: {
      name: 'DancefloorRecords',
      rating: 0.965,
      totalRatings: 1100,
    },
    shipping: {
      cost: '12.00',
      from: 'United Kingdom',
    },
  },
  {
    id: '22',
    title: 'Fragments of Time',
    artist: 'Daft Punk',
    price: '35.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'VG+',
    },
    seller: {
      name: 'VinylExpress',
      rating: 0.98,
      totalRatings: 1200,
    },
    shipping: {
      cost: '10.00',
      from: 'Netherlands',
    },
  },
  {
    id: '23',
    title: 'The Brainwasher',
    artist: 'Daft Punk',
    price: '40.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'M',
      sleeve: 'NM',
    },
    seller: {
      name: 'ElectroSounds',
      rating: 0.975,
      totalRatings: 600,
    },
    shipping: {
      cost: '13.00',
      from: 'France',
    },
  },
  {
    id: '24',
    title: 'Face to Face',
    artist: 'Daft Punk',
    price: '45.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'VG+',
      sleeve: 'VG+',
    },
    seller: {
      name: 'UrbanVinyl',
      rating: 0.955,
      totalRatings: 875,
    },
    shipping: {
      cost: '9.50',
      from: 'Italy',
    },
  },
  {
    id: '25',
    title: 'Around the World',
    artist: 'Daft Punk',
    price: '55.00',
    image:
      'https://i.discogs.com/hFwQHJqEGDcsfwkZhMbKjpTp4YVXjh8fbnZw-3ijKuM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
    format: {
      type: 'Vinyl',
      details: ['12"', 'Single'],
      weight: '180g',
      speed: '45 RPM',
    },
    condition: {
      media: 'NM',
      sleeve: 'VG+',
    },
    seller: {
      name: 'WorldwideRecords',
      rating: 0.99,
      totalRatings: 1500,
    },
    shipping: {
      cost: '15.00',
      from: 'United States',
    },
  },
];
