import ActionTypes from '../types'

export const createTodo = (data) => {
  console.log("saving")
  return {
    type: ActionTypes.CREATE_TODO,
    payload: data
  };
}

export const deleteTodo = (data) => {
  console.log("deleteTodo")
  return {
    type: ActionTypes.DELETE_TODO,
    payload: data
  };
}

export const markComplete = (data) => {
  console.log("markComplete")
  return {
    type: ActionTypes.MARK_COMPLETE,
    payload: data
  };
}

export const markIncomplete = (data) => {
  console.log("markIncomplete")
  return {
    type: ActionTypes.MARK_INCOMPLETE,
    payload: data
  };
}