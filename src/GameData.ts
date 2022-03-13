import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';
const { parse } = window.require('csv-parse/sync');

const hltbService = new HowLongToBeatService();
hltbService.search('Hello');

export interface HltbGrouveeGame {
  grouvee: GrouveeGame;
  hltb: HowLongToBeatEntry[];
}

export interface GrouveeGame {
  id: number;
  name: string;
  shelves: string[];
  rating: number;
  genres: string[];
  franchises: string[];
  developers: string[];
  publishers: string[];
  releaseDate: string;
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
      releaseDate: row['release_date'],
    });
  }

  return grouveeGames;
};

export const createGameData = async (grouveeData: GrouveeGame[]): Promise<HltbGrouveeGame[]> => {
  const hltbGrouveeGames: HltbGrouveeGame[] = [];
  for (const grouveeGame of grouveeData)
    hltbGrouveeGames.push({
      grouvee: grouveeGame,
      hltb: await hltbService.search(grouveeGame.name),
    });
  return hltbGrouveeGames;
};
