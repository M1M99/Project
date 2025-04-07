import React from 'react';
import { Select, Space } from 'antd';
const handleChange = value => {
    console.log(`selected ${value}`);
};
const Fooo2 = () => (
    <Space wrap style={{ marginLeft: "auto",marginRight:0 }}>
        <Select
            defaultValue="GetAll"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
                { value: 'Top10Car', label: 'GetTop10' },
                { value: 'GetAll', label: 'GetAll' },
            ]}
        />
    </Space>
);
export default Fooo2;