/** @jsx React.DOM */
'use strict';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

class Time {
  constructor(value: string | number) {
    if (typeof (value) === "string") {
      this.parseFromString(value as string);
    } else if (typeof (value) === "number") {
      this.parseFromNumber(value as number);
    } else {
      throw Error("Unknown value");
    }
  }

  days: number;
  seconds: number;
  minutes: number;
  hours: number;

  parseFromString(value: string): void {
    this.days = 0;
    var timeParts = value.split(":");
    if (timeParts.length < 2 || timeParts.length > 3)
      throw Error("Invalide time");
    this.seconds = Number(timeParts.pop());
    if (isNaN(this.seconds))
      throw Error("Seconds are not a number");
    this.minutes = Number(timeParts.pop());
    if (isNaN(this.minutes))
      throw Error("Minutes are not a number");
    this.hours = 0;
    if (timeParts.length > 0) {
      this.hours = Number(timeParts.pop());
      if (isNaN(this.hours))
        throw Error("Hours are not a number");
    }
  }

  parseFromNumber(rawHours: number): void {
    this.days = Math.floor(rawHours / 24);
    this.hours = Math.floor(rawHours % 24);
    var rawMinutes = rawHours % 1;
    this.minutes = Math.floor(rawMinutes * 60);
    this.seconds = (rawMinutes * 60) % 1 * 60;
  }

  totalHours(): number {
    return this.hours + this.minutes / 60 + this.seconds / 60 / 100;
  }

  totalMinutes(): number {
    return this.totalHours() * 60;
  }

  private print(value: number): string {
    if (value < 10)
      return "0" + value;
    return String(value);
  };

  toString(): string {
    return this.days > 0 ? String(this.days) : "" + " " + this.hours + ":" + this.print(this.minutes) + ":" + this.print(Math.round(this.seconds));
  }
}

interface DistanceInputProps {
  onChange: (distance: number) => void,
  value: number
}

interface DistanceInputState {
  rawValue?: string,
  multiplier?: number,
  error?: string
}

class DistanceInput extends React.Component<DistanceInputProps, DistanceInputState> {
  constructor() {
    super();
    this.distanceChanged = this.distanceChanged.bind(this);
    this.unitsChanged = this.unitsChanged.bind(this);

    this.state = { rawValue: "", multiplier: 1 };
  }

  distanceChanged(event: React.FormEvent) {
    var rawValue: string = (event.target as any).value;
    this.setState({ rawValue: rawValue });
    this.computeDistance(Number(rawValue), this.state.multiplier);
  }

  unitsChanged(event: React.FormEvent) {
    var multiplier: number = (event.target as any).value;
    this.setState({ multiplier: multiplier });

    this.computeDistance(Number(this.state.rawValue), multiplier);
  }

  computeDistance(distance: number, multiplier: number) {
    var value = distance * multiplier;
    this.props.onChange(value);
  }

  render() {
    var error = this.state.error ? this.state.error : "";
    return (<span><input onChange={this.distanceChanged} value={this.state.rawValue} />
      <select onChange={this.unitsChanged} >
        <option value="1">km</option>
        <option value="0.001">m</option>
      </select>
    </span>);
  }
}

interface TimeInputProps {
  onChange: (time: Time) => void,
  value: Time
}

interface TimeInputState {
  error?: string,
  rawTime?: string
}

class TimeInput extends React.Component<TimeInputProps, TimeInputState> {
  constructor() {
    super();
    this.changed = this.changed.bind(this);
    this.state = { rawTime: "" };
  }

  changed(event: React.FormEvent) {
    this.setState({ error: undefined });
    var rawTime: string = (event.target as any).value;
    this.setState({ rawTime: rawTime });

    try {
      var time = new Time(rawTime);
      this.props.onChange(time);
    }
    catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    var error = this.state.error ? this.state.error : "";
    return <span><input onChange={this.changed} value={this.state.rawTime} />
      <br/>{error}</span>;
  }
}

interface AppState {
  distance?: number,
  minPerKm?: number,
  averageSpeed?: number,
  tenKm?: Time,
  min12?: number,
  time?: Time
}

class App extends React.Component<{}, AppState> {

  constructor() {
    super();
    this.timeChanged = this.timeChanged.bind(this);
    this.distanceChanged = this.distanceChanged.bind(this);
    this.state = { minPerKm: 0, averageSpeed: 0, tenKm: new Time(0), min12: 0 };
  }

  timeChanged(value: Time) {
    this.setState({ time: value });
    this.compute(value, this.state.distance);
  }

  distanceChanged(value: number) {
    this.setState({ distance: value });
    this.compute(this.state.time, value);
  }

  compute(time: Time, distance: number) {
    var minPerKm = time.totalMinutes() / distance;
    var averageSpeed = distance / time.totalHours();
    var tenKm = new Time(10 / averageSpeed);
    var min12 = averageSpeed / 60 * 12;
    this.setState({
      minPerKm: minPerKm,
      averageSpeed: averageSpeed,
      tenKm: tenKm,
      min12: min12
    });
  }

  render() {
    return (<div><h1>Computer</h1>
      <br />
      <table>
        <tbody>
          <tr><td>Time: </td><td> <TimeInput onChange={this.timeChanged} value={this.state.time} /> (h: mm: ss) </td></tr>
          <tr><td>Distance: </td><td> <DistanceInput onChange={this.distanceChanged} value={this.state.distance}/> km</td></tr>
          <tr><td>Pace: </td><td>{Math.round(this.state.minPerKm * 100) / 100 } min/km</td></tr>
          <tr><td>Speed: </td><td>{Math.round(this.state.averageSpeed) } km/h</td></tr>
          <tr><td>10km: </td><td> {this.state.tenKm ? this.state.tenKm.toString() : ""} {"(h:mm:ss)"} </td></tr>
          <tr><td>12min: </td><td>{Math.round(this.state.min12 * 1000) / 1000} km </td></tr>
        </tbody>
      </table>
    </div>);
  }
}

ReactDOM.render(<App/>, document.getElementById('content'));
