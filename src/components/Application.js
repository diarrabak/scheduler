import React from "react";

import "components/Application.scss";
import { useState , useEffect} from "react";
import DayList from "./DayList";
import Appointment from "./appointments/index";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Adama Kone",
      interviewer: {
        id: 1,
        name: "Assa Sylla",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 4,
    time: "5pm",
    interview: {
      student: "John Serry",
      interviewer: {
        id: 1,
        name: "Gary Young",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


export default function Application(props) {
  let [day, setDay] = useState("Monday");

  let [days, setDays] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8001/api/days").then(response=>setDays(response.data));
  },[]);

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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment,key)=><Appointment key={appointment.id} {...appointment}/>)}
      </section>
    </main>
  );
}
