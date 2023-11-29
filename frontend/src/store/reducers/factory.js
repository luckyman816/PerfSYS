import { GET_FACTORIES, ADD_FACTORY, DELETE_FACTORY, FACTORY_ERROR } from 'actions/types';
const initialState = {
  factories: [''],
  error: {},
  loading: true
};

function factoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FACTORIES:
      return {
        ...state,
        factories: payload,
        loading: false
      };
    case ADD_FACTORY:
      return {
        ...state,
        factories: [payload, ...state.factories],
        loading: false
      };
    case DELETE_FACTORY:
      return {
        ...state,
        factories: state.factories.filter((factory) => factory._id !== payload),
        loading: false
      };
      case FACTORY_ERROR: {
        return {
            ...state,
            error: payload,
            loading: false
        };
    }
    default:
        return state;
  }
}
export default factoryReducer