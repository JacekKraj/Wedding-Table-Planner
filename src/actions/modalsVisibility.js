import * as actionTypes from "./actionTypes";

export const editRectangularModalVisibility = (id, visible) => {
  return {
    type: actionTypes.EDIT_RECTANGULAR_MODAL_VISIBILITY,
    id: id,
    visible: visible
  };
};

export const editSaveCheckModalVisibility = (visible, leaveHandler, saved) => {
  return {
    type: actionTypes.EDIT_SAVE_CHECK_MODAL_VISIBILITY,
    visible: visible,
    leaveHandler: leaveHandler,
  };
};

export const showNewProjectModal = () => {
  return {
    type: actionTypes.SHOW_NEWPROJECT_MODAL,
  };
};

export const hideNewProjectModal = () => {
  return {
    type: actionTypes.HIDE_NEWPROJECT_MODAL,
  };
};

export const editRoundModalVisibility = (id, visible) => {
  return {
    type: actionTypes.EDIT_ROUND_MODAL_VISIBILITY,
    visible: visible,
    id: id
  };
};


