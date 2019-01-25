import * as React from 'react';
import * as moment from 'moment';

interface DateInputProperties {
    value?: Date
    onDateChange?: (value: Date) => void
}

class DateInput extends React.Component<DateInputProperties, {}> {

    onInputChange = (event: React.FormEvent): void => {
        var inputValue: string = (event.target as any).value;
        var newDate = moment(inputValue, "DD.MM.YYYY")
        if (newDate.isValid()) {
            this.props.onDateChange(newDate.toDate());
        }
    }

    render() {
        return <input
            value={this.props.value.toString()}
            onChange={this.onInputChange}
            placeholder="DD.MM.YYYY" />
    }

}

export default DateInput;