import parse from "csv-parse/lib/sync";
import { HowLongToBeatService } from "howlongtobeat";
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import Game from "./Game";

// let hltbService = new HowLongToBeatService();
// hltbService
//   .search("Assassin's Creed Syndicate")
//   .then((result) => console.log(result));

let hltbService = new HowLongToBeatService();

const App = () => {
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: ".csv",
  });

  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    if (filesContent.length) {
      (async () => {
        let grouveeData = parse(filesContent[0].content, { columns: true });
        console.log(`Loaded ${grouveeData.length} games`);

        grouveeData = grouveeData
          .filter((grouveeEntry) => {
            const shelves = Object.keys(JSON.parse(grouveeEntry.shelves));
            return !shelves.includes("Played") && !shelves.includes("Playing");
          })
          // .slice(0, 20);
        console.log(`Parsing ${grouveeData.length} games...`);

        let gameData = [];
        for (const grouveeEntry of grouveeData) {
          let hltbEntry = (
            await hltbService.search(
              grouveeEntry.name.replace(/[&#,+()$~%'"-:*?<>{}]/g, " ")
            )
          )[0];

          gameData.push(Object.assign({}, grouveeEntry, { hltb: hltbEntry }));
        }

        setGameData(gameData);
      })();
    }
  }, [filesContent]);

  return (
    <>
      <button onClick={() => openFileSelector()}>Upload Grouvee data</button>
      {(() => {
        let sortedData = gameData.length ? [...gameData] : [];
        sortedData = sortedData.filter(
          (entry) =>
            entry.hltb &&
            entry.hltb.timeLabels &&
            entry.hltb[entry.hltb.timeLabels[0][0]] > 0
        );
        sortedData.sort(
          (a, b) =>
            a.hltb[a.hltb.timeLabels[0][0]] - b.hltb[b.hltb.timeLabels[0][0]]
        );
        return sortedData.map((entry) => <Game key={entry.id} data={entry} />);
      })()}
    </>
  );
};

export default App;
