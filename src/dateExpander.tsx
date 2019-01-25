import * as React from 'react';
import * as moment from 'moment';
import Numerology from './numerology'

interface DisplayProps {
    date: Date
}

class Display extends React.Component<DisplayProps, {}> {

    render() {
        let result = Numerology.analyse(this.props.date);

        let countedRows: any[] = []
        let maxCounted = Math.max(result.dayCounted.length, result.yearCounted.length);

        let sumCounted = Numerology.reduceNumber(result.sum);
        for (let i = maxCounted - 1; i >= 0; i--) {
            countedRows.push(
                <tr>
                    <td>{result.dayCounted[i]}</td>
                    <td>{/*result.monthCounted[i]*/}</td>
                    <td>{result.yearCounted[i]}</td>
                </tr>)
        }

        return (<table className="dateExpander">
            <tbody>
                {countedRows}
                <tr>
                    <td><span className="main">{result.day}.</span></td>
                    <td><span className="main">{result.month}.</span></td>
                    <td><span className="main">{result.year} </span></td>
                    <td><span className="main">=</span></td>
                    <td><span className="main">{result.sum} / {result.isKingNumber() ? "king" : result.sumCounted.join("->")}</span></td>
                </tr>
            </tbody>
        </table>)

    }
}

export default Display;