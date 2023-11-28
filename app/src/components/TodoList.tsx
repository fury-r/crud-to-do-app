import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import DialogBox from "./DialogBox";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodo } from "../redux/toDo";
import { RootState } from "../redux";
import { Table } from "./Table";
import { Cards } from "./Cards";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type operation = "update" | "insert" | "delete" | "complete";

export const TodoList = () => {
  const data = useSelector((state: RootState) => state.toDo.toDo);
  const [mode, setMode] = useState<operation>("insert");
  const [view, setView] = useState<boolean>(false); //by default table

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(-1);
  const dispatch = useDispatch();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    getUserInformation();
  }, []);

  const getUserInformation = async () => {
    await axios
      .post("todo/bulk/get")
      .then((res) => {
        if (res.data) {
          dispatch(setTodo(res.data.toDo));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelected = (
    key: React.SetStateAction<number>,
    mode: operation
  ) => {
    setSelected(key);

    setShow(true);
    setMode(mode);
  };

  const handleDataChange = () => {
    getUserInformation();
  };
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

      <div>
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
