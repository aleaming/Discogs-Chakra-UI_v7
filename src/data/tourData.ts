import type { Tour } from '../components/Tour/types';

export const tours: Tour[] = [
  {
    id: 'alive-2007',
    name: 'Alive 2007',
    startDate: '2006-04-29',
    endDate: '2007-12-09',
    type: 'world_tour',
    description: 'The legendary Alive 2007 tour featuring the iconic pyramid stage setup.',
    totalShows: 48,
    totalAttendance: 844000,
    countries: ['France', 'UK', 'USA', 'Japan', 'Australia', 'Germany'],
    image: 'https://i.discogs.com/3z9ppYLGHqhSzWWAw2FrUxxCAgA-dn_vOpvNEwGX6xc/rs:fit/g:sm/q:90/h:523/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNDEx/MjMtMTE5NTgyMzE2/My5qcGVn.jpeg',
    performances: [
      {
        id: 'alive-2007-paris',
        date: '2007-06-14T20:00:00Z',
        venue: 'Bercy Arena',
        city: 'Paris',
        country: 'France',
        status: 'sold_out',
        price: {
          currency: 'EUR',
          min: 45,
          max: 90
        },
        attendance: 17000,
        coordinates: {
          lat: 48.8384,
          lng: 2.3784
        },
        setlist: [
          'Robot Rock / Oh Yeah',
          'Touch It / Technologic',
          'Television Rules the Nation / Crescendolls',
          'Too Long / Steam Machine'
        ]
      },
      {
        id: 'alive-2007-london',
        date: '2007-07-04T19:30:00Z',
        venue: 'O2 Arena',
        city: 'London',
        country: 'UK',
        status: 'sold_out',
        price: {
          currency: 'GBP',
          min: 35,
          max: 75
        },
        attendance: 20000,
        coordinates: {
          lat: 51.5033,
          lng: 0.0003
        }
      },
      {
        id: 'alive-2007-tokyo',
        date: '2007-08-12T18:00:00Z',
        venue: 'Budokan',
        city: 'Tokyo',
        country: 'Japan',
        status: 'sold_out',
        price: {
          currency: 'JPY',
          min: 5000,
          max: 12000
        },
        attendance: 14000,
        coordinates: {
          lat: 35.6934,
          lng: 139.7501
        }
      }
    ]
  },
  {
    id: 'alive-1997',
    name: 'Alive 1997',
    startDate: '1997-01-15',
    endDate: '1997-12-20',
    type: 'world_tour',
    description: 'The first major world tour supporting their debut album Homework.',
    totalShows: 42,
    countries: ['France', 'UK', 'USA', 'Japan'],
    image: 'https://i.discogs.com/NvfyPC4OVCXxcqVnWURYdJzxzqfvlmgg8PLVyoIJva4/rs:fit/g:sm/q:90/h:600/w:584/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNjgy/LTE0Nzc0NzgzMjMt/MzQzMi5qcGVn.jpeg',
    performances: [
      {
        id: 'alive-1997-birmingham',
        date: '1997-11-08T21:00:00Z',
        venue: 'Essential Music Festival',
        city: 'Birmingham',
        country: 'UK',
        status: 'sold_out',
        price: {
          currency: 'GBP',
          min: 25,
          max: 45
        },
        coordinates: {
          lat: 52.4862,
          lng: -1.8904
        }
      },
      {
        id: 'alive-1997-paris',
        date: '1997-12-15T20:00:00Z',
        venue: 'Le Palace',
        city: 'Paris',
        country: 'France',
        status: 'sold_out',
        price: {
          currency: 'EUR',
          min: 30,
          max: 50
        },
        coordinates: {
          lat: 48.8721,
          lng: 2.3474
        }
      }
    ]
  },
  {
    id: 'coachella-2006',
    name: 'Coachella Festival',
    startDate: '2006-04-29',
    endDate: '2006-04-29',
    type: 'festival',
    description: 'Legendary Coachella performance that set the stage for Alive 2007.',
    totalShows: 1,
    totalAttendance: 100000,
    countries: ['USA'],
    image: 'https://i.discogs.com/Ie-ZAT_Lbvc1dGud11MDw3RKO65NQrzPKkBvqVVk7Hg/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgwODk5/NDctMTQ1NTM2MDIz/OC0zNDgwLmpwZWc.jpeg',
    performances: [
      {
        id: 'coachella-2006-main',
        date: '2006-04-29T22:30:00Z',
        venue: 'Empire Polo Club',
        city: 'Indio',
        country: 'USA',
        status: 'sold_out',
        price: {
          currency: 'USD',
          min: 85,
          max: 125
        },
        attendance: 100000,
        coordinates: {
          lat: 33.6823,
          lng: -116.2378
        }
      }
    ]
  }
];