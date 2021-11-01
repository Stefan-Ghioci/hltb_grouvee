import { DefaultButton, getTheme, PrimaryButton, Separator, Stack } from '@fluentui/react';
import { useState } from 'react';
import { HltbGrouveeGame } from '../GameData';
import { loadUserDataList } from '../Storage';
import { DataLoadScreen, GamesScreen } from './screens';
import Steps from './Steps';

const theme = getTheme();

const App = () => {
  const [currentGameData, setCurrentGameData] = useState<HltbGrouveeGame[] | null>(null);
  const [userDataList, setUserDataList] = useState<{ [id: string]: HltbGrouveeGame[] }>(
    loadUserDataList()
  );

  const [windowOnFocus, setWindowOnFocus] = useState(true);

  window.onfocus = () => setWindowOnFocus(true);
  window.onblur = () => setWindowOnFocus(false);

  const handleLoadUserData = () => {};

  return (
    <>
      <div
        className="draggable"
        style={{
          height: theme.spacing.l2,
          backgroundColor: windowOnFocus
            ? theme.palette.neutralPrimaryAlt
            : theme.palette.neutralSecondaryAlt,
          boxShadow: theme.effects.elevation4,
        }}
      />
      <Stack horizontalAlign="stretch" tokens={{ childrenGap: 'm', padding: 'l2' }}>
        <Stack horizontal horizontalAlign="space-between">
          <Steps
            currentIndex={+!currentGameData}
            stepList={['Grouvee', 'HLTB']}
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 's1' }}
          />
          <Stack horizontal tokens={{ childrenGap: 'm' }}>
            <PrimaryButton text="Load Grouvee Data" onClick={handleLoadUserData} />
            <DefaultButton text="Exit" onClick={window.close} />
          </Stack>
        </Stack>
        <Separator />
        {currentGameData ? (
          <GamesScreen gameData={currentGameData} />
        ) : (
          <DataLoadScreen
            userDataList={userDataList}
            loadGameData={(gameData) => setCurrentGameData(gameData)}
          />
        )}
      </Stack>
    </>
  );
};

export default App;
