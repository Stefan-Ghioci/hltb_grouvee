import { Schema } from 'electron-store';
const Store = window.require('electron-store');

interface StoreData {
  name: string;
}

const schema: Schema<StoreData> = { name: { type: 'string' } };
const store = new Store({ schema });

export const loadUserDataList = () =>
  store.has('userDataList') ? store.get('userDataList') : {};
