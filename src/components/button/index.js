import React from 'react';

import './index.scss';

const Button = props => {
  const {
    type = 'primary',
    ...others
  } = props;
  return (
    <button className={`button-wrapper ${type}`} {...others} />
  );
}

export default Button;
