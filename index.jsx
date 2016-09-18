/** @jsx React.DOM */
'use strict';
var ReactDOM = require('react-dom');

class Time extends React.Component {
  render() {
    var rawHours = this.props.hours;
    var days = Math.floor(rawHours / 24);
    var hours = Math.floor(rawHours % 24);
    var rawMinutes = rawHours % 1;
    var minutes = Math.floor(rawMinutes * 60);
    var seconds = (rawMinutes * 60) % 1 * 60;
    return <span> {days > 0 ? days : ""} {hours}:{minutes}:{Math.round(seconds)} </span>;
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.timeChanged = this.timeChanged.bind(this);
    this.distanceChanged = this.distanceChanged.bind(this);
    this.state = { minPerKm: 0, averageSpeed: 0, tenKm: 0 };
  }

  timeChanged(event) {
    this.setState({ time: event.target.value });
    this.compute(event.target.value, this.state.distance);
  }

  distanceChanged(event) {
    this.setState({ distance: event.target.value });
    this.compute(this.state.time, event.target.value);
  }

  compute(time, distance) {
    time = Number(time);
    distance = Number(distance);
    var minPerKm = time * 60 / distance;
    var averageSpeed = distance / time;
    var tenKm = 10 / averageSpeed;
    this.setState({ minPerKm: minPerKm, averageSpeed: averageSpeed, tenKm: tenKm });
  }

  render() {
    return (<div><h1>Computer</h1>
      Time: <input onChange={this.timeChanged} value={this.state.time} /> (h: mm: ss)
      Distance: <input onChange={this.distanceChanged} value={this.state.distance}/> km
      <br />
      <table>
        <tr><td></td><td>{Math.round(this.state.minPerKm * 100) / 100 } min/km</td></tr>
        <tr><td>average speed</td><td>{this.state.averageSpeed} km/h</td></tr>
        <tr><td>10km</td><td><Time hours = {this.state.tenKm} /> (h:mm:ss) </td></tr>
      </table>
    </div>);
  }
}

ReactDOM.render(<App/>, document.getElementById('content'));
