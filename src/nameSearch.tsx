import * as React from 'react';
import { NameNumerology } from './engine/numerologyName'
import { getMessage, MessageType } from './engine/numberExplanation';
import { getNames } from './engine/selectName';
import { DestinyCross } from './destinyCross';

interface NameSearchState {
        minimumPositive: number;
        minimumEdit: string;
        maximumNegative: number;
        maximumEdit: string;
        surname: string;
        selectedName: string[];
        secondName: boolean;
}

export class NameSearch extends React.Component<{}, NameSearchState> {

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        surname: "",
                        minimumPositive: 0,
                        selectedName: [],
                        minimumEdit: "0",
                        maximumNegative: 0,
                        maximumEdit: "0",
                        secondName: false
                }
        }

        surnameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
                event.preventDefault();
                this.setState({ surname: event.target.value });
        }

        positiveChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
                event.preventDefault();
                this.setState({ minimumPositive: Number.parseInt(event.target.value) || 0, minimumEdit: event.target.value });
        }

        negativeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
                event.preventDefault();
                this.setState({ maximumNegative: Number.parseInt(event.target.value) || 0, maximumEdit: event.target.value });
        }

        handleClick = (name: string[], e: any) => {
                e.preventDefault();
                this.setState({ selectedName: name });
        }

        secondNameChnanged = (e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                this.setState({ secondName: e.target.checked });
        }

        render() {

                const searchBox = <div> Příjmení: <input onChange={this.surnameChanged} value={this.state.surname} />
                        Minimum pozitivních: <input onChange={this.positiveChanged} value={this.state.minimumEdit} />
                        Maximum negativních: <input onChange={this.negativeChanged} value={this.state.maximumEdit} />
                        2 jména: <input onChange={this.secondNameChnanged} type="checkbox" checked={this.state.secondName} />
                </div >

                const names = this.state.surname.length > 0 ? getNames(this.state.maximumNegative, this.state.minimumPositive, this.state.surname, this.state.secondName) : [];

                return <div>{searchBox}
                        {names.map((name, index) => (<div key={index}>
                                <a href="#" onClick={(e) => this.handleClick(name, e)}>
                                        {name}</a>
                                {this.state.selectedName === name ? <DestinyCross name={name} /> : undefined}
                        </div>))}
                </div>

        }
}
