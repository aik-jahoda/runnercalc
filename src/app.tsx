import * as React from 'react';
import * as moment from 'moment';
import MatrixDisplay from './matrixDisplay'
import { DestinyCross } from './destinyCross'
import DateExpander from './dateExpander'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'

interface AppState {
    date: Date,
    name: string
}

export class App extends React.Component<{}, AppState> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { date: moment().toDate(), name: "" }
    }

    dateChanged = (date: Date) => {
        this.setState({ date: date });
    }

    nameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.setState({ name: event.target.value });
    }

    render() {
        return (<div><h1>Numerology</h1>
            Jméno: <input onChange={this.nameChanged} />
            Datum narození <DatePicker onChange={this.dateChanged} selected={this.state.date} />
            <DestinyCross name={this.state.name} />
            <DateExpander date={this.state.date} />
            <MatrixDisplay date={this.state.date} />
        </div>);
    }
}
