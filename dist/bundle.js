/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8090/assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ReactDOM = __webpack_require__(1);
	var React = __webpack_require__(2);
	var Time = (function () {
	    function Time(value) {
	        if (typeof (value) === "string") {
	            this.parseFromString(value);
	        }
	        else if (typeof (value) === "number") {
	            this.parseFromNumber(value);
	        }
	        else {
	            throw Error("Unknown value");
	        }
	    }
	    Time.prototype.parseFromString = function (value) {
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
	    };
	    Time.prototype.parseFromNumber = function (rawHours) {
	        this.days = Math.floor(rawHours / 24);
	        this.hours = Math.floor(rawHours % 24);
	        var rawMinutes = rawHours % 1;
	        this.minutes = Math.floor(rawMinutes * 60);
	        this.seconds = (rawMinutes * 60) % 1 * 60;
	    };
	    Time.prototype.totalHours = function () {
	        return this.hours + this.minutes / 60 + this.seconds / 60 / 100;
	    };
	    Time.prototype.totalMinutes = function () {
	        return this.totalHours() * 60;
	    };
	    Time.prototype.print = function (value) {
	        if (value < 10)
	            return "0" + value;
	        return String(value);
	    };
	    ;
	    Time.prototype.toString = function () {
	        return this.days > 0 ? String(this.days) : "" + " " + this.hours + ":" + this.print(this.minutes) + ":" + this.print(Math.round(this.seconds));
	    };
	    return Time;
	}());
	var DistanceInput = (function (_super) {
	    __extends(DistanceInput, _super);
	    function DistanceInput() {
	        _super.call(this);
	        this.distanceChanged = this.distanceChanged.bind(this);
	        this.unitsChanged = this.unitsChanged.bind(this);
	        this.state = { rawValue: "", multiplier: 1 };
	    }
	    DistanceInput.prototype.distanceChanged = function (event) {
	        var rawValue = event.target.value;
	        this.setState({ rawValue: rawValue });
	        this.computeDistance(Number(rawValue), this.state.multiplier);
	    };
	    DistanceInput.prototype.unitsChanged = function (event) {
	        var multiplier = event.target.value;
	        this.setState({ multiplier: multiplier });
	        this.computeDistance(Number(this.state.rawValue), multiplier);
	    };
	    DistanceInput.prototype.computeDistance = function (distance, multiplier) {
	        var value = distance * multiplier;
	        this.props.onChange(value);
	    };
	    DistanceInput.prototype.render = function () {
	        var error = this.state.error ? this.state.error : "";
	        return (React.createElement("span", null, React.createElement("input", {onChange: this.distanceChanged, value: this.state.rawValue}), React.createElement("select", {onChange: this.unitsChanged}, React.createElement("option", {value: "1"}, "km"), React.createElement("option", {value: "0.001"}, "m"))));
	    };
	    return DistanceInput;
	}(React.Component));
	var TimeInput = (function (_super) {
	    __extends(TimeInput, _super);
	    function TimeInput() {
	        _super.call(this);
	        this.changed = this.changed.bind(this);
	        this.state = { rawTime: "" };
	    }
	    TimeInput.prototype.changed = function (event) {
	        this.setState({ error: undefined });
	        var rawTime = event.target.value;
	        this.setState({ rawTime: rawTime });
	        try {
	            var time = new Time(rawTime);
	            this.props.onChange(time);
	        }
	        catch (err) {
	            this.setState({ error: err.message });
	        }
	    };
	    TimeInput.prototype.render = function () {
	        var error = this.state.error ? this.state.error : "";
	        return React.createElement("span", null, React.createElement("input", {onChange: this.changed, value: this.state.rawTime}), React.createElement("br", null), error);
	    };
	    return TimeInput;
	}(React.Component));
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        _super.call(this);
	        this.timeChanged = this.timeChanged.bind(this);
	        this.distanceChanged = this.distanceChanged.bind(this);
	        this.state = { minPerKm: 0, averageSpeed: 0, tenKm: new Time(0), min12: 0 };
	    }
	    App.prototype.timeChanged = function (value) {
	        this.setState({ time: value });
	        this.compute(value, this.state.distance);
	    };
	    App.prototype.distanceChanged = function (value) {
	        this.setState({ distance: value });
	        this.compute(this.state.time, value);
	    };
	    App.prototype.compute = function (time, distance) {
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
	    };
	    App.prototype.render = function () {
	        return (React.createElement("div", null, React.createElement("h1", null, "Computer"), React.createElement("br", null), React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, "Time: "), React.createElement("td", null, " ", React.createElement(TimeInput, {onChange: this.timeChanged, value: this.state.time}), " (h: mm: ss) ")), React.createElement("tr", null, React.createElement("td", null, "Distance: "), React.createElement("td", null, " ", React.createElement(DistanceInput, {onChange: this.distanceChanged, value: this.state.distance}), " km")), React.createElement("tr", null, React.createElement("td", null, "Pace: "), React.createElement("td", null, Math.round(this.state.minPerKm * 100) / 100, " min/km")), React.createElement("tr", null, React.createElement("td", null, "Speed: "), React.createElement("td", null, Math.round(this.state.averageSpeed), " km/h")), React.createElement("tr", null, React.createElement("td", null, "10km: "), React.createElement("td", null, " ", this.state.tenKm ? this.state.tenKm.toString() : "", " ", "(h:mm:ss)", " ")), React.createElement("tr", null, React.createElement("td", null, "12min: "), React.createElement("td", null, Math.round(this.state.min12 * 1000) / 1000, " km "))))));
	    };
	    return App;
	}(React.Component));
	ReactDOM.render(React.createElement(App, null), document.getElementById('content'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ }
/******/ ]);