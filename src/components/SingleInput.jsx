import React from 'react';

const SingleInput = props => (
  <div className="form-group">
    <label className="form-label" htmlFor="singleInput">{props.name} </label>
    <input
      className="form-input" id="singleInput"
      name={props.name}
      type={props.inputType}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder}
    />
  </div>
);

SingleInput.propTypes = {
  inputType: React.PropTypes.oneOf(['text', 'password']).isRequired,
  name: React.PropTypes.string.isRequired,
  controlFunc: React.PropTypes.func.isRequired,
  content: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  placeholder: React.PropTypes.string,
};

SingleInput.defaultProps = {
  placeholder: '',
};

export default SingleInput;
