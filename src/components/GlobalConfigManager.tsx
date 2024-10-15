import React, { useState, useEffect } from 'react';
import { Card, Typography, Form, Input, Button, message } from 'antd';
import { getGlobalConfig, updateGlobalConfig } from '../api/globalConfigApi';

const { Title } = Typography;

const GlobalConfigManager: React.FC = () => {
  const [form] = Form.useForm();
  const [config, setConfig] = useState<Record<string, string>>({
    'kafka.bootstrap.servers': '',
    'zookeeper.connect': '',
    'kafka.connect.url': '',
    'schema.registry.url': '',
  });

  useEffect(() => {
    fetchGlobalConfig();
  }, []);

  const fetchGlobalConfig = async () => {
    try {
      const response = await getGlobalConfig();
      setConfig(prevConfig => ({
        ...prevConfig,
        ...response.config
      }));
      form.setFieldsValue(response.config);
    } catch (error) {
      console.error('Error fetching global config:', error);
      message.error('Failed to fetch global configuration');
    }
  };

  const handleUpdateConfig = async (values: Record<string, string>) => {
    try {
      for (const [key, value] of Object.entries(values)) {
        if (value !== config[key]) {
          await updateGlobalConfig(key, value);
        }
      }
      message.success('Global configuration updated successfully');
      fetchGlobalConfig();
    } catch (error) {
      console.error('Error updating global config:', error);
      message.error('Failed to update global configuration');
    }
  };

  return (
    <Card title={<Title level={2}>Global Configuration Manager</Title>}>
      <Form
        form={form}
        onFinish={handleUpdateConfig}
        layout="vertical"
        initialValues={config}
      >
        <Form.Item name="kafka.bootstrap.servers" label="Kafka Bootstrap Servers">
          <Input />
        </Form.Item>
        <Form.Item name="zookeeper.connect" label="Zookeeper Connect">
          <Input />
        </Form.Item>
        <Form.Item name="kafka.connect.url" label="Kafka Connect URL">
          <Input />
        </Form.Item>
        <Form.Item name="schema.registry.url" label="Schema Registry URL">
          <Input />
        </Form.Item>
        {Object.entries(config)
          .filter(([key]) => !['kafka.bootstrap.servers', 'zookeeper.connect', 'kafka.connect.url', 'schema.registry.url'].includes(key))
          .map(([key]) => (
            <Form.Item key={key} name={key} label={key}>
              <Input />
            </Form.Item>
          ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Configuration
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default GlobalConfigManager;