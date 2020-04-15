import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItems(props) {

  const { name, spots, selected, setDay } = props;
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const formatSpots = () => {
    if (spots === 0) return "no spots remaining";
    if (spots === 1) return "1 spot remaining";
    return `${spots} spots remaining`;
  };

  return (
    <li className={dayClass} onClick={setDay}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
