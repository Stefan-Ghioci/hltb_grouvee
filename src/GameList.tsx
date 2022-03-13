import { ColDef, ValueFormatterFunc } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react';
import { FunctionComponent } from 'react';
import { HltbGrouveeGame } from './GameData';

const gridTheme = 'ag-theme-balham';
import(`ag-grid-community/dist/styles/${gridTheme}.css`);

const defaultColDef: ColDef = {
  filter: true,
  sortable: true,
  resizable: true,
};

const timeValueFormatter: ValueFormatterFunc = ({ value }) => (value ? `${value} hrs` : '');

const colDefs: ColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    pinned: true,
  },
  {
    field: 'shelves',
    headerName: 'Shelves',
  },
  {
    field: 'rating',
    headerName: 'Rating',
  },
  {
    field: 'genres',
    headerName: 'Genres',
  },
  {
    field: 'developers',
    headerName: 'Developers',
  },
  { field: 'publishers', headerName: 'Publishers' },
  {
    field: 'releaseDate',
    headerName: 'Release Date',
    valueFormatter: (params) => params.value && (params.value as Date).toLocaleDateString(),
    filter: 'agDateColumnFilter',
  },
  {
    field: 'timeMain',
    headerName: 'T2B (Main)',
    filter: 'agNumberColumnFilter',
    valueFormatter: timeValueFormatter,
  },
  {
    field: 'timeMainExtra',
    headerName: 'T2B (Main+Extra)',
    filter: 'agNumberColumnFilter',
    valueFormatter: timeValueFormatter,
  },
  {
    field: 'timeCompletionist',
    headerName: 'T2B (Completionist)',
    filter: 'agNumberColumnFilter',
    valueFormatter: timeValueFormatter,
  },
];

const GameList: FunctionComponent<{ games: HltbGrouveeGame[] }> = ({ games }) => {
  const rowData = games.map((game) => {
    const hltb = game.hltb.length ? game.hltb[0] : null;
    const releaseDate = new Date(game.grouvee.releaseDate);

    const { name, rating, shelves, genres, developers, publishers, id } = game.grouvee;

    return {
      id,
      name,
      rating,
      shelves,
      genres,
      developers,
      publishers,
      releaseDate: releaseDate.valueOf() ? releaseDate : null,
      timeMain: hltb && hltb.gameplayMain,
      timeMainExtra: hltb && hltb.gameplayMainExtra,
      timeCompletionist: hltb && hltb.gameplayCompletionist,
    };
  });

  return (
    <div className={gridTheme} style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        getRowNodeId={(data) => data.id}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default GameList;
