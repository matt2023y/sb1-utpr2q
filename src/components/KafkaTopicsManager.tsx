import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Button, Input, Form, message } from 'antd';
import { getTopics, deleteTopic, createTopic } from '../api/kafkaTopicsApi';

const { Title } = Typography;

const KafkaTopicsManager: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await getTopics();
      setTopics(response.topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
      message.error('Failed to fetch topics');
    }
  };

  const handleDeleteTopic = async (topic: string) => {
    try {
      await deleteTopic(topic);
      message.success(`Topic ${topic} deleted successfully`);
      fetchTopics();
    } catch (error) {
      console.error('Error deleting topic:', error);
      message.error(`Failed to delete topic ${topic}`);
    }
  };

  const handleCreateTopic = async (values: { topicName: string }) => {
    try {
      await createTopic(values.topicName);
      message.success(`Topic ${values.topicName} created successfully`);
      form.resetFields();
      fetchTopics();
    } catch (error) {
      console.error('Error creating topic:', error);
      message.error(`Failed to create topic ${values.topicName}`);
    }
  };

  return (
    <Card title={<Title level={2}>Kafka Topics Manager</Title>}>
      <Form form={form} onFinish={handleCreateTopic} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="topicName" rules={[{ required: true, message: 'Please input the topic name!' }]}>
          <Input placeholder="Enter topic name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Topic
          </Button>
        </Form.Item>
      </Form>
      <List
        bordered
        dataSource={topics}
        renderItem={(topic) => (
          <List.Item
            actions={[
              <Button key="delete" danger onClick={() => handleDeleteTopic(topic)}>
                Delete
              </Button>,
            ]}
          >
            {topic}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default KafkaTopicsManager;