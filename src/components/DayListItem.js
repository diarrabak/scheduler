import React from "react";
import "./DayListItem.scss";
import classnames from "classnames";

//Display of single day information
export default function DayListItem(props) {
  const {name,spots, selected, setDay } = props;
  const formatSpots=(spot)=>{
      if(spot===0) return "no spots remaining";
      if(spot===1) return `${spot} spot remaining`;
      if(spot>=2)  return `${spot} spots remaining`;
  };
  let dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });
  return (
    <li data-testid="day" onClick={()=>setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
