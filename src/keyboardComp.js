import React from 'react';

const Button = (props) => (
  <div className={props.className} onClick={props.onClick}>
    {props.name}
  </div>
);

const createKeys = function (keys, handleClick) {
  return keys.map((key) => (
    <div id={key} className="button" key={key} onClick={handleClick}>
      {key}
    </div>
  ));
};

const NumericKeys = function (props) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '.'];
  return <div className="numKeys">{createKeys(keys, props.onClick)}</div>;
};

const ArithmeticKeys = function (props) {
  const keys = ['+', '-', '/', '*'];
  return <div className="oprKeys">{createKeys(keys, props.onClick)}</div>;
};

const FunctionalKeys = function (props) {
  return (
    <div className="funcKeys">
      <Button className="button clrBtn" name="clr" onClick={props.setDefault} />
      <Button className="button evalBtn" name="=" onClick={props.showResult} />
    </div>
  );
}

export {
  NumericKeys,
  ArithmeticKeys,
  FunctionalKeys
}