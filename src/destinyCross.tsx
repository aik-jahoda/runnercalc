import * as React from 'react';
import * as moment from 'moment';
import { NameNumerology } from './engine/numerologyName'
import { string, object, number } from 'prop-types';
import { getMessage } from './engine/numberExplanation';
import { getNumberFromText } from './engine/alphabet';

interface DestinyCrossProps {
        name: string
}

interface DestinyCrossState {
        firstName: string,
        lastName: string
}

function createMessage(n: number) {
        return <div>{n}: {getMessage(n)}</div>
}

function numberInCircle(n: number) {
        return <span className="circle">{n}</span>
}

function nameElemet(name: {
        name: string;
        reducedNumber: number;
        rawNumber: number;
        initialLetterNumber: number;
}) {

        return <table>
                <tr>
                        <td style={{ textAlign: "center" }}>{name.initialLetterNumber}</td>
                </tr>
                <tr>
                        <td>{name.name}</td>
                </tr>
        </table>
}

export class DestinyCross extends React.Component<DestinyCrossProps, DestinyCrossState> {

        render() {
                const result = NameNumerology.analyse(this.props.name);
                const sentences = Array.from(new Set(
                        [
                                result.firstCoordinate,
                                result.secondCoordinate,
                                result.thirdCoordinate,
                                result.destinyNumber,
                                result.east,
                                result.west,
                                result.south
                        ].filter((x) => x !== 0).sort()));
                return (<div>
                        <table style={{ textAlign: "center" }}>
                                <tr>
                                        <td >
                                                <div>{numberInCircle(result.destinyNumber)}</div>
                                        </td>
                                </tr>
                                <tr><td >
                                        <table>
                                                <tr>
                                                        <td rowSpan={2}>{numberInCircle(result.west)}</td>
                                                        <td style={{
                                                                display: "flex",
                                                                borderBottom: "1px solid black"
                                                        }}>{result.nameNumbers.map((x) => nameElemet(x))}</td>
                                                        <td rowSpan={2}>{numberInCircle(result.east)}</td>
                                                </tr>
                                        </table>

                                </td></tr>
                                <tr><td >
                                        <div>{result.firstCoordinate}</div>
                                        <div>{result.secondCoordinate}</div>
                                        <div>{result.thirdCoordinate}</div>
                                        <div>{numberInCircle(result.south)}</div>
                                </td></tr>
                        </table >

                        <div>{sentences.map(createMessage)}</div>
                </div>
                );

        }
}
