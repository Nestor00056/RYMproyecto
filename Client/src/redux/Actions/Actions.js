export const TYPE = {
  ADD_CARD: "ADD_CARD",
  SET_ACCESS: "SET_ACCESS",
  DELETE_ACCESS: "DELETE_ACCESS",
  DELETE_CARD: "DELETE_CARD",
  ADD_NEWUSER: "ADD_NEWUSER",
  ADD_CARD: "ADD_CARD",
  ADD_FAVORITE: "ADD_FAVORITE",
  DELETE_FAVORITE: "DELETE_FAVORITE",
  FILTER_FAV: "FILTER_FAV",
  UPDATE_FAV: "UPDATE_FAV",
  UPDATE_USER: "UPDATE_USER",
};

export const SETACCESS = (User) => {
  return {
    type: TYPE.SET_ACCESS,
    payload: User,
  };
};

export const ADDNEWUSER = (User) => {
  return {
    type: TYPE.ADD_NEWUSER,
    payload: User,
  };
};

export const ADDNEWCARD = (Search) => {
  return async (dispatch) => {
    try {
      let response = await fetch(
        `http://localhost:3000/rickandmorty/character/${Search}`
        /* `https://rickandmortyapi.com/api/character/${Search}` */
      );
      if (!response.ok) {
        throw new Error(
          `Codigo de error ${response.status} texto: ${response.text}`
        );
      }
      let data = await response.json();
      if (data.id) {
        return dispatch({ type: TYPE.ADD_CARD, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const DELETECARD = (Id) => {
  return {
    type: TYPE.DELETE_CARD,
    payload: Id,
  };
};

export const DELETEACCESS = () => {
  return {
    type: TYPE.DELETE_ACCESS,
  };
};

export const AddToFavorites = (data) => {
  return {
    type: TYPE.ADD_FAVORITE,
    payload: data,
  };
};

export const DeleteToFavorites = (Id) => {
  return {
    type: TYPE.DELETE_FAVORITE,
    payload: Id,
  };
};

export const favFilter = (Data) => {
  return {
    type: TYPE.FILTER_FAV,
    payload: Data,
  };
};

export const UpdateUser = () => {
  return {
    type: TYPE.UPDATE_USER,
  };
};
