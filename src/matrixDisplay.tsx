import * as React from "react";
import * as moment from "moment";
import Numerology from "../src/engine/numerology";

interface MatrixDisplayProps {
  date: Date;
}

class MatrixDisplay extends React.Component<MatrixDisplayProps, {}> {
  render() {
    let result = Numerology.analyse(this.props.date);

    let mainNumbers = result.mainNumbers || [];
    let computedNumbers = result.countedNumbers ? result.countedNumbers() : [];

    let printNumbers = (array: any, number: number, placeholder = "") => {
      let count = array ? array[number] : undefined;
      let result = "";
      if (count) {
        for (let i = 0; i < count; i++) result += number + " ";
      } else if (!mainNumbers[number]) {
        result = placeholder;
      }
      return result;
    };

    let printMainNumbers = (number: number) => {
      return printNumbers(mainNumbers, number, "╳");
    };

    let printComputedNumbers = (number: number) => {
      return printNumbers(computedNumbers, number);
    };

    return (
      <table className="matrix">
        <tbody>
          <tr>
            <td>
              <div className="main">{printMainNumbers(3)}</div>
              <div className="computed">{printComputedNumbers(3)}</div>
            </td>
            <td>
              <div className="main">{printMainNumbers(6)}</div>
              <div className="computed">{printComputedNumbers(6)}</div>
            </td>
            <td>
              <div className="main">{printMainNumbers(9)}</div>
              <div className="computed">{printComputedNumbers(9)}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="main">{printMainNumbers(2)}</div>
              <div className="computed">{printComputedNumbers(2)}</div>
            </td>
            <td>
              <div className="main">{printMainNumbers(5)}</div>
              <div className="computed">{printComputedNumbers(5)}</div>
            </td>
            <td>
              <div className="main">{printMainNumbers(8)}</div>
              <div className="computed">{printComputedNumbers(8)}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="main">{printMainNumbers(1)}</div>
              <div className="computed">{printComputedNumbers(1)}</div>
            </td>
            <td>
              <div className="main">{printMainNumbers(4)}</div>
              <div className="computed">{printComputedNumbers(4)}</div>
            </td>
            <td>
              <div className="main">{printMainNumbers(7)}</div>
              <div className="computed">{printComputedNumbers(7)}</div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MatrixDisplay;
