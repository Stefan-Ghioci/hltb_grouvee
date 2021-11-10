import {
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogType,
  getTheme,
  PrimaryButton,
  ProgressIndicator,
  Separator,
  Stack,
  TextField,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { createGameData, HltbGrouveeGame, parseCsvFileContent } from '../GameData';
import { addUserData, loadUserDataList } from '../Storage';
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

  const [openLoadUserDataDialog, setOpenLoadUserDataDialog] = useState(false);
  const [loadedGrouveeFileName, setLoadedGrouveeFileName] = useState(false);
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: '.csv',
  });

  const [loadingUserData, setLoadingUserData] = useState(false);

  useEffect(() => {
    setLoadedGrouveeFileName(filesContent.length !== 0);
  }, [filesContent]);

  const handleLoadUserData = async () => {
    const { content } = filesContent[0];

    setOpenLoadUserDataDialog(false);
    setLoadingUserData(true);
    setLoadedGrouveeFileName(false);

    const grouveeData = parseCsvFileContent(content);
    const gameData = await createGameData(grouveeData);

    const userId = 'Ceilort'; // TODO: add user ID later

    addUserData(userId, gameData);

    const newUserDataList = { ...userDataList };
    newUserDataList[userId] = gameData;
    setUserDataList(newUserDataList);

    setLoadingUserData(false);
  };

  return (
    <>
      <Dialog
        hidden={!loadingUserData}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Loading...',
          subText: 'Your Grouvee games are merged with data fetched from HLTB.',
        }}
      >
        <DialogContent>
          <ProgressIndicator></ProgressIndicator>
        </DialogContent>
      </Dialog>
      <Dialog
        hidden={!openLoadUserDataDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Load Grouvee Data',
          subText: 'Load the .csv file containing your game data.',
        }}
      >
        <DialogContent>
          <TextField
            placeholder={loadedGrouveeFileName ? filesContent[0].name : 'Browse...'}
            readOnly
            onClick={openFileSelector}
            style={{ cursor: 'pointer' }}
            iconProps={{ iconName: 'Document' }}
          />
        </DialogContent>
        <DialogFooter>
          <PrimaryButton
            text="Continue"
            disabled={!loadedGrouveeFileName}
            onClick={handleLoadUserData}
          />
          <DefaultButton
            onClick={() => {
              setOpenLoadUserDataDialog(false);
              setLoadedGrouveeFileName(false);
            }}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
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
            {currentGameData ? (
              <DefaultButton text="Back" onClick={() => setCurrentGameData(null)} />
            ) : (
              <PrimaryButton
                text="Load Grouvee Data"
                onClick={() => setOpenLoadUserDataDialog(true)}
              />
            )}
            <DefaultButton text="Exit" onClick={window.close} />
          </Stack>
        </Stack>
        <Separator />
        {currentGameData ? (
          <GamesScreen gameData={currentGameData} />
        ) : (
          <DataLoadScreen userDataList={userDataList} loadGameData={setCurrentGameData} />
        )}
      </Stack>
    </>
  );
};

export default App;
