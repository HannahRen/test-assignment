import React, { useState } from 'react';
import Badge from '../badge';
import Avatar from '../avatar';
import Dialog from '../dialog';

import './index.scss';

const AppBanner = props => {
  const [visible, setVisible] = useState(false);
  const {
    username = "Candidate",
    data = [],
  } = props;

  return (
    <div className="app-banner-wrapper">
      <div className="app-banner-left">
        <img className="logo" src="/prx-logo.svg" alt="Ciena logo" />
        <span>Test Assignment</span>
      </div>
      <div className="app-banner-right">
        <span>Welcome {username}!</span>
        <Badge data={data} />
        <Avatar />
        <span className="logout" onClick={() => setVisible(true)}>Logout</span>
      </div>
      <Dialog
        visible={visible}
        onOk={() => {
          window.location.href = 'https://www.google.com';
        }}
        onCancel={() => setVisible(false)}
      >
        Do you want to logout?
      </Dialog>
    </div>
  );
}

export default AppBanner;
