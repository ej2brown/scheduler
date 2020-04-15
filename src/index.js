import React from "react";

import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

// import tweets from "./tweets.json";


ReactDOM.render(<Application />, document.getElementById("root"));

// const tweet = tweets[0];
// console.log(tweet);

// function Tweet(props) {
//   return (
//     <article className="tweet">
//       <header className="tweet__header">
//         <img
//           className="tweet__header-avatar"
//           src={props.avatar}
//           alt="User Avatar"
//         />
//         <h2 className="tweet__header-name" name={props.name}>
//           {props.name}
//         </h2>
//       </header>
//       <main className="tweet__content">
//         <p content={props.content}>{props.content}</p>
//       </main>
//       <footer className="tweet__footer" date={props.date}>
//         {props.date}
//       </footer>
//     </article>
//   );
// }

// ReactDOM.render(
//   <Tweet
//   key={tweet.id}
//   name={tweet.name}
//   avatar={tweet.avatar}
//   content={tweet.content}
//   date={tweet.date}
//   />,
//   document.getElementById("root")
// );

// function TweetList(props) {
//   const tweets = props.tweets.map((tweet) => {
//     return (
//       <Tweet
//       key={tweet.id}
//       name={tweet.name}
//       avatar={tweet.avatar}
//       content={tweet.content}
//       date={tweet.date}
//       />
//     );
//   });

//   return tweets;
// }

// ReactDOM.render(<TweetList tweets={tweets} />, document.getElementById("root"));



/* 

App.js

import React from 'react';
import logo from './logo.svg';
import './App.css';
import MemeList from './Components/MemeList'

const memeList = [
  {name: "Adrian's fresh meme", url: 'https://preview.redd.it/ff3hhsds9ks41.jpg?width=960&crop=smart&auto=webp&s=bf75658ce17a530f610fdc49b772254e6356f145'},
  {name: "WFH", url: "https://cdn.facilityexecutive.com/wp-content/uploads/2020/03/working-from-home-meme-14-300x300-1.jpg"},
  {name: "Trojan Horse", url: "https://i.redd.it/rnxiz3cg5ls41.jpg"},
  {name: "Stack overflow halp", url: "https://preview.redd.it/jd25yqv8xsf31.jpg?width=640&crop=smart&auto=webp&s=9f146e09eed275511b156916db118ec9bb70a2da"},
];


function App() {
  return (
    <div className="App">
      <MemeList list={memeList}/>
    </div>
  );
}

export default App;




*/
