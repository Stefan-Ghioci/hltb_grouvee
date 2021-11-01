export interface HltbGrouveeGame {}
export interface GrouveeGame {}

export const parseCsvFileContent = async (content: string): Promise<GrouveeGame[]> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return [];
};

export const createGameData = async (grouveeData: GrouveeGame[]): Promise<HltbGrouveeGame[]> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return [];
};
