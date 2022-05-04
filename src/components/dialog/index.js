import React from 'react';
import Button from '../button';

import './index.scss';

const Dialog = props => {
  const {
    visible,
    onOk,
    onCancel,
    children
  } = props;
  return visible ? (
    <div className="mask">
      <div className="dialog-content">
        {children}
        <div className="button-row">
          { onCancel && <Button type="secondary" onClick={onCancel}>Cancel</Button> }
          <Button onClick={onOk}>OK</Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Dialog;
