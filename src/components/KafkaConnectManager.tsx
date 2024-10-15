import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Button, Input, Form, message } from 'antd';
import { getConnectors, createConnector, pauseConnector, resumeConnector, deleteConnector } from '../api/kafkaConnectApi';

const { Title } = Typography;

const KafkaConnectManager: React.FC = () => {
  const [connectors, setConnectors] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchConnectors();
  }, []);

  const fetchConnectors = async () => {
    try {
      const response = await getConnectors();
      setConnectors(response.connectors);
    } catch (error) {
      console.error('Error fetching connectors:', error);
      message.error('Failed to fetch connectors');
    }
  };

  const handleCreateConnector = async (values: { connectorName: string }) => {
    try {
      await createConnector(values.connectorName);
      message.success(`Connector ${values.connectorName} created successfully`);
      form.resetFields();
      fetchConnectors();
    } catch (error) {
      console.error('Error creating connector:', error);
      message.error(`Failed to create connector ${values.connectorName}`);
    }
  };

  const handlePauseConnector = async (connector: string) => {
    try {
      await pauseConnector(connector);
      message.success(`Connector ${connector} paused successfully`);
      fetchConnectors();
    } catch (error) {
      console.error('Error pausing connector:', error);
      message.error(`Failed to pause connector ${connector}`);
    }
  };

  const handleResumeConnector = async (connector: string) => {
    try {
      await resumeConnector(connector);
      message.success(`Connector ${connector} resumed successfully`);
      fetchConnectors();
    } catch (error) {
      console.error('Error resuming connector:', error);
      message.error(`Failed to resume connector ${connector}`);
    }
  };

  const handleDeleteConnector = async (connector: string) => {
    try {
      await deleteConnector(connector);
      message.success(`Connector ${connector} deleted successfully`);
      fetchConnectors();
    } catch (error) {
      console.error('Error deleting connector:', error);
      message.error(`Failed to delete connector ${connector}`);
    }
  };

  return (
    <Card title={<Title level={2}>Kafka Connect Manager</Title>}>
      <Form form={form} onFinish={handleCreateConnector} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="connectorName" rules={[{ required: true, message: 'Please input the connector name!' }]}>
          <Input placeholder="Enter connector name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Connector
          </Button>
        </Form.Item>
      </Form>
      <List
        bordered
        dataSource={connectors}
        renderItem={(connector) => (
          <List.Item
            actions={[
              <Button key="pause" onClick={() => handlePauseConnector(connector)}>
                Pause
              </Button>,
              <Button key="resume" onClick={() => handleResumeConnector(connector)}>
                Resume
              </Button>,
              <Button key="delete" danger onClick={() => handleDeleteConnector(connector)}>
                Delete
              </Button>,
            ]}
          >
            {connector}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default KafkaConnectManager;