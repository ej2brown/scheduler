import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview,  getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  /*requests to endpoints for data*/
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ])
      .then((all) => {
        const [days, appointments, interviewers] = all;
        console.log("all", all);
        setState((oldData) => ({
          ...oldData,
          days: [...days.data],
          appointments: { ...appointments.data },
          interviewers: { ...interviewers.data },
        }));
      })
      .catch((error) => console.log(error));
  };
  
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment )
    .then(() => {
      console.log('SENT PUT REQUEST')
      setState({...state, appointments})
      // fetchData()
    })
    .catch((error) => console.log(error));
  }


  
  

  const { day, days } = state;

  /* transform to reduce interviw data duplication */
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });
  
  /* console.logs to delete */
  console.log("schedule", schedule);
  console.log("appointments", appointments);
  console.log("day", day);
  console.log("days", days);
  console.log("state.interviewers", state.interviewers);

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
          <DayList days={days} day={day} setDay={day => setState(({ ...state, day }))}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <>{schedule}</>
      </section>
    </main>
  );
}
