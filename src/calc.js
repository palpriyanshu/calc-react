import React from 'react';
import Keyboard from './keyboard';
import Display from './display';

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currDisplayState: '' };
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleSymbolClick = this.handleSymbolClick.bind(this);
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

  showResult() {
    this.setNumber();
    this.setState((state) => {
      const exp = state.numbers
        .flatMap((num, index) => [num, state.symbols[index]])
        .join('');
      const answer = eval(exp);
      return {
        currDisplayState: answer,
        currNumberState: answer,
        numbers: [],
        symbols: [],
      };
    });
  }

  handleNumberClick(number) {
    this.setDisplayState(number);
    this.setNumberState(number);
  }

  handleSymbolClick(symbol) {
    this.setDisplayState(symbol);
    this.setNumber();
    this.setSymbol(symbol);
  }

  get clickHandlers() {
    return {
      handleNumberClick: this.handleNumberClick,
      handleSymbolClick: this.handleSymbolClick,
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
