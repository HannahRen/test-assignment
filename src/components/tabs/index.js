import React from 'react';

import './index.scss';

const Tabs = props => {
  const {
    onChange,
    value,
    children
  } = props;

  return (
    <div className="tabs-wrapper">
      {
        React.Children.map(children, child => {
          if (!React.isValidElement(child)) return;
          return (
            React.cloneElement(child, {
              isActive: child.props.value === value,
              onClick: () => {
                onChange && onChange(child.props.value)
              }
            })
          )
        })
      }
    </div>
  );
}

const Tab = props => {
  const {
    isActive,
    ...others
  } = props;

  return (
    <div className={`tab-wrapper ${isActive ? 'active' : ''}`} {...others} />
  );
}

Tabs.Tab = Tab;

export default Tabs;
