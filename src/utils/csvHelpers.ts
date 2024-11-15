import { CollectionItem } from '../components/Collection/types';
import Papa from 'papaparse';

// Helper function to parse condition string
const parseCondition = (condition: string): string => {
  // Map common condition abbreviations
  const conditionMap: { [key: string]: string } = {
    'M': 'Mint',
    'NM': 'Near Mint',
    'VG+': 'Very Good Plus',
    'VG': 'Very Good',
    'G+': 'Good Plus',
    'G': 'Good',
    'F': 'Fair',
    'P': 'Poor'
  };

  // Remove parentheses and trim
  const cleanCondition = condition.replace(/[()]/g, '').trim();
  return conditionMap[cleanCondition] || cleanCondition;
};

// Helper function to parse format string
const parseFormat = (format: string): { type: string; details: string[]; weight?: string; speed?: string } => {
  const parts = format.split(',').map(part => part.trim());
  const formatDetails = parts.filter(part => !part.includes('Album')); // Remove 'Album' from details
  
  return {
    type: 'Vinyl', // Default to Vinyl since that's what most Discogs records are
    details: formatDetails,
    // Add weight and speed if present in the format string
    weight: formatDetails.find(d => d.includes('g'))?.trim(),
    speed: formatDetails.find(d => d.includes('RPM'))?.trim()
  };
};

export const exportToCSV = (items: CollectionItem[]) => {
  // Map our data structure to match Discogs format
  const flattenedData = items.map(item => ({
    'Catalog#': '', // Not stored in our system
    'Artist': item.artist,
    'Title': item.title,
    'Label': '', // Not stored in our system
    'Format': item.format.details.join(', '),
    'Rating': item.rating,
    'Released': item.releaseYear,
    'release_id': '', // Not stored in our system
    'CollectionFolder': 'Uncategorized',
    'Date Added': item.dateAdded,
    'Collection Media Condition': item.condition.media,
    'Collection Sleeve Condition': item.condition.sleeve,
    'Collection Notes': item.condition.notes || '',
    'Collection RSD': '' // Not stored in our system
  }));

  const csv = Papa.unparse(flattenedData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `collection_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromCSV = (file: File): Promise<CollectionItem[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const items: CollectionItem[] = results.data
            .filter((row: any) => row['Artist'] && row['Title']) // Filter out empty rows
            .map((row: any, index) => ({
              id: `imported-${index}-${Date.now()}`, // Generate unique ID
              title: row['Title'],
              artist: row['Artist'],
              releaseYear: parseInt(row['Released']) || new Date().getFullYear(),
              format: parseFormat(row['Format'] || 'LP'),
              condition: {
                media: parseCondition(row['Collection Media Condition'] || 'VG+'),
                sleeve: parseCondition(row['Collection Sleeve Condition'] || 'VG+'),
                notes: row['Collection Notes'] || undefined
              },
              image: '', // Will need to be populated separately
              dateAdded: row['Date Added'] || new Date().toISOString(),
              tags: [], // Can be populated based on other fields if needed
              rating: parseInt(row['Rating']) || 0
            }));
          resolve(items);
        } catch (error) {
          reject(new Error('Invalid CSV format or data structure'));
        }
      },
      error: (error) => reject(error),
    });
  });
};