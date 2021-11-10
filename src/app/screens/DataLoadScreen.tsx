import { DocumentCard, DocumentCardActions, DocumentCardActivity, Stack } from '@fluentui/react';
import { FunctionComponent } from 'react';
import { HltbGrouveeGame } from '../../GameData';

interface DataLoadScreenProps {
  userDataList: { [id: string]: HltbGrouveeGame[] };
  loadGameData(arg0: HltbGrouveeGame[]): void;
}

const DataLoadScreen: FunctionComponent<DataLoadScreenProps> = ({ userDataList, loadGameData }) => {
  const reloadData = (user: string) => {
    //TODO: reload HLTB data
  };
  const deleteUserData = (user: string) => {
    //TODO: delete user from storage
  };

  return (
    <Stack>
      {Object.keys(userDataList).map((user) => {
        const gameData = userDataList[user];
        return (
          <DocumentCard key={user}>
            {/*TODO: track date HLTB loaded*/}
            <DocumentCardActivity activity="January 1st, 1970"  people={[{name:user, profileImageSrc: ''}]} />
            <DocumentCardActions
              actions={[
                {
                  iconProps: { iconName: 'OpenInNewTab' },
                  onClick: () => loadGameData(gameData),
                },
                {
                  iconProps: { iconName: 'Refresh' },
                  onClick: () => reloadData(user),
                },
                { iconProps: { iconName: 'Delete' }, onClick: () => deleteUserData(user) },
              ]}
              views={gameData.length}
            />
          </DocumentCard>
        );
      })}
    </Stack>
  );
};

export default DataLoadScreen;
