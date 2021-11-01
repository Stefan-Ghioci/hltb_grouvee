import parse from 'csv-parse/lib/sync';

export interface HltbGrouveeGame {
  grouvee: GrouveeGame;
  hltb: HltbGame[];
}

export interface HltbGame {}

export interface GrouveeGame {
  id: number;
  name: string;
  shelves: string[];
  rating: number;
  genres: string[];
  franchises: string[];
  developers: string[];
  publishers: string[];
  releaseDate: Date;
}

export const parseCsvFileContent = (content: string): GrouveeGame[] => {
  const table: { [key: string]: string }[] = parse(content, { columns: true });

  const grouveeGames: GrouveeGame[] = [];

  const n = table.length;
  for (let i = 0; i < n; i += 1) {
    const row = table[i];

    grouveeGames.push({
      id: parseInt(row['id'], 10),
      name: row['name'],
      shelves: Object.keys(JSON.parse(row['shelves'])),
      rating: parseInt(row['rating'], 10),
      genres: Object.keys(JSON.parse(row['genres'])),
      franchises: Object.keys(JSON.parse(row['franchises'])),
      developers: Object.keys(JSON.parse(row['developers'])),
      publishers: Object.keys(JSON.parse(row['publishers'])),
      releaseDate: new Date(row['release_date']),
    });
  }

  return grouveeGames;
};

export const createGameData = async (grouveeData: GrouveeGame[]): Promise<HltbGrouveeGame[]> => {
  return grouveeData.map((grouveeGame) => {
    return { grouvee: grouveeGame, hltb: [] };
  });
};
