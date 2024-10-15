import React, { useState, useEffect } from 'react';
import { Card, Typography, Tag } from 'antd';
import { getZookeeperStatus } from '../api/zookeeperApi';

const { Title } = Typography;

const ZookeeperManager: React.FC = () => {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    fetchZookeeperStatus();
  }, []);

  const fetchZookeeperStatus = async () => {
    try {
      const response = await getZookeeperStatus();
      setStatus(response.status);
    } catch (error) {
      console.error('Error fetching Zookeeper status:', error);
      setStatus('Error');
    }
  };

  return (
    <Card title={<Title level={2}>Zookeeper Manager</Title>}>
      <Title level={4}>Status</Title>
      <Tag color={status === 'OK' ? 'green' : 'red'} style={{ fontSize: '16px' }}>
        {status}
      </Tag>
    </Card>
  );
};

export default ZookeeperManager;