// This function determines all the appointments of the selected day
export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.filter(
    (currentDay) => currentDay.name === day
  ); //Get all the days (normally there is only one) which name is given as parameter

  if (selectedDay.length === 0) return []; //If this day doesnt not exist, return null

  let appointmentArray = selectedDay[0].appointments; //The id(s) of all the appointements  of that day

  let appointmentObjects = Object.values(state.appointments); //The arrays of all appointments present in the state variable
  let finalAppointments = []; //Choose all the appointments which id was present in the selected day
  for (let id of appointmentArray) {
    finalAppointments = [
      ...finalAppointments,
      ...appointmentObjects.filter((appointment) => appointment.id === id),
    ];
  }
  return finalAppointments;
};

//This function gets all the interviewers of the selected day
export const getInterviewersForDay = (state, day) => {
  const selectedDay = state.days.filter(
    (currentDay) => currentDay.name === day
  );

  if (selectedDay.length === 0) return [];

  let interviewerArray = selectedDay[0].interviewers; //id(s) of all interviewers of this day

  let interviewerObjects = Object.values(state.interviewers);
  let finalInterviewera = [];
  for (let id of interviewerArray) {
    //Get all interviewers whose id is present in the selected day
    finalInterviewera = [
      ...finalInterviewera,
      ...interviewerObjects.filter((interviewer) => interviewer.id === id),
    ];
  }
  return finalInterviewera;
};

//This function changes the format of the interview object. The interviewer id is replaced by the interviewer name and picture
export const getInterview = (state, interview) => {
  let interviewers = Object.values(state.interviewers); //Create an array of interviewers from the objects
  if (interview === null) return null;
  for (let interviewer of interviewers) {
    if (interviewer.id === interview.interviewer) {
      return { ...interview, interviewer }; //Replace interviewer id by more complete information
    }
  }
};
