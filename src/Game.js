const Game = ({ data }) => {
  return (
    <div>
      <h3>{`${data.name} (${data.release_date.slice(0, 4)})`}</h3>
      <p>
        {Object.keys(JSON.parse(data.shelves)).join(" | ")}
        <i>{" ~ " + Object.keys(JSON.parse(data.genres)).join(" | ")}</i>
      </p>
      {data.hltb ? (
        data.hltb.timeLabels.map((timeLabel) => (
          <small
            key={timeLabel[0]}
            style={{ fontSize: 13, fontStyle: "italic", marginLeft: "16px" }}
          >{`${data.hltb[timeLabel[0]]} - ${timeLabel[1]}`}</small>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Game;
