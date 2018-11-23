import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Home } from './home/Home';

const myStyle: React.CSSProperties = {
    backgroundColor: 'red',
    border: '1px solid black'
};

interface IMyComponentProps {
    hoho?: string;
}

interface IMyComponentState {
    times?: number;
    value?: any;
}

class App extends React.Component<IMyComponentProps, IMyComponentState> {

    constructor(props: IMyComponentProps) {
        super(props);

        this.state = {
            times : 0,
            value: {}
        };
    }

    public myHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        this.setState({
            times: this.state.times == undefined ? 1 : this.state.times + 1
        });

        from(fetch('https://jsonplaceholder.typicode.com/todos/' + this.state.times)).pipe(
            flatMap(response => response.json())
        ).subscribe(r => {
            this.setState({
                value: r
            });
        });
    };

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <div style={myStyle}>
                    <button onClick={this.myHandler}>Click Me</button>
                    {this.state.times}
                </div>
                {this.state.value.title}


                <Home user={this.state.value} />
            </div>
        );
    }

  public componentWillUnmount() {
    console.log(12)
  }
}

export default App;
