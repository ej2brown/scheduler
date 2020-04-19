/* use for seperation of concerns
useApplicationData Hook will return an object with four keys */

import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
    /* The state object will maintain the same structure */
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {},
    });

    /* setDay action can be used to set the current day */
    const setDay = (day) => setState({ ...state, day });

    /* requests to endpoints for data from db then enqueues changes to state */
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
                console.log(all);

                const [days, appointments, interviewers] = all;
                setState((prev) => ({
                    ...prev,
                    days: [...days.data],
                    appointments: { ...appointments.data },
                    interviewers: { ...interviewers.data },
                }));
            })
            .catch((error) => console.log(error));
    };

    /* when Appointment component requests to db to save an interview */
    /* bookInterview action makes an HTTP request and updates the local state */
    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment,
        };
        // const days = spotsRemaining()
        return axios
            .put(`/api/appointments/${id}`, appointment)
            .then(() => {
                setState({ ...state, appointments });
                // fetchData()
                fetchData();
            })
            .catch((error) => console.log(error));
    }

    /* when Appointment component requests to db to delete an interview */
    /* cancelInterview action makes an HTTP request and updates the local state */
    function cancelInterview(id) {
        const target = state.appointments[id];
        const appointments = {
            ...state.appointments,
            [id]: { ...target, interview: null },
        };
        return axios({
            method: "DELETE",
            url: `api/appointments/${id}`,
        }).then((result) => {
            setState({ ...state, appointments });
            fetchData();
        });
    }

    // function spotsRemaining(day, days, appointments) {
    //   return axios.get("/api/days").then((data) => {
    // const selectedDay = data.filter((days) => days.name === day);
    // console.log('selectedDay', selectedDay)
    // const appointmentsForDay = selectedDay.filter((interview) => appointments.interview !== null);
    // console.log('appointmentsForDay.length',appointmentsForDay.length)
    //     setState((prev) => ({
    //       ...prev,
    //       days: data[0],
    //     })).catch((error) => console.log(error));
    //     return; //appointmentsForDay.length
    //   });
    // }

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview,
    };
}
