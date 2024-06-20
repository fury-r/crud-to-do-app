import { Todo } from "../types/todo";
import Header from "./Header";
import Record, { IRecord } from "./Record";

export const Table = ({
  data,
  handleSelected,
  selected,
}: {
  data: Todo[];
  selected: number;
  handleSelected: IRecord["handleSelected"];
}) => {
  return (
    <div className="table">
      <Header />

      <div style={{ overflow: "auto", height: "90%", marginBottom: "20px" }}>
        {data.length > 0 ? (
          data.map((value: any, key: any) => (
            <Record
              value={value}
              handleSelected={handleSelected}
              key={key}
              selected={selected}
              index={key}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
