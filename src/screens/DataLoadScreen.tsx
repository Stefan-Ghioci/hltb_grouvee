import { Stack } from '@fluentui/react';
import { FunctionComponent } from 'react';
import { HltbGrouveeGame } from '../GameData';

interface DataLoadScreenProps {
  loadGameData(arg0: HltbGrouveeGame[]): void;
}

const DataLoadScreen: FunctionComponent<DataLoadScreenProps> = ({ loadGameData }) => {
  return <Stack>Data Load</Stack>;
};

export default DataLoadScreen;
