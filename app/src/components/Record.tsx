import { Button } from "react-bootstrap";

const Record = ({ value, index, handleSelected }: any) => {
  return (
    <div className="row">
      <div
        className="item"
        style={{
          flex: 0.2,

          width: "20%",
        }}
      >
        <label>{value.title}</label>
      </div>
      <div
        className="item"
        style={{
          flex: 0.4,

          width: "40%",
        }}
      >
        <label>{value.description}</label>
      </div>
      <div
        className="item"
        style={{
          flex: 0.1,

          width: "10%",
        }}
      >
        <label>{value.due_date}</label>
      </div>

      <div
        className="item"
        style={{
          flex: 0.15,

          justifyContent: "space-around",
          width: "17%",
        }}
      >
        <Button
          onClick={() => {
            handleSelected(index, "update");
          }}
          className="button"
          style={{
            flex: 0.4,
            backgroundColor: "#2486d0",
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleSelected(index, "delete");
          }}
          className="button"
          style={{
            flex: 0.4,
            backgroundColor: "black",
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            handleSelected(index, "complete");
          }}
          className="button"
          style={{
            flex: 0.4,
            backgroundColor: "orange",
          }}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
export default Record;
