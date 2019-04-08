import * as React from "react";
import { NameNumerology, NameBreakDown } from "../src/engine/numerologyName";
import { getMessage, MessageType } from "../src/engine/numberExplanation";
import { getNumberFromText } from "../src/engine/alphabet";
import * as d3 from "d3";

interface DestinyCrossProps {
  name: string[];
}

interface DestinyCrossState {
  firstName: string;
  lastName: string;
}

function createMessage(n: number) {
  const message = getMessage(n);
  const messageTypeToColor = (type: MessageType) => {
    switch (type) {
      case MessageType.neutral:
        return undefined;
      case MessageType.positive:
        return "green";
      case MessageType.negative:
        return "red";
    }
  };
  return (
    <p key={n} style={{ color: messageTypeToColor(message.type) }}>
      {message.id}: {message.text}
    </p>
  );
}

export class DestinyCross extends React.Component<
  DestinyCrossProps,
  DestinyCrossState
> {
  render() {
    const result = NameNumerology.analyse(
      this.props.name.length === 0 ? ["Jan", "Jahoda"] : this.props.name
    );
    const sentences = Array.from(
      new Set(
        [
          result.firstCoordinate,
          result.secondCoordinate,
          result.thirdCoordinate,
          result.destinyNumber,
          result.east,
          result.west,
          result.south
        ].filter(x => x !== 0)
      )
    ).sort((a, b) => a - b);

    type Point = { x: number; y: number };

    type NumberInCyrcleProps = { value: number; point: Point };

    const dangerNumber = [7, 16, 25, 29, 34, 43, 52, 61, 70, 79, 88, 92];

    const NumberInCircle = ({ value, point }: NumberInCyrcleProps) => (
      <g className="number">
        <circle r="0.7em" cx={point.x} cy={point.y}>
          {" "}
        </circle>
        <text
          className={dangerNumber.indexOf(value) >= 0 ? "dangerNumber" : ""}
          x={point.x}
          y={point.y}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {value}
        </text>
      </g>
    );

    const NumberWithbackground = ({ value, point }: NumberInCyrcleProps) => (
      <g className="numberWithBackground">
        <circle r="0.7em" cx={point.x} cy={point.y}>
          {" "}
        </circle>
        <text
          className={dangerNumber.indexOf(value) >= 0 ? "dangerNumber" : ""}
          x={point.x}
          y={point.y}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {value}
        </text>
      </g>
    );

    const width = 550;
    const height = 550;
    const scaleX = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, width]);
    const scaleY = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, height]);

    const xTopLine = scaleY(30);

    const leftPoint = { x: scaleX(15), y: xTopLine };
    const rightPoint = { x: scaleX(85), y: xTopLine };
    const bottomPoint = { x: scaleX(50), y: scaleY(85) };
    const middlePoint = { x: scaleX(50), y: xTopLine };
    const leftBottomMiddlePoint = { x: scaleX(20), y: scaleY(50) };
    const rightBottomMiddlePoint = { x: scaleX(80), y: scaleY(50) };
    const leftTopMiddlePoint = { x: scaleX(30), y: scaleY(15) };
    const rightTopMiddlePoint = { x: scaleX(70), y: scaleY(15) };
    const topPoint = { x: scaleX(50), y: scaleY(15) };
    const firstCoordinatePoint = { x: scaleX(50), y: scaleY(30) };
    const nameCenterPoint = { x: scaleX(50), y: scaleY(28) };
    const secondCoordinatePoint = { x: scaleX(50), y: scaleY(45) };
    const thirdCoordinatePoint = { x: scaleX(50), y: scaleY(60) };
    const reducedEatWestPoint = {
      x: rightPoint.x + scaleX(5),
      y: rightPoint.y + scaleY(5)
    };
    const reducedNorthSouthPoint = {
      x: bottomPoint.x + scaleX(5),
      y: bottomPoint.y + scaleY(5)
    };
    const mainCoordinatePoint = { x: scaleX(80), y: scaleY(65) };

    type LinePoints = { from: Point; to: Point };

    const Line = ({ from, to }: LinePoints) => (
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
    );

    var bezierLine = d3
      .line()
      .x(function(d) {
        return d[0];
      })
      .y(function(d) {
        return d[1];
      })
      .curve(d3.curveCatmullRom.alpha(0.5));

    const BezierLine = ({ points }: { points: Point[] }) => (
      <path
        d={
          bezierLine(
            points.map<[number, number]>(point => [point.x, point.y])
          ) || ""
        }
      />
    );

    const NameBreakdown = ({
      name,
      position,
      charSpacing
    }: {
      name: NameBreakDown;
      position: Point;
      charSpacing: number;
    }) => {
      const elements = Array.from(name.name).map((ch, i) => (
        <g>
          <text x={charSpacing * i + position.x} y={position.y}>
            {ch}
          </text>
          <text
            x={charSpacing * i + position.x}
            y={position.y + 30}
            className={
              dangerNumber.indexOf(name.nameNumbers[i]) >= 0
                ? "dangerNumber"
                : ""
            }
          >
            {name.nameNumbers[i]}
          </text>
        </g>
      ));

      return <g>{elements}</g>;
    };

    const Name = ({ center }: { center: Point }) => {
      if (result.nameNumbers.length < 1) {
        return <></>;
      }
      const charSpacing = 12;
      const wordSpacing = 30;

      let middleNameLength = 0;
      if (result.nameNumbers.length > 2) {
        middleNameLength =
          result.nameNumbers
            .slice(1, result.nameNumbers.length - 1)
            .reduce((prev, curr) => prev + curr.name.length * charSpacing, 0) +
          (result.nameNumbers.length - 2) * wordSpacing;
      }

      console.log(middleNameLength);
      const origin = {
        x:
          center.x -
          middleNameLength / 2 -
          result.nameNumbers[0].name.length * charSpacing -
          wordSpacing / 2,
        y: center.y
      };

      let currentWordStart = origin.x;
      return (
        <>
          {result.nameNumbers.map((x, i) => {
            const res = (
              <NameBreakdown
                charSpacing={charSpacing}
                name={x}
                position={{ x: currentWordStart, y: origin.y }}
              />
            );
            currentWordStart += x.name.length * charSpacing + wordSpacing;
            return res;
          })}
        </>
      );
    };

    return (
      <div>
        <style>
          {`g.number circle {
        fill:white;
        stroke:black;
        stroke-width: 1;
}

g.numberWithBackground circle {
        fill:white;
        stroke:white;
        stroke-width: 1;
}

.dangerNumber {
   fill: red
}

line, path {
        stroke:black;
        fill:none;
}
`}
        </style>
        <svg viewBox={`0 0 ${width} ${height}`}>
          <Line from={leftPoint} to={rightPoint} />
          <Line from={middlePoint} to={bottomPoint} />
          <Line from={bottomPoint} to={reducedNorthSouthPoint} />
          <BezierLine
            points={[
              reducedEatWestPoint,
              mainCoordinatePoint,
              reducedNorthSouthPoint
            ]}
          />
          <Line from={reducedEatWestPoint} to={rightPoint} />
          <BezierLine
            points={[leftPoint, leftBottomMiddlePoint, bottomPoint]}
          />
          <BezierLine
            points={[rightPoint, rightBottomMiddlePoint, bottomPoint]}
          />
          <BezierLine points={[leftPoint, leftTopMiddlePoint, topPoint]} />
          <BezierLine points={[rightPoint, rightTopMiddlePoint, topPoint]} />
          <NumberInCircle
            value={result.reducedEatWest}
            point={reducedEatWestPoint}
          />
          <NumberInCircle
            value={result.reducedNorthSouth}
            point={reducedNorthSouthPoint}
          />
          <NumberInCircle value={result.destinyNumber} point={topPoint} />
          <NumberInCircle value={result.west} point={leftPoint} />
          <NumberInCircle value={result.east} point={rightPoint} />
          <NumberWithbackground
            value={result.firstCoordinate}
            point={firstCoordinatePoint}
          />
          <NumberInCircle value={result.main} point={mainCoordinatePoint} />
          <NumberWithbackground
            value={result.secondCoordinate}
            point={secondCoordinatePoint}
          />
          <NumberWithbackground
            value={result.thirdCoordinate}
            point={thirdCoordinatePoint}
          />
          <NumberInCircle value={result.south} point={bottomPoint} />
          <Name center={nameCenterPoint} />
        </svg>

        <div>{sentences.map(createMessage)}</div>
      </div>
    );
  }
}
