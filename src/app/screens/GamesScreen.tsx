import { Image, Stack } from '@fluentui/react';
import { FunctionComponent } from 'react';
import { HltbGrouveeGame } from '../../GameData';

interface GamesScreenProps {
  gameData: HltbGrouveeGame[];
}

const GamesScreen: FunctionComponent<GamesScreenProps> = ({ gameData }) => {
  return (
    <Stack>
      {gameData.map((game) => (
        <pre>{JSON.stringify(game, null, 1)}</pre>
      ))}
    </Stack>
  );
};

export default GamesScreen;
