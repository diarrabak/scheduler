import axios from "axios";
import { useState, useEffect } from "react";
const useApplicationData = (initialState) => {
  //All the states put in one object calles "state" to make the code more readable
  const [state, setState] = useState(initialState);

  const setDay = (day) => setState({ ...state, day }); //To set a particular state( here the day, just use the spread operator)

  useEffect(() => {
    //This hook render state values based on user defined conditions, here when browser loads
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      //  console.log(interviewers);
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []); //Empty condtions mean when browser loads the very first time
  // console.log(state);

  function bookInterview(id, interview) {
    // console.log(id, interview);

    const day = state.days.filter((thisDay) =>
      thisDay.appointments.includes(id)
    );  //The day containing the current appointment
    const spots = day[0].spots - 1;  //Decrease the number of spots by 1
    console.log(spots);
    // console.log(appointment);
    axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        axios
          .put(`http://localhost:8001/api/days/${day[0].id}`, { spots }) //update the number of spots of the day
          .then(() => {
            Promise.all([
              axios.get("http://localhost:8001/api/days"),
              axios.get("http://localhost:8001/api/appointments"),
            ]).then((all) => {
              const [days, appointments] = all;
              setState((prev) => ({
                ...prev,
                days: days.data,
                appointments: appointments.data,
              }));
            });
          });
      });
  }

  function cancelInterview(id, interview = null) {
    
    const day = state.days.filter((thisDay) =>
      thisDay.appointments.includes(id)
    );
    const spots = day[0].spots + 1;  //Increase the number of spots by 1
    console.log(day[0]);

    axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        axios
          .put(`http://localhost:8001/api/days/${day[0].id}`, { spots }) //update the number of spots of the day
          .then(() => {
            Promise.all([
              axios.get("http://localhost:8001/api/days"),
              axios.get("http://localhost:8001/api/appointments"),
            ]).then((all) => {
              const [days, appointments] = all;
              setState((prev) => ({
                ...prev,
                days: days.data,
                appointments: appointments.data,
              }));
            });
          });
      });
  }
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
