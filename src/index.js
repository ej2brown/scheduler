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
