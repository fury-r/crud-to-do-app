import { Button, Form } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import DialogBox from "./DialogBox";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Table } from "./Table";
import { Cards } from "./Cards";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Todo, TOperation } from "../types/todo";
import { useTodo } from "../hooks/useTodo";

export const TodoList = () => {
  const data = useSelector((state: RootState) => state.toDo.toDo);
  const [mode, setMode] = useState<TOperation>("insert");
  const [view, setView] = useState<boolean>(false); //by default table
  const { bulkGet } = useTodo();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(-1);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const getUserInformation = useCallback(async () => {
    await bulkGet();
  }, [bulkGet]);

  useEffect(() => {
    getUserInformation();
  }, []);

  const handleSelected = (key: number, mode: TOperation) => {
    setSelected(key);

    setShow(true);
    setMode(mode);
  };

  const handleDataChange = useCallback(() => {
    () => {
      getUserInformation();
    };
  }, [getUserInformation]);
  const logout = () => {
    setUser();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {show ? (
        <DialogBox
          value={selected === -1 ? {} : data[selected]}
          setShow={setShow}
          show={show}
          selected={selected}
          handleDataChange={handleDataChange}
          mode={mode}
        />
      ) : (
        <></>
      )}

      <div
        style={{
          height: "100%",
        }}
      >
        <div className="flex-row-between">
          <Button
            onClick={() => {
              handleSelected(-1, "insert");
            }}
            className="button"
            style={{
              backgroundColor: "#21ba45",
            }}
          >
            Add new
          </Button>
          <Button
            onClick={() => logout()}
            className="button"
            style={{
              backgroundColor: "#df0c0c",
            }}
          >
            Logout
          </Button>
          <div className="flex-row-between ">
            <b
              style={{
                margin: "5px",
              }}
            >
              Filter:
            </b>
            <Form.Select
              placeholder="12"
              onChange={async (e) => {
                const filter = e.target.value;
                console.log(e.target.value);
                bulkGet(
                  filter !== "All" ? (e.target.value as Todo["status"]) : null
                );
              }}
              name="status"
            >
              <option value="All">All</option>

              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Form.Select>
          </div>
          <Button
            onClick={() => setView((prev) => !prev)}
            className="button"
            style={{
              backgroundColor: "#373a38",
            }}
          >
            {view ? <DashboardIcon /> : <BackupTableIcon />}
          </Button>
        </div>
        {view ? (
          <Cards
            data={data}
            handleSelected={handleSelected}
            selected={selected}
          />
        ) : (
          <Table
            data={data}
            handleSelected={handleSelected}
            selected={selected}
          />
        )}
      </div>
    </div>
  );
};
