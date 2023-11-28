import Header from "./Header";
import Record from "./Record";

export const Table = ({ data, handleSelected, selected }: any) => {
  return (
    <div className="table">
      <Header />

      <div style={{ overflow: "scroll", height: "88vh", marginBottom: "20px" }}>
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
