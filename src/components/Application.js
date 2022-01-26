import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./appointments/index";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors"; //List of helper functions
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

 
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
          <DayList days={state.days} day={state.day} setDay={setDay} />{" "}
          {/*List of the week days*/}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment, key) => {
          //Updated list of the appointments present in the selected day
          const interview = getInterview(state, appointment.interview); //Change the format of interview field--Add interviewer names
          const tempAppointment = { ...appointment, interview }; //Temporary object to store the updated appointment
          return (
            <Appointment
              key={appointment.id}
              {...tempAppointment}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
      </section>
    </main>
  );
}
