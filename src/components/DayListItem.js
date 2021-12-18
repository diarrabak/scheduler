import React from "react";
import "./DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const {name,spots, selected, setDay } = props;
  const formatSpots=(spots)=>{
      if(spots===0) return "no spots remaining";
      if(spots===1) return `${spots} spot remaining`;
      if(spots>=2)  return `${spots} spots remaining`;
  };
  let dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });
  return (
    <li onClick={()=>setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
