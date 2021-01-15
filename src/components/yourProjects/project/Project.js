import React, { useEffect, useState, useMemo, useContext, useRef } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import "react-toastify/dist/ReactToastify.css";
import { useBeforeunload } from "react-beforeunload";

import Navigation from "./navigation/Navigation";
import classes from "./project.module.scss";
import RectangularTable from "./rectangularTable/RectangularTable";
import RoundTable from "./roundTable/RoundTable";
import Backdrop from "./../../UI/backdrop/Backdrop";
import InfoModal from "../../UI/infoModal/InfoModal";
import * as actions from "./../../../actions/index";
import { ProjectsContext } from "./../../../App";
import { showSuccessToast, showFailToast } from "./../../../utility/Toasts/toasts";

export const TableFunctionsContext = React.createContext(null);
export const SeatLabelsContext = React.createContext(null);

const Project = (props) => {
  const [projectDataArr, setProjectDataArr] = useState([{}, {}]);
  const [rectangularTables, setRectangularTables] = useState(null);
  const [roundTables, setRoundTables] = useState(null);
  const [projectSaved, setProjectSaved] = useState(true);

  const projs = useContext(ProjectsContext);

  const project = useRef(null);

  useBeforeunload((e) => {
    if (!projectSaved) {
      e.preventDefault();
    }
  });

  useEffect(() => {
    setProjectDataArr(createProjectDataArray);
  }, []);

  useEffect(() => {
    let rectTables;
    let rndTables;

    if (projectDataArr[0].tables) {
      rectTables = projectDataArr[0].tables.map((el, index) => {
        return (
          <RectangularTable
            id={el.tableNr}
            key={el.tableNr}
            hSeats={el.horizontalSeats}
            vSeats={el.verticalSeats}
            rotation={el.rotation}
            xPosition={el.tablePositionX}
            yPosition={el.tablePositionY}
            rules={el.rules}
            seatLabels={el.seatLabels}
            mouseDownHandler={mouseDownHandler}
            changeTableSizeHandler={changeRectangularTableSizeHandler}
            rotationTimes={el.rotationTimes}
          />
        );
      });
    }

    if (projectDataArr[1].tables) {
      rndTables = projectDataArr[1].tables.map((el, index) => {
        return (
          <RoundTable
            id={el.tableNr}
            key={el.tableNr}
            seats={el.seats}
            rotation={el.rotation}
            xPosition={el.tablePositionX}
            yPosition={el.tablePositionY}
            seatLabels={el.seatLabels}
            mouseDownHandler={mouseDownHandler}
            rotationTimes={el.rotationTimes}
            changeTableSizeHandler={changeRoundTableSizeHandler}
          />
        );
      });
    }
    setRectangularTables(rectTables);
    setRoundTables(rndTables);
  }, [projectDataArr]);

  const createProjectDataArray = useMemo(() => {
    return [{ ...props.projectData.rectangular }, { ...props.projectData.round }];
  }, [props.projectData]);

  const returnTableType = (type) => {
    const tableType = type === "rectangular" ? projectDataArr[0] : projectDataArr[1];
    const otherType = type === "rectangular" ? projectDataArr[1] : projectDataArr[0];
    return { tableType: tableType, otherType: otherType };
  };

  const passDataToProjectDataArr = (tables, tableId, type, newTableProps) => {
    type === "rectangular"
      ? setProjectDataArr([
          {
            number: tables.tableType.number,
            tables: tables.tableType.tables.filter((el) => el.tableNr !== parseInt(tableId, 10)).concat(newTableProps),
          },
          { ...tables.otherType },
        ])
      : setProjectDataArr([
          { ...tables.otherType },
          {
            number: tables.tableType.number,
            tables: tables.tableType.tables.filter((el) => el.tableNr !== parseInt(tableId, 10)).concat(newTableProps),
          },
        ]);
  };

  const getTableCordsHandler = (cords, id, type) => {
    const tables = returnTableType(type);
    const table = tables.tableType.tables.filter((el) => el.tableNr === parseInt(id, 10));
    const newTableProps = { ...table[0] };
    newTableProps.tablePositionX = cords.x;
    newTableProps.tablePositionY = cords.y;

    passDataToProjectDataArr(tables, id, type, newTableProps);
    setProjectSaved(false);
  };

  const removeTableHandler = (id, type) => {
    const tables = returnTableType(type);

    type === "rectangular"
      ? setProjectDataArr([
          {
            number: tables.tableType.number - 1,
            tables: tables.tableType.tables.filter((el) => el.tableNr !== id),
          },
          { ...tables.otherType },
        ])
      : setProjectDataArr([
          { ...tables.otherType },
          {
            number: tables.tableType.number - 1,
            tables: tables.tableType.tables.filter((el) => el.tableNr !== id),
          },
        ]);
    setProjectSaved(false);

    showSuccessToast(
      <div className={classes.toast}>
        <p>Table has been removed</p>
        <i class="far fa-check-circle"></i>
      </div>
    );
  };

  const rotateTableHandler = (id, type, rot) => {
    const tables = returnTableType(type);

    const table = tables.tableType.tables.filter((el) => el.tableNr === parseInt(id, 10));
    const newTableProps = { ...table[0] };
    newTableProps.rotation = newTableProps.rotation + parseFloat(rot, 10);
    newTableProps.rotationTimes++;

    passDataToProjectDataArr(tables, id, type, newTableProps);
    setProjectSaved(false);
  };

  const mouseDownHandler = (event, table, rotationTimes) => {
    if (true) {
      table.current.ondragstart = function () {
        return false;
      };

      table.current.style.position = "abosulte";
      table.current.style.zIndex = "1000";

      const moveAt = (pageX, pageY) => {
        if (rotationTimes % 4 === 0 || rotationTimes % 4 === 2) {
          table.current.style.left = pageX - table.current.offsetWidth / 2 + "px";
          table.current.style.top = pageY - table.current.offsetHeight / 3 + "px";
        } else {
          table.current.style.left = pageX - table.current.offsetWidth / 5 + "px";
          table.current.style.top = pageY - table.current.offsetHeight / 2 + "px";
        }
      };

      moveAt(event.pageX, event.pageY);

      const onMouseMove = (event) => {
        moveAt(event.pageX, event.pageY);
      };

      document.addEventListener("mousemove", onMouseMove);

      table.current.onmouseup = (e) => {
        document.removeEventListener("mousemove", onMouseMove);
        table.current.onmouseup = null;

        getTableCordsHandler(
          {
            x: table.current.offsetLeft,
            y: table.current.offsetTop,
          },
          table.current.dataset.id,
          table.current.dataset.type
        );
      };
    }
    setProjectSaved(false);
  };

  const changeRectangularTableSizeHandler = (size, type, id, newRotation, newRules) => {
    const tables = returnTableType(type);
    const table = tables.tableType.tables.filter((el) => el.tableNr === parseInt(id, 10));

    const newTableProps = { ...table[0] };
    newTableProps.horizontalSeats = size.width;
    newTableProps.verticalSeats = size.height;
    newTableProps.rotationTimes = table[0].rotationTimes + newRotation;
    newTableProps.rotation = newTableProps.rotationTimes * 90;
    newTableProps.rules = newRules;

    passDataToProjectDataArr(tables, id, type, newTableProps);
    setProjectSaved(false);
  };

  const changeRoundTableSizeHandler = (seats, id, type) => {
    const tables = returnTableType(type);
    const table = tables.tableType.tables.filter((el) => el.tableNr === parseInt(id, 10));
    const newTableProps = { ...table[0] };
    newTableProps.seats = seats;

    passDataToProjectDataArr(tables, id, type, newTableProps);
    setProjectSaved(false);
  };

  const addRectangularSeatLabelHandler = (text, tableId, seatIndex, tableSide, type) => {
    const tables = returnTableType(type);
    const table = tables.tableType.tables.filter((el) => el.tableNr === parseInt(tableId, 10));

    const newTableProps = { ...table[0] };
    const oldTableLabelsProps = { ...newTableProps.seatLabels[tableSide] };
    newTableProps.seatLabels = {
      ...newTableProps.seatLabels,
      [tableSide]: {
        ...oldTableLabelsProps,
        [seatIndex]: text,
      },
    };
    passDataToProjectDataArr(tables, tableId, type, newTableProps);
    setProjectSaved(false);
  };

  const addRoundSeatLabelHandler = (text, tableId, seatId, type) => {
    const tables = returnTableType(type);
    const table = tables.tableType.tables.filter((el) => el.tableNr === parseInt(tableId, 10));

    const newTableProps = { ...table[0] };
    newTableProps.seatLabels = {
      ...newTableProps.seatLabels,
      [seatId]: text,
    };

    passDataToProjectDataArr(tables, tableId, type, newTableProps);
    setProjectSaved(false);
  };

  const clearProjectDataHandler = () => {
    const newProjectDataRect = { ...projectDataArr[0] };
    const newProjectDataRound = { ...projectDataArr[1] };
    newProjectDataRect.number = 0;
    newProjectDataRect.tables = [];
    newProjectDataRound.number = 0;
    newProjectDataRound.tables = [];

    setProjectDataArr([newProjectDataRect, newProjectDataRound]);
    showSuccessToast(
      <div className={classes.toast}>
        <p>Project has been cleared</p>
        <i class="far fa-check-circle"></i>
      </div>
    );
    setProjectSaved(false);
  };

  const saveProjectDataHandler = () => {
    firebase
      .database()
      .ref(`${props.fireUser.uid}/${props.path}/rectangular`)
      .set(projectDataArr[0])
      .then((response) => {
        showSuccessToast(
          <div className={classes.toast}>
            <p>Project has been saved</p>
            <i class="far fa-check-circle"></i>
          </div>
        );
        setProjectSaved(true);
        props.onSaveCheckModalShow(false, null, true);
        projs.reloadProjects(Math.random());
      })
      .catch((error) => {
        showFailToast(<div className={classes.toast}>{error.message}</div>);
      });

    firebase
      .database()
      .ref(`${props.fireUser.uid}/${props.path}/round`)
      .set(projectDataArr[1])
      .then((response) => {})
      .catch((error) => {
        showFailToast(<div className={classes.toast}>{error.message}</div>);
      });
  };

  const addRectangularTableHandler = () => {
    const newProjectDataArr = { ...projectDataArr[0] };
    newProjectDataArr.number++;

    if (!newProjectDataArr.tables) {
      newProjectDataArr.tables = [];
    }

    const newTable = {
      horizontalSeats: 1,
      verticalSeats: 10,
      tableNr: newProjectDataArr.number - 1,
      tablePositionX: 90,
      tablePositionY: 270,
      rotation: 0,
      rotationTimes: 0,
      rotatedManually: false,
      rules: { top: true, bottom: true, left: true, right: true },
      seatLabels: { top: { 0: "" }, right: { 0: "" }, bottom: { 0: "" }, left: { 0: "" } },
    };

    newProjectDataArr.tables = [...newProjectDataArr.tables, newTable];
    setProjectDataArr([newProjectDataArr, { ...projectDataArr[1] }]);
    showSuccessToast(
      <div className={classes.toast}>
        <p>Table has been added</p>
        <i class="far fa-check-circle"></i>
      </div>
    );
    setProjectSaved(false);
  };

  const addRoundTableHandler = () => {
    const newProjectDataArr = { ...projectDataArr[1] };
    newProjectDataArr.number++;

    if (!newProjectDataArr.tables) {
      newProjectDataArr.tables = [];
    }

    const newTable = {
      tableNr: newProjectDataArr.number - 1,
      tablePositionX: 110,
      tablePositionY: 565,
      rotation: 0,
      rotationTimes: 0,
      seats: 7,
      seatLabels: { 0: "" },
    };

    newProjectDataArr.tables = [...newProjectDataArr.tables, newTable];
    setProjectDataArr([{ ...projectDataArr[0] }, newProjectDataArr]);
    showSuccessToast(
      <div className={classes.toast}>
        <p>Table has been added</p>
        <i class="far fa-check-circle"></i>
      </div>
    );
    setProjectSaved(false);
  };

  const leavePageHanlder = () => {
    props.onLeave();
    props.onSaveCheckModalShow(false);
  };

  return (
    <div className={classes.container}>
      <TableFunctionsContext.Provider
        value={{
          removeTable: removeTableHandler,
          rotateTable: rotateTableHandler,
        }}
      >
        <Navigation
          email={props.userEmail}
          projectsNames={props.projectsNames}
          saveProjectDataHandler={saveProjectDataHandler}
          clearProjectDataHandler={clearProjectDataHandler}
          addRectangularTableHandler={addRectangularTableHandler}
          addRoundTableHandler={addRoundTableHandler}
          projectSaved={projectSaved}
          projRef={project.current}
        />

        <SeatLabelsContext.Provider
          value={{ addRectangularSeatLabelHandler: addRectangularSeatLabelHandler, addRoundSeatLabelHandler: addRoundSeatLabelHandler }}
        >
          <div ref={project}>
            {rectangularTables}
            {roundTables}
          </div>
        </SeatLabelsContext.Provider>
      </TableFunctionsContext.Provider>
      <Backdrop
        show={props.isSaveCheckModalVisible}
        click={() => {
          props.onSaveCheckModalShow(false);
        }}
      />
      <InfoModal
        show={props.isSaveCheckModalVisible}
        negativeClick={leavePageHanlder}
        positiveClick={() => {
          props.onSaveCheckModalShow(false);
        }}
        text="Are your sure you want to leave without saving? All chagnes will be lost."
        btnPositiveText="Stay"
        btnNegativeText="Leave"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fireUser: state.auth.fireUser,
    isSaveCheckModalVisible: state.modVis.saveCheckModalVisible,
    onLeave: state.modVis.leaveHandler,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveCheckModalShow: (show) => dispatch(actions.editSaveCheckModalVisibility(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
