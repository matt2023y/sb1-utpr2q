import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Button, Input, Form, message } from 'antd';
import { getKafkaConfig, updateKafkaConfig } from '../api/kafkaConfigApi';

const { Title } = Typography;

const KafkaConfigManager: React.FC = () => {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [form] = Form.useForm();

  useEffect(() => {
    fetchKafkaConfig();
  }, []);

  const fetchKafkaConfig = async () => {
    try {
      const response = await getKafkaConfig();
      setConfig(response.config);
    } catch (error) {
      console.error('Error fetching Kafka config:', error);
      message.error('Failed to fetch Kafka configuration');
    }
  };

  const handleUpdateConfig = async (key: string, value: string) => {
    try {
      await updateKafkaConfig(key, value);
      message.success(`Configuration ${key} updated successfully`);
      fetchKafkaConfig();
    } catch (error) {
      console.error('Error updating Kafka config:', error);
      message.error(`Failed to update configuration ${key}`);
    }
  };

  const handleAddConfig = async (values: { key: string; value: string }) => {
    await handleUpdateConfig(values.key, values.value);
    form.resetFields();
  };

  return (
    <Card title={<Title level={2}>Kafka Configuration Manager</Title>}>
      <Form form={form} onFinish={handleAddConfig} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="key" rules={[{ required: true, message: 'Please input the configuration key!' }]}>
          <Input placeholder="Configuration Key" />
        </Form.Item>
        <Form.Item name="value" rules={[{ required: true, message: 'Please input the configuration value!' }]}>
          <Input placeholder="Configuration Value" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Configuration
          </Button>
        </Form.Item>
      </Form>
      <List
        bordered
        dataSource={Object.entries(config)}
        renderItem={([key, value]) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                onClick={() => {
                  const newValue = prompt(`Enter new value for ${key}:`, value);
                  if (newValue !== null) {
                    handleUpdateConfig(key, newValue);
                  }
                }}
              >
                Edit
              </Button>,
            ]}
          >
            <Typography.Text strong>{key}:</Typography.Text> {value}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default KafkaConfigManager;