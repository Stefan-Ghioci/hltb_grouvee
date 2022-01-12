import ElectronStore from 'electron-store';
import { HltbGrouveeGame } from './GameData';

const Store = window.require('electron-store');

const store: ElectronStore = new Store();
const USER_DATA_STORE_KEY = 'userData';

export const loadUserData = (): HltbGrouveeGame[] => store.get(USER_DATA_STORE_KEY, []) as HltbGrouveeGame[];

export const addUserData = (gameData: HltbGrouveeGame[]) => store.set(USER_DATA_STORE_KEY, gameData);
