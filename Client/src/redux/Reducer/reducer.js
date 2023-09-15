import { TYPE } from "../Actions/Actions";

let initialState = {
  userAccess: false,
  update: false,
  //
  access_user: {
    id: "",
    email: "",
    password: "",
    cards: [],
    historyId: [],
    favCards: {
      fav: [],
      filterFav: [],
    },
    details: {
      user_name: "",
      about_me: "",
    },
  },
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_ACCESS:
      return {
        ...state,
        userAccess: true,
        access_user: { ...action.payload },
      };
    case TYPE.ADD_CARD: {
      let TemporallyUser = {
        ...state.access_user,
        cards: [...state.access_user.cards, action.payload],
        historyId: [...state.access_user.historyId, action.payload.id],
      };

      return {
        ...state,
        update: true,
        access_user: TemporallyUser,
      };
    }

    case TYPE.DELETE_CARD: {
      let newCards = state.access_user.cards.filter((el) => {
        return el.id !== action.payload;
      });
      let newhistory = state.access_user.historyId.filter((el) => {
        return el !== action.payload;
      });
      let TemporallyUser = {
        ...state.access_user,
        cards: newCards,
        historyId: newhistory,
      };

      return {
        ...state,
        update: true,
        access_user: TemporallyUser,
      };
    }

    case TYPE.DELETE_ACCESS: {
      return {
        ...state,
        userAccess: false,
        access_user: {
          id: "",
          email: "",
          password: "",
          cards: [],
          historyId: [],
          favCards: {
            fav: [],
            filterFav: [],
          },
          details: {
            user_name: "",
            about_me: "",
          },
        },
      };
    }

    case TYPE.ADD_FAVORITE: {
      let newfavCards = {
        ...state.access_user,
        favCards: {
          ...state.access_user.favCards,
          fav: [...state.access_user.favCards.fav, action.payload],
          filterFav: [...state.access_user.favCards.filterFav, action.payload],
        },
      };
      return { ...state, update: true, access_user: newfavCards };
    }

    case TYPE.DELETE_FAVORITE: {
      let newfavsCards = state.access_user.favCards.fav.filter((el) => {
        return el.id !== action.payload;
      });

      let newfilterCards = state.access_user.favCards.filterFav.filter((el) => {
        return el.id !== action.payload;
      });

      return {
        ...state,
        update: true,
        access_user: {
          ...state.access_user,
          favCards: {
            ...state.access_user.favCards,
            fav: [...newfavsCards],
            filterFav: [...newfilterCards],
          },
        },
      };
    }

    case TYPE.FILTER_FAV: {
      let { Gender, Order } = action.payload;
      let newFav = [...state.access_user.favCards.fav];
      if (Gender) {
        newFav = state.access_user.favCards.fav.filter((el) => {
          return el.gender === Gender;
        });
      }

      if (Order) {
        if (Order === "OrdenA") {
          newFav.sort((a, b) => {
            return a.id - b.id;
          });
        } else if (Order === "OrdenD") {
          newFav.sort((a, b) => {
            return b.id - a.id;
          });
        }
      }

      return {
        ...state,
        access_user: {
          ...state.access_user,
          favCards: {
            ...state.access_user.favCards,
            filterFav: [...newFav],
          },
        },
      };
    }

    case TYPE.UPDATE_USER: {
      return {
        ...state,
        update: false,
      };
    }
    default:
      return state;
  }
};
