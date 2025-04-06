import React from 'react';
import { Select, Space } from 'antd';
const handleChange = value => {
    console.log(`selected ${value}`);
};
const Fooo2 = () => (
    <Space wrap style={{ marginLeft: "auto",marginRight:0 }}>
        <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
            ]}
        />
    </Space>
);
export default Fooo2;