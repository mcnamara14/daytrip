import React from 'react';
import './RecentEvent.css';

export const RecentEvent = (props) =>  {
  const backgroundImage = {backgroundImage: "url(" + props.image + ")"};

  return (
    <div className="recentEvent">
      <div className="eventImage" style={ backgroundImage } ></div>
      <h3>{props.title}</h3>
      <p>{props.price}</p>
      <p>{props.date}</p>
    </div>
  );
}
export default RecentEvent;


// var sectionStyle = {
//   width: "100%",
//   height: "400px",
//   backgroundImage: "url(" + { Background } + ")"
// };

// class Section extends Component {
//   render() {
//     return (
//       <section style={ sectionStyle }>