/* displays all components, granular component*/
/* Application component*/
/* builds Appointment */
/* builds Daylist */

/* TODO 
[] remove console.logs 
[] check/add catch errors 
[] paths components to ./ 
[] props object destructor
[] set day 
*/
import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import useApplicationData from "hooks/useApplicationData";
import {
    getAppointmentsForDay,
    getInterview,
    getInterviewersForDay,
} from "../helpers/selectors";

export default function Application(props) {
    const {
        state,
        setDay,
        bookInterview,
        cancelInterview,
    } = useApplicationData();

    /* transform to reduce interviw data duplication */
    const { day, days } = state;
    const interviewers = getInterviewersForDay(state, day);
    const appointments = getAppointmentsForDay(state, day).map(
        (appointment) => {
            return (
                <Appointment
                    key={appointment.id}
                    id={appointment.id}
                    time={appointment.time}
                    interview={getInterview(state, appointment.interview)}
                    interviewers={interviewers}
                    bookInterview={bookInterview}
                    cancelInterview={cancelInterview}
                />
            );
        }
    );

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
                {appointments}
                <Appointment key="last" time="5pm" />
            </section>
        </main>
    );
}
