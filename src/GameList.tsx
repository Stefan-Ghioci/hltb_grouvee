import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react';
import { FunctionComponent } from 'react';
import { HltbGrouveeGame } from './GameData';

const gridTheme = 'ag-theme-balham';
import(`ag-grid-community/dist/styles/${gridTheme}.css`);

interface GameDTO {
  name: string;
  rating: number | null;
  releaseDate: Date | null;
  timeMain: number | null;
  timeMainExtra: number | null;
  timeCompletionist: number | null;
}

const colDefs: ColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    filter: true,
    sortable: true,
    resizable: true,
    pinned: true,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    filter: true,
    sortable: true,
    resizable: true,
  },
  {
    field: 'releaseDate',
    headerName: 'Release Date',
    type: 'date',
    valueFormatter: (params) => params.value && (params.value as Date).toLocaleDateString(),
    filter: 'agDateColumnFilter',
    sortable: true,
    resizable: true,
  },
  {
    field: 'timeMain',
    headerName: 'T2B (Main)',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) => params.value && params.value + ' hrs',
    sortable: true,
    resizable: true,
  },
  {
    field: 'timeMainExtra',
    headerName: 'T2B (Main+Extra)',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) => params.value && params.value + ' hrs',

    sortable: true,
    resizable: true,
  },
  {
    field: 'timeCompletionist',
    headerName: 'T2B (Completionist)',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) => params.value && params.value + ' hrs',
    sortable: true,
    resizable: true,
  },
];

const GameList: FunctionComponent<{ games: HltbGrouveeGame[] }> = ({ games }) => {
  const rowData: GameDTO[] = games.map((game) => {
    const hltb = game.hltb.length ? game.hltb[0] : null;
    const releaseDate = new Date(game.grouvee.releaseDate);
    return {
      name: game.grouvee.name,
      rating: game.grouvee.rating,
      releaseDate: releaseDate.valueOf() ? releaseDate : null,
      timeMain: hltb && hltb.gameplayMain,
      timeMainExtra: hltb && hltb?.gameplayMainExtra,
      timeCompletionist: hltb && hltb?.gameplayCompletionist,
    };
  });

  return (
    <div className={gridTheme} style={{ height: '100%', width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

export default GameList;
