/* use for seperation of concerns
useApplicationData Hook will return an object with four keys */

/*TODO 
[] websocket 
[] reducer 
*/
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

function reducer(state, action) {
    switch (action.type) {
        case SET_DAY:
            return {
                ...state,
                day: action.day,
            };
        case SET_APPLICATION_DATA:
            return {
                ...state,
                days: action.days,
                appointments: action.appointments,
                interviewers: action.interviewers,
            };
        case SET_INTERVIEW: {
            return {
                ...state,
                appointments: action.appointments,
            };
        }
        default:
            throw new Error(
                `Tried to reduce with unsupported action type: ${action.type}`
            );
    }
}

export default function useApplicationData() {
    /* The useState (API method) object updates the components state */
    const [state, dispatch] = useReducer(reducer, {
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {},
    });

    /* setDay action can be used to set the current day */
    const setDay = (day) => dispatch({ type: SET_DAY, day });

    /* requests to endpoints for data from db then enqueues changes to state */
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Promise.all([
            axios.get("/api/days"),
            axios.get("/api/appointments"),
            axios.get("/api/interviewers"),
        ])
            .then((all) => {
                const [days, appointments, interviewers] = all; //destruct array
                dispatch({
                    type: SET_APPLICATION_DATA,
                    days: days.data,
                    appointments: appointments.data,
                    interviewers: interviewers.data,
                });
            })
            .catch((error) => console.log(error));
    };

    /* when Appointment component requests to db to save an interview */
    /* bookInterview action makes an HTTP request and updates the local state */
    async function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment,
        };
        // const days = spotsRemaining()
        try {
            await axios.put(`/api/appointments/${id}`, appointment);
            dispatch({ type: SET_INTERVIEW, appointments });
            fetchData();
        } catch (error) {
            return console.log(error);
        }
    }

    /* when Appointment component requests to db to delete an interview */
    /* cancelInterview action makes an HTTP request and updates the local state */
    async function cancelInterview(id) {
        const target = state.appointments[id];
        const appointments = {
            ...state.appointments,
            [id]: { ...target, interview: null },
        };
        try {
            await axios.delete(`api/appointments/${id}`, target);
            dispatch({ type: SET_INTERVIEW, appointments });
            fetchData();
        } catch (error) {
            return console.log(error);
        }
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
