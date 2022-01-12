import { DetailsList, IColumn, Rating, RatingSize, SelectionMode } from '@fluentui/react';
import { FunctionComponent, useState } from 'react';
import { HltbGrouveeGame } from './GameData';

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

interface GameDTO {
  name: string;
  rating: number;
  releaseDate: string;
  time: number;
}

const GameList: FunctionComponent<{ games: HltbGrouveeGame[] }> = ({ games }) => {
  const _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);

    setItems(newItems);
    setColumns(newColumns);
  };

  const [items, setItems] = useState<GameDTO[]>(
    games.map((game) => ({
      name: game.grouvee.name,
      rating: game.grouvee.rating,
      releaseDate: game.grouvee.releaseDate,
      time: game.hltb.length ? game.hltb[0].gameplayMain : 0,
    }))
  );
  const [columns, setColumns] = useState<IColumn[]>([
    {
      key: 'name',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      isResizable: true,
      onColumnClick: _onColumnClick,
    },
    {
      key: 'rating',
      name: 'Rating',
      fieldName: 'rating',
      minWidth: 100,
      isResizable: true,
      data: 'number',
      onColumnClick: _onColumnClick,
      onRender: (game: GameDTO) =>
        game.rating && (
          <Rating
            min={0}
            max={5}
            size={RatingSize.Small}
            rating={game.rating}
            readOnly
            ariaLabel="Large stars"
            ariaLabelFormat="{0} of {1} stars"
          />
        ),
    },
    {
      key: 'releaseDate',
      name: 'Release Date',
      fieldName: 'releaseDate',
      minWidth: 100,
      isResizable: true,
      onColumnClick: _onColumnClick,
      onRender: (game: GameDTO) => <span>{new Date(game.releaseDate).toLocaleDateString()}</span>,
    },
    {
      key: 'time',
      name: 'Time to Beat',
      fieldName: 'time',
      minWidth: 100,
      isResizable: true,
      data: 'number',
      onColumnClick: _onColumnClick,
      onRender: (game: GameDTO) => <span>{game.time !== 0 ? `${game.time} hrs` : 'n/a'}</span>,
    },
  ]);

  return <DetailsList selectionMode={SelectionMode.none} items={items} columns={columns}></DetailsList>;
};

export default GameList;
