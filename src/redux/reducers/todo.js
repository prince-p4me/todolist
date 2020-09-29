import ActionTypes from '../types'
let initialState = [
  { header: "Todo's data", data: [] },
  { header: "Completed Todo's", data: [] }
]

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_TODO:
      // state = initialState;
      console.log("saving todo");
      var newState = Object.assign([], state);
      newState[0].data.push(action.payload);
      return newState;
    case ActionTypes.DELETE_TODO:
      // state = initialState;
      var newState = Object.assign([], state);
      for (let i = 0; i < newState[0].data.length; i++) {
        if (action.payload.id == newState[0].data[i].id && action.payload.name == newState[0].data[i].name) {
          newState[0].data.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < newState[1].data.length; i++) {
        if (action.payload.id == newState[1].data[i].id && action.payload.name == newState[1].data[i].name) {
          newState[1].data.splice(i, 1);
          break;
        }
      }
      return newState;
    case ActionTypes.MARK_COMPLETE:
      // state = initialState;
      var newState = Object.assign([], state);
      console.log("MARK_COMPLETE");
      newState[1].data.push(action.payload);
      newState[0].data.splice(newState[0].data.indexOf(action.payload), 1);
      return newState;
    case ActionTypes.MARK_INCOMPLETE:
      // state = initialState;
      var newState = Object.assign([], state);
      console.log("MARK_INCOMPLETE");
      newState[1].data.splice(newState[1].data.indexOf(action.payload), 1);
      newState[0].data.push(action.payload);
      return newState;
    default:
      return state
  }
}