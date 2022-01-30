import DayListItem from "./DayListItem";
import React from "react";

//List of all the days from the database
export default function DayList(props){
const {days,day, setDay}=props;
    return(
      <ul>
          {
             days.map((today,key)=><DayListItem name={today.name} spots={today.spots} selected={today.name===day} setDay={setDay} key={today.id} />)
          }
  
      </ul>
    );
  }
  