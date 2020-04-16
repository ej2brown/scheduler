import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment/index";

import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  /*requests to endpoints for data*/
  
  const fetchData = () => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
    ]).then((all) => {

      const [days, appointments] = all;

      setState((oldData) => ({
        ...oldData,
        days: [...days.data],
        appointments: { ...appointments.data },
      }));
    })
    .catch(error => console.log(error))
  };

  useEffect(() => {
    axios.get("/api/days").then((response) => {
      console.log(response);
      fetchData();
    });
  }, []);

  const { day, days } = state;

  const appointments = getAppointmentsForDay(state, state.day);
  console.log('appointments',appointments); //TODO fix loop 

  return (
    <main className="layout">
      <section className="sidebar">
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
        {appointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
