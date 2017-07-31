import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = props => (
  <div className="form-group">
    <label className="form-label" htmlFor="singleInput">{props.name} </label>
    <input
      className="form-input"
      id="singleInput"
      name={props.name}
      type={props.inputType}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder}
    />
  </div>
);

SingleInput.propTypes = {
  inputType: PropTypes.oneOf(['text', 'password']).isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  placeholder: PropTypes.string,
};

SingleInput.defaultProps = {
  placeholder: '',
};

export default SingleInput;
