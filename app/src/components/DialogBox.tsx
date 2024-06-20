import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserForm from "./TodoForm";
import { onChange } from "../helper/common";
import { useTodo } from "../hooks/useTodo";
import { Todo } from "../types/todo";
const DialogBox = ({ mode, setShow, show, value, handleDataChange }: any) => {
  const [data, setData] = useState<Todo>({
    title: value?.title,
    due_date: value?.due_date,
    description: value?.description,
    status: value?.status || "PENDING",
  });
  const { addTodo, deleteTodo, status, updateTodo } = useTodo();

  const onSubmit = () => {
    if (mode === "insert") {
      addTodo(data as Todo);
      handleDataChange();
    } else if (mode === "update") {
      updateTodo({
        id: value.id,
        ...data,
      });
    }
    setShow(false);
  };

  const handleDelete = () => {
    deleteTodo(value.id);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "insert"
            ? "Add Todo"
            : mode === "update"
            ? "Edit Todo"
            : "Delete Todo"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {mode === "delete" || mode === "complete" ? (
            <div>
              <label>Are you sure you want to {mode} this Todo event?</label>
            </div>
          ) : (
            <UserForm data={data} onChange={(e: any) => onChange(e, setData)} />
          )}
          {status > 0 ? (
            <div>
              <div
                className="alert"
                style={{
                  borderColor: status === 1 ? "#23aa32" : "#a57b17",
                  background: status === 1 ? "#e5f9e7" : "#fff8db",
                }}
              >
                <b style={{ color: status === 1 ? "#23aa32" : "#a57b17" }}>
                  {status === 1 ? "Nice one" : "Woah!"}
                </b>
                <label
                  style={{ color: status === 1 ? "#23aa32" : "#a57b17" }}
                ></label>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {mode === "delete" || mode === "complete" ? (
          <div className="flex-row-end">
            <Button
              onClick={handleDelete}
              className="button"
              style={{
                backgroundColor: mode === "complete" ? "orange" : "#db2828",
              }}
            >
              Yes
            </Button>

            <Button
              className="button"
              onClick={() => setShow(false)}
              style={{
                backgroundColor: "black",

                marginLeft: "10px",
              }}
            >
              No
            </Button>
          </div>
        ) : (
          <Button
            className="button"
            style={{
              backgroundColor: mode === 1 ? "#0ea432" : "#0d71bb",
            }}
            onClick={onSubmit}
          >
            {mode === 1 ? "Add" : "Save"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default DialogBox;
