import { Schema } from 'electron-store';
import { HltbGrouveeGame } from './GameData';
const Store = window.require('electron-store');

interface StoreData {
  name: string;
}

const schema: Schema<StoreData> = { name: { type: 'string' } };
const store = new Store({ schema });

export const loadUserDataList = (): { [id: string]: HltbGrouveeGame[] } =>
  store.has('userDataList') ? JSON.parse(store.get('userDataList')) : {};

export const addUserData = (user: string, gameData: HltbGrouveeGame[]) => {
  const userDataList = loadUserDataList();
  userDataList[user] = gameData;
  store.set('userDataList', JSON.stringify(userDataList));
};
