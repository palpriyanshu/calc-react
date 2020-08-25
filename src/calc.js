import React from 'react';

const Display = (props) => <div className="display">{props.number}</div>;

const Button = (props) => <div className={props.className}>{props.name}</div>;

const keys = [
  '1',
  '2',
  '3',
  '÷',
  '4',
  '5',
  '6',
  'x',
  '7',
  '8',
  '9',
  '+',
  '0',
  '=',
  '%',
  '-',
];

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.concatNumber = this.concatNumber.bind(this);
  }

  concatNumber(e) {
    this.props.handleClick(this.props.number + e.target.innerText);
  }

  createKeyboardBtn() {
    return this.props.keys.map((key, id) => (
      <div className="button" key={id} onClick={this.concatNumber}>
        {key}
      </div>
    ));
  }

  render() {
    return (
      <div className="keyboard">
        <Button className="button clrBtn" name="clr" />
        <Button className="button delBtn" name="del" />
        {this.createKeyboardBtn()}
      </div>
    );
  }
}

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    this.setNumber = this.setNumber.bind(this);
  }

  setNumber(number) {
    this.setState(() => ({ number: Number(number) }));
  }

  render() {
    const { number } = this.state;
    return (
      <div className="calc">
        <Display number={`${number}`} />
        <Keyboard keys={keys} handleClick={this.setNumber} number={number} />
      </div>
    );
  }
}

export default Calc;
