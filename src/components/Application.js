import React, { useState } from "react";

import DayList from "components/DayList";

import "components/Application.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


export default function Application(props) {
  const [day, setDay] = useState("Monday");
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      </section>
    </main>
  );
}

/* 
MemeList.js 

import React from 'react';
import Meme from './Meme';


function MemeList(props) {
    console.log(props);
    // [<p>a</p>, <p>b</p>....]
    const memes = props.list.map(meme => <Meme name={meme.name} url={meme.url}/>)
    // for (let meme of memes) {
    //     memes.push(<Meme name={meme.name} url={meme.url}/>)
    //     meme.push(<div>
        //     <h2>{props.name ? props.name : 'Default meme'}</h2>
        //     {props.url && <img className='meme-img' src={props.url} />}
        // </div>)
    // }

    return (
        <div>
            {memes}
        </div>
    )
}

export default MemeList;

*/ 