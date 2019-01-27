import * as React from 'react';
import * as moment from 'moment';
import { NameNumerology } from './engine/numerologyName'
import { string, object, number } from 'prop-types';
import { getMessage, MessageType } from './engine/numberExplanation';
import { getNumberFromText } from './engine/alphabet';

interface DestinyCrossProps {
        name: string[]
}

interface DestinyCrossState {
        firstName: string,
        lastName: string
}

function createMessage(n: number) {
        const message = getMessage(n);
        const messageTypeToColor = (type: MessageType) => {
                switch (type) {
                        case MessageType.neutral: return undefined;
                        case MessageType.positive: return "green";
                        case MessageType.negative: return "red";
                }
        }
        return <p key={n} style={{ color: messageTypeToColor(message.type) }}>{message.id}: {message.text}</p>
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
        return <table key={name.rawNumber}>
                <tbody>
                        <tr>
                                <td style={{ textAlign: "center" }}>{name.initialLetterNumber}</td>
                        </tr>
                        <tr>
                                <td>{name.name}</td>
                        </tr>
                </tbody>
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
                        ].filter((x) => x !== 0))).sort((a, b) => a - b);
                return (<div>
                        <table style={{ textAlign: "center" }}>
                                <tbody>
                                        <tr>
                                                <td >
                                                        <div>{numberInCircle(result.destinyNumber)}</div>
                                                </td>
                                        </tr>
                                        <tr><td >
                                                <table>
                                                        <tbody>
                                                                <tr>
                                                                        <td rowSpan={2}>{numberInCircle(result.west)}</td>
                                                                        <td style={{
                                                                                display: "flex",
                                                                                borderBottom: "1px solid black"
                                                                        }}>{result.nameNumbers.map((x) => nameElemet(x))}</td>
                                                                        <td rowSpan={2}>{numberInCircle(result.east)}</td>
                                                                </tr>
                                                        </tbody>
                                                </table>

                                        </td></tr>
                                        <tr><td >
                                                <div>{result.firstCoordinate}</div>
                                                <div>{result.secondCoordinate}</div>
                                                <div>{result.thirdCoordinate}</div>
                                                <div>{numberInCircle(result.south)}</div>
                                        </td></tr>
                                </tbody>
                        </table >

                        <div>{sentences.map(createMessage)}</div>
                </div>
                );

        }
}
