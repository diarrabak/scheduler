import React, { useState, useEffect }  from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./appointments/index";
import axios from "axios";    //Data manipulation API
import { getAppointmentsForDay, getInterview , getInterviewersForDay} from "helpers/selectors";   //List of helper functions

export default function Application(props) {    //All the states put in one object calles "state" to make the code more readable
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    setState({ ...state, appointments });  
  }
  
  const setDay = (day) => setState({ ...state, day });  //To set a particular state( here the day, just use the spread operator)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  useEffect(() => {   //This hook render state values based on user defined conditions, here when browser loads
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
  }, []);   //Empty condtions mean when browser loads the very first time
  // console.log(state);
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />   {/*List of the week days*/}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment, key) => {   //Updated list of the appointments present in the selected day
          const interview = getInterview(state, appointment.interview);  //Change the format of interview field--Add interviewer names
          const tempAppointment = { ...appointment, interview };         //Temporary object to store the updated appointment
          return <Appointment key={appointment.id} {...tempAppointment} interviewers={dailyInterviewers} bookInterview={bookInterview}/>;
        })
        }
      </section>
    </main>
  );
}
