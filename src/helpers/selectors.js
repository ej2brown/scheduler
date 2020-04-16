export function getAppointmentsForDay(state, day) {
  const currentDay = state.days.filter((obj) => obj.name === day);
  if (currentDay.length === 0) return [];
  return currentDay[0].appointments.map((id) => state.appointments[id]);
};
