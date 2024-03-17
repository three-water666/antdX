/**
 * description: 基本使用
 */
import { Button, Space } from 'antd';
import { NBDialog } from 'antdX';
import React, { useState } from 'react';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  return (
    <div>
      <Space>
        <Button type="primary" onClick={() => setVisible(true)}>
          打开NBDialog
        </Button>
        <Button type="primary" onClick={() => setVisible2(true)}>
          同时打开另一个NBDialog
        </Button>
      </Space>
      <NBDialog
        title="NBDialog"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        NBDialog1
      </NBDialog>
      <NBDialog
        title="NBDialog"
        visible={visible2}
        onCancel={() => setVisible2(false)}
        onOk={() => setVisible2(false)}
      >
        NBDialog2
      </NBDialog>
    </div>
  );
};

export default App;
