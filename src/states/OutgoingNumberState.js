const ACTION_OUTGOING_NUMBERS = 'OUTGOING_NUMBERS';
const ACTION_SELECTED_OUTGOING_NUMBER = 'SELECTED_OUTGOING_NUMBER';
const ACTION_IS_FETCHED = 'IS_FETCHED';
const ACTION_ERROR = 'ERROR';
const ACTION_LOADING = 'LOADING';

const initialState = {
  outgoingNumbers: [],
  selectedOutgoingNumber: null,
  isFetched: false,
  loading: false,
  error: undefined,
};

export class Actions {
  static setOutgoingNumbers = (outgoingNumbers) => ({ type: ACTION_OUTGOING_NUMBERS, payload: { outgoingNumbers } });
  static setSelectedOutgoingNumber = (selectedOutgoingNumber) => ({ type: ACTION_SELECTED_OUTGOING_NUMBER, payload: { selectedOutgoingNumber } });
  static setFetched = () => ({ type: ACTION_IS_FETCHED, payload: { isFetched: true } });
  static setError = (error) => ({ type: ACTION_ERROR, payload: { error } });
  static setLoading = (loading) => ({ type: ACTION_LOADING, payload: { loading } });
}

export function reduce(state = initialState, action) {
  switch (action.type) {
    case ACTION_OUTGOING_NUMBERS: {
      return {
        ...state,
        outgoingNumbers: action.payload?.outgoingNumbers || [],
      };
    }
    case ACTION_SELECTED_OUTGOING_NUMBER: {
      return {
        ...state,
        selectedOutgoingNumber: action.payload?.selectedOutgoingNumber || null,
      };
    }
    case ACTION_IS_FETCHED: {
      return {
        ...state,
        isFetched: action.payload?.isFetched || false,
      };
    }
    case ACTION_ERROR: {
      return {
        ...state,
        error: action.payload?.error || undefined,
      };
    }
    case ACTION_LOADING: {
      return {
        ...state,
        loading: action.payload?.loading || false,
      };
    }
    default:
      return state;
  }
}
