import React from 'react';
import Button from '../button';
import Select from '../select';

import './index.scss';

const Toolbar = props => {
  return (
    <div className="toolbar-wrapper">
      <div className="toolbar-left">
        <Button>Home</Button>
      </div>
      <div className="toolbar-rigth">
        <Select options={[
          { value: 'item1', label: 'Item1' },
          { value: 'item2', label: 'Item2' },
          { value: 'item3', label: 'Item3' }
        ]} />
        <Button>Back</Button>
      </div>
    </div>
  );
}

export default Toolbar;
