import React from 'react';

const Display = (props) => <div className="display"></div>;

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
  }

  render() {
    const keys = this.props.keys;
    return (
      <div className="keyboard">
        <Button className="button clrBtn" name="clr" />
        <Button className="button delBtn" name="del" />
        {keys.map((key) => (
          <div className="button" key={key}>
            {key}
          </div>
        ))}
      </div>
    );
  }
}

class Calc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calc">
        <Display />
        <Keyboard keys={keys} />
      </div>
    );
  }
}

export default Calc;
