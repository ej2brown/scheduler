import React from "react";

import DayListItem from "./DayListItem.js";

export default function DayList(props) {
  const { days, day, setDay } = props;
  const dayList = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={(event) => setDay(day.name)}
      />
    );
  });

  return (
      <ul>{dayList}</ul>
  );
}
