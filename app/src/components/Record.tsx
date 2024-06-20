import { Button, Form } from "react-bootstrap";
import { Todo, TOperation } from "../types/todo";
import { useTodo } from "../hooks/useTodo";
export interface IRecord {
  value: Todo;
  index: number;
  handleSelected: (key: number, mode: TOperation) => void;
  selected: number;
}
const Record = ({ value, index, handleSelected }: IRecord) => {
  const { updateTodo } = useTodo();

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
          flex: 0.1,

          width: "10%",
        }}
      >
        <Form.Select
          placeholder="12"
          value={value.status}
          onChange={async (e) => {
            await updateTodo({
              ...value,
              status: e.target.value as Todo["status"],
            });
          }}
          name="status"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </Form.Select>
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
      </div>
    </div>
  );
};
export default Record;
