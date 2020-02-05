import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = ({
  name, inputType, content, controlFunc, placeholder,
}) => (
  <div className="form-group">
    <label
      className="form-label"
      htmlFor={`singleInput_${name}`}
    >
      {name}
    </label>
    <input
      className="form-input"
      id={`singleInput_${name}`}
      name={name}
      type={inputType}
      value={content}
      onChange={controlFunc}
      placeholder={placeholder}
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
  ]),
  placeholder: PropTypes.string,
};

SingleInput.defaultProps = {
  placeholder: '',
  content: '',
};

export default SingleInput;
