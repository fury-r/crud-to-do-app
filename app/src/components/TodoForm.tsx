import { Form } from "react-bootstrap";

const TodoForm = ({ data, onChange }: any) => (
  <Form>
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Test"
        value={data.title}
        onChange={onChange}
        name="title"
        required
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label aria-required>Description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Test"
        value={data.description}
        onChange={onChange}
        required
        name="description"
      />
    </Form.Group>

    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Form.Group
        className="mb-3"
        controlId="formBasicAge"
        style={{ flex: 0.4 }}
      >
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="12"
          value={data.due_date}
          onChange={onChange}
          name="due_date"
        />
      </Form.Group>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Form.Group
        className="mb-3"
        controlId="formBasicAge"
        style={{ flex: 0.4 }}
      >
        <Form.Label>Status</Form.Label>
        <Form.Select
          placeholder="12"
          value={data.status}
          onChange={onChange}
          name="status"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </Form.Select>
      </Form.Group>
    </div>
  </Form>
);
export default TodoForm;
