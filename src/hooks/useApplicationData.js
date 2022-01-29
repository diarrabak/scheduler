
import { useReducer, useState, useEffect } from "react";

import axios from "axios";
const API_URL="http://localhost:8001/api";  //For actual API

/*Uncomment for testing*/

// import axios from "__mocks__/axios"; 
// const API_URL="http://localhost:8000/api";  

/************** */

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = (initialState) => {
  //All the states put in one object calles "state" to make the code more readable
  const [state, setState] = useState(initialState);

  const setDay = (day) => setState({ ...state, day }); //To set a particular state( here the day, just use the spread operator)

  useEffect(() => {
    //This hook render state values based on user defined conditions, here when browser loads
    Promise.all([
      axios.get(`${API_URL}/days`),
      axios.get(`${API_URL}/appointments`),
      axios.get(`${API_URL}/interviewers`),

    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      //  console.log(interviewers);
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));

      /*Commented for testing
      var myWebSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

      myWebSocket.onopen = function (event) {
        myWebSocket.send("Ping!");
      };
      myWebSocket.onmessage = function (event) {
        console.log(event.data);
      };*/
    });
  }, []); //Empty condtions mean when browser loads the very first time
  // console.log(state);

  function bookInterview(id, interview) {
    return axios
      .put(`${API_URL}/appointments/${id}`, { interview })
      // .put(`${API_URL}/appointments`)  //For testing
      .then(() => {
        Promise.all([
          axios.get(`${API_URL}/days`),
          axios.get(`${API_URL}/appointments`),
        ]).then((all) => {
          const [days, appointments] = all;
          setState((prev) => ({
            ...prev,
            days: days.data,
            appointments: appointments.data,
          }));
        });
      });
  }

  function cancelInterview(id) {
    return axios
      .delete(`${API_URL}/appointments/${id}`, {
        interviewer: null,
      })
      .then(() => {
        Promise.all([
          axios.get(`${API_URL}/days`),
          axios.get(`${API_URL}/appointments`),
        ]).then((all) => {
          const [days, appointments] = all;
          setState((prev) => ({
            ...prev,
            days: days.data,
            appointments: appointments.data,
          }));
        });
      });
  }
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
