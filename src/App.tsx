import {
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogType,
  PrimaryButton,
  ProgressIndicator,
  Separator,
  Stack,
  TextField,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { createGameData, parseCsvFileContent } from './GameData';
import { addUserData, loadUserData } from './Storage';

const App = () => {
  const userData = loadUserData();

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

    addUserData(await createGameData(parseCsvFileContent(content)));
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
          <PrimaryButton text="Continue" disabled={!loadedGrouveeFileName} onClick={handleLoadUserData} />
          <DefaultButton
            onClick={() => {
              setOpenLoadUserDataDialog(false);
              setLoadedGrouveeFileName(false);
            }}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
      <Stack horizontalAlign="stretch" tokens={{ childrenGap: 'm', padding: 'l2' }}>
        <Stack horizontal horizontalAlign="space-between">
          <Stack horizontal tokens={{ childrenGap: 'm' }}>
            <PrimaryButton text="Load Grouvee Data" onClick={() => setOpenLoadUserDataDialog(true)} />
          </Stack>
        </Stack>
        <Separator />
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </Stack>
    </>
  );
};

export default App;
