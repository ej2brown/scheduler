/* use for seperation of concerns */
import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

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
        const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
        /* looks for a message from server with 'SET_INTERVIEW' */
        webSocket.onmessage = function (event) {
            const data = JSON.parse(event.data);

            if (data.type === SET_INTERVIEW) {
                return fetchData();
            }
        };
        fetchData();
        return () => webSocket.close();
    }, []);

    const fetchData = () => {
        Promise.all([
            axios.get("/api/days"),
            axios.get("/api/appointments"),
            axios.get("/api/interviewers"),
        ])
            .then(([days, appointments, interviewers]) => {
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
        let action = false;
        if (!state.appointments[id].interview) {
            action = "removeSpot";
        }

        const day = state.day;
        const days = state.days;
        const updatedDay = spotsRemaining(day, days, action);
        try {
            await axios.put(`/api/appointments/${id}`, appointment);
            dispatch({ type: SET_INTERVIEW, appointments, updatedDay });
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
        const day = state.day;
        const days = state.days;
        const addSpot = "addSpot";

        const updatedDay = spotsRemaining(day, days, addSpot);
        try {
            await axios.delete(`api/appointments/${id}`);
            dispatch({ type: SET_INTERVIEW, appointments, updatedDay });
        } catch (error) {
            return console.log(error);
        }
    }

    function spotsRemaining(day, days, action) {
        const selectedDay = days.filter((days) => days.name === day);

        if (action === "addSpot") {
            selectedDay[0].spots += 1;
        } else if (action === "removeSpot") {
            selectedDay[0].spots -= 1;
        }
        return selectedDay[0];
    }

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview,
    };
}
