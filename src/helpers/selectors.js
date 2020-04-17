/* returns array of appointments matched for that day */
export function getAppointmentsForDay(state, day) {
  const currentDay = state.days.filter((obj) => obj.name === day);
  if (currentDay.length === 0) return [];
  return currentDay[0].appointments.map((id) => state.appointments[id]);
};

/* returns interview object */
export function getInterview(state, interview) {
  if (!interview) return null;
  const { student, interviewer } = interview;
  return { student, interviewer: state.interviewers[interviewer] };
};

