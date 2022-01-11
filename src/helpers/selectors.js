export const getAppointmentsForDay =(state, day)=>{
  const selectedDay = state.days.filter(
    (currentDay) => currentDay.name === day
  );

  if (selectedDay.length === 0) return [];

  let appointmentArray = selectedDay[0].appointments;

  let appointmentObjects = Object.values(state.appointments);
  let finalAppointments = [];
  for (let id of appointmentArray) {
    finalAppointments = [
      ...finalAppointments,
      ...appointmentObjects.filter((appointment) => appointment.id === id),
    ];
  }
  return finalAppointments;
};


export const getInterviewersForDay  =(state, day)=>{
  const selectedDay = state.days.filter(
    (currentDay) => currentDay.name === day
  );

  if (selectedDay.length === 0) return [];

  let interviewerArray = selectedDay[0].interviewers;

  let interviewerObjects = Object.values(state.interviewers);
  let finalInterviewera = [];
  for (let id of interviewerArray) {
    finalInterviewera = [
      ...finalInterviewera,
      ...interviewerObjects.filter((interviewer) => interviewer.id === id),
    ];
  }
  return finalInterviewera;
};



export const getInterview=(state, interview)=>{

  let interviewers=Object.values(state.interviewers);
  if(interview===null) return null;
  for (let interviewer of interviewers){
    if(interviewer.id===interview.interviewer){
     return {...interview, interviewer}
    } 
  }
}

