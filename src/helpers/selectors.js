/* returns array of appointments matched for that day */
export function getAppointmentsForDay(state, day) {
  const { days, appointments, interviewers } = state;

  const selectedDay = days.filter((days) => days.name === day); // select day
  const appointmentsForDay =
    selectedDay.length > 0
      ? selectedDay[0].appointments.map(
          (id) => appointments[id] //matches appointments id in days to corresponding appointments key id
        )
      : [];

  return appointmentsForDay;
}

/* returns array of interviews matched for that day */
export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter((obj) => obj.name === day);
  if (selectedDay.length === 0) return [];
  return selectedDay[0].interviewers.map((id) => state.interviewers[id]);
}

/* returns interview object */
export function getInterview(state, interview) {
  if (!interview) return null;
  const { student, interviewer } = interview;
  return { student, interviewer: state.interviewers[interviewer] };
}
