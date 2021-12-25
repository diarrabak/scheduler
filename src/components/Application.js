import React from "react";

import "components/Application.scss";
import { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./appointments/index";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state,state.day);
 
  useEffect(() => {
    Promise
      .all([
        axios.get("http://localhost:8001/api/days"),
        axios.get("http://localhost:8001/api/appointments"),
        axios.get("http://localhost:8001/api/interviewers"),
      ])
      .then((all) => {
        const [days, appointments, interviewers] = all;
      //  console.log(interviewers);
        setState((prev) => ({ ...prev, days:days.data, appointments:appointments.data, interviewers:interviewers.data }));
      });
  }, []);
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment, key) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
