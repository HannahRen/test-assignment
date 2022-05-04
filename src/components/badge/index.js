import React, { useState } from 'react';
import Table from '../table';

import './index.scss';

const columns = [
  { headerName: 'Severity', field: 'condition-severity' },
  { headerName: 'Description', field: 'native-condition-type' },
  { headerName: 'Node Type', field: 'node-type' }
];

const Badge = props => {
  const [visible, setVisible] = useState(false)
  const {
    data = []
  } = props;

  return (
    <div className="badge-wrapper">
      <div className="badge-count" onClick={() => setVisible(true)}>{data.length}</div>
      <svg onClick={() => setVisible(true)} t="1651561546089" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3797" width="25" height="25"><path d="M860.16 773.1712c-58.5728-43.9808-92.16-111.2064-92.16-184.3712l0-153.6c0-128.6656-86.7328-237.4656-204.8-270.9504l0-36.2496c0-42.3424-34.4576-76.8-76.8-76.8s-76.8 34.4576-76.8 76.8l0 36.2496c-118.0672 33.536-204.8 142.2848-204.8 270.9504l0 153.6c0 73.1648-33.5872 140.3392-92.16 184.3712-8.8064 6.6048-12.3904 18.1248-8.9088 28.5696s13.2608 17.5104 24.2688 17.5104l232.96 0c-1.6896 8.3968-2.6112 16.9472-2.6112 25.6 0 70.5536 57.4464 128 128 128s128-57.4464 128-128c0-8.6016-0.8704-17.2032-2.56-25.6l232.96 0c11.008 0 20.7872-7.0656 24.2688-17.5104s-0.1024-21.9648-8.9088-28.5696zM460.8 128c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6l0 26.7776c-8.448-0.768-16.9472-1.1776-25.6-1.1776s-17.152 0.4096-25.6 1.1776l0-26.7776zM563.2 844.8c0 42.3424-34.4576 76.8-76.8 76.8s-76.8-34.4576-76.8-76.8c0-8.7552 1.536-17.408 4.4032-25.6l144.7936 0c2.8672 8.192 4.4032 16.8448 4.4032 25.6zM191.5904 768c13.056-15.8208 24.4224-33.0752 33.7408-51.2512 20.3776-39.8336 30.6688-82.8928 30.6688-127.9488l0-153.6c0-127.0272 103.3728-230.4 230.4-230.4s230.4 103.3728 230.4 230.4l0 153.6c0 45.056 10.3424 88.1152 30.6688 127.9488 9.3184 18.2272 20.6848 35.4304 33.7408 51.2512l-589.6704 0z" p-id="3798"></path></svg>
      { visible &&
        <React.Fragment>
          <div className="popup-wrapper">
            { data.length > 0 ? <Table dataSource={data} columns={columns} /> : 'No data!'}
          </div>
          <div className="mask" onClick={() => setVisible(false)} />
        </React.Fragment>
      }
    </div>
  );
}

export default Badge;
