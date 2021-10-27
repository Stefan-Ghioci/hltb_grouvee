import {
  DefaultButton,
  FontSizes,
  FontWeights,
  getTheme,
  PrimaryButton,
  Separator,
  Stack,
  Text,
} from '@fluentui/react';
import { ChevronRightIcon } from '@fluentui/react-icons-mdl2';
import { useState } from 'react';
import { HltbGrouveeGame } from './GameData';
import { DataLoadScreen, GamesScreen } from './screens';

const theme = getTheme();

const App = () => {
  const [currentGameData, setCurrentGameData] = useState<HltbGrouveeGame[] | null>(null);

  const [windowOnFocus, setWindowOnFocus] = useState(true);

  window.onfocus = () => setWindowOnFocus(true);
  window.onblur = () => setWindowOnFocus(false);

  return (
    <>
      <div
        className="draggable"
        style={{
          height: theme.spacing.l2,
          backgroundColor: windowOnFocus ? theme.palette.neutralPrimaryAlt : theme.palette.neutralSecondaryAlt,
          boxShadow: theme.effects.elevation4,
        }}
      />
      <Stack horizontalAlign="stretch" tokens={{ childrenGap: 'm', padding: 'l2' }}>
        <Stack horizontal horizontalAlign="space-between">
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 's1' }}>
            <Text
              variant="large"
              styles={{
                root: { fontWeight: currentGameData ? FontWeights.regular : FontWeights.bold },
              }}
              key="DataLoad"
            >
              Grouvee
            </Text>
            <ChevronRightIcon style={{ fontSize: FontSizes.small }} />
            <Text
              variant="large"
              styles={{
                root: { fontWeight: currentGameData ? FontWeights.bold : FontWeights.regular },
              }}
              key="Games"
            >
              HLTB
            </Text>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 'm' }}>
            <PrimaryButton text="Load Grouvee Data" />
            <DefaultButton text="Exit" onClick={window.close}/>
          </Stack>
        </Stack>
        <Separator />
        {currentGameData ? (
          <GamesScreen gameData={currentGameData} />
        ) : (
          <DataLoadScreen loadGameData={(gameData) => setCurrentGameData(gameData)} />
        )}
      </Stack>
    </>
  );
};

export default App;
