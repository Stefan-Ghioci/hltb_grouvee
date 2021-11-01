import { Stack } from '@fluentui/react';
import { FunctionComponent } from 'react';
import { HltbGrouveeGame } from '../../GameData';

interface DataLoadScreenProps {
  userDataList: { [id: string]: HltbGrouveeGame[] };
  loadGameData(arg0: HltbGrouveeGame[]): void;
}

const DataLoadScreen: FunctionComponent<DataLoadScreenProps> = ({ userDataList, loadGameData }) => (
  <Stack>
    <pre>{JSON.stringify(userDataList, null, '\t')}</pre>
  </Stack>
);

export default DataLoadScreen;
