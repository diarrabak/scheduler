import { useReducer, useEffect } from "react";

import axios from "axios";
const API_URL = "http://localhost:8001/api"; //For actual API

/*Uncomment for testing*/

// import axios from "__mocks__/axios";
// const API_URL="/api";

/************** */

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  //Sometimes action is destructured directly {type, value}
  switch (action.type) {
    case SET_DAY:
      return { ...state, ...action.value }; //Value is an object value:{day:"current day"}, so spread operator is used

    case SET_APPLICATION_DATA:
      return { ...state, ...action.value }; //Value contains, days,interviewers and appointments objects

    case SET_INTERVIEW:
      return {
        ...state,
        ...action.value,
      }; //Value conatains days and appointments
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = (initialState) => {
  //All the states put in one object calles "state" to make the code more readable
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = (day) => dispatch({ type: SET_DAY, value: { day } });

  useEffect(() => {
    //This hook render state values based on user defined conditions, here when browser loads
    Promise.all([
      axios.get(`${API_URL}/days`),
      axios.get(`${API_URL}/appointments`),
      axios.get(`${API_URL}/interviewers`),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        },
      });

      /*Commented for testing*/

      // var myWebSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

      // myWebSocket.onopen = function (event) {
      //   myWebSocket.send("Ping!");
      // };
      // myWebSocket.onmessage = function (event) {
      //   console.log(event.data);
      // };
      
      /* End comment for testing*/

    });
  }, []); //Empty condtions mean when browser loads the very first time

  function bookInterview(id, interview) {
    return (
      axios
        .put(`${API_URL}/appointments/${id}`, { interview })
        // .put(`${API_URL}/appointments`)  //For testing
        .then(() => {
          Promise.all([
            axios.get(`${API_URL}/days`),
            axios.get(`${API_URL}/appointments`),
          ]).then((all) => {
            const [days, appointments] = all;
            dispatch({
              type: SET_INTERVIEW,
              value: {
                days: days.data,
                appointments: appointments.data,
              },
            });
          });
        })
    );
  }

  function cancelInterview(id) {
    return (
      axios
        .delete(`${API_URL}/appointments/${id}`, { interview: null })
        // .delete(`${API_URL}/appointments`) // For the testing
        .then(() => {
          Promise.all([
            axios.get(`${API_URL}/days`),
            axios.get(`${API_URL}/appointments`),
          ]).then((all) => {
            const [days, appointments] = all;
            dispatch({
              type: SET_INTERVIEW,
              value: {
                days: days.data,
                appointments: appointments.data,
              },
            });
          });
        })
    );
  }
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
