import { Stack } from '@fluentui/react';
import { FunctionComponent } from 'react';
import { HltbGrouveeGame } from '../../GameData';

interface GamesScreenProps {
  gameData: HltbGrouveeGame[];
}

const GamesScreen: FunctionComponent<GamesScreenProps> = () => {
  return <Stack>Game</Stack>;
};

export default GamesScreen;
