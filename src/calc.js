import React from 'react';
import Keyboard from './keyboard';
import Display from './display';

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currDisplayState: '' };
    this.onNumberClick = this.onNumberClick.bind(this);
    this.onSymbolClick = this.onSymbolClick.bind(this);
    this.showResult = this.showResult.bind(this);
    this.setDefault = this.setDefault.bind(this);
  }

  setDefault() {
    this.setState(() => ({
      currDisplayState: '',
      currNumberState: '',
      numbers: [],
      symbols: [],
    }));
  }

  componentDidMount() {
    this.setDefault();
  }

  setDisplayState(pressedKey) {
    this.setState((state) => {
      return { currDisplayState: state.currDisplayState + pressedKey };
    });
  }

  setNumberState(number) {
    this.setState((state) => {
      return { currNumberState: state.currNumberState + number };
    });
  }

  setNumber() {
    this.setState((state) => {
      const number = state.currNumberState;
      const numbers = number
        ? state.numbers.concat([Number(number)])
        : state.numbers;
      return { numbers, currNumberState: '' };
    });
  }

  setSymbol(symbolPressed) {
    this.setState((state) => {
      const { symbols, numbers, currDisplayState } = state;
      if (symbols.length >= numbers.length) {
        return {
          symbols: symbols.slice(0, -1).concat([symbolPressed]),
          currDisplayState: currDisplayState.slice(0, -2).concat(symbolPressed),
        };
      }
      return { symbols: symbols.concat([symbolPressed]) };
    });
  }

  getResult(state) {
    const expression = state.numbers
      .flatMap((num, index) => [num, state.symbols[index]])
      .join('');
    return eval(expression);
  }

  showResult() {
    this.setNumber();
    this.setState((state) => {
      const result = this.getResult(state);
      return {
        currDisplayState: result,
        currNumberState: result,
        numbers: [],
        symbols: [],
      };
    });
  }

  onNumberClick(event) {
    const number = event.target.id;
    this.setDisplayState(number);
    this.setNumberState(number);
  }

  onSymbolClick(event) {
    const symbol = event.target.id;
    this.setDisplayState(symbol);
    this.setNumber();
    this.setSymbol(symbol);
  }

  get clickHandlers() {
    return {
      onNumberClick: this.onNumberClick,
      onSymbolClick: this.onSymbolClick,
      showResult: this.showResult,
      setDefault: this.setDefault,
    };
  }

  render() {
    const { currDisplayState } = this.state;
    return (
      <div className="calc">
        <Display expression={`${currDisplayState}`} />
        <Keyboard clickHandlers={this.clickHandlers} />
      </div>
    );
  }
}

export default Calc;
