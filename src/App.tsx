import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  OrderedListOutlined,
  SettingOutlined,
  SlidersFilled,
  GlobalOutlined
} from '@ant-design/icons';
import ZookeeperManager from './components/ZookeeperManager';
import KafkaTopicsManager from './components/KafkaTopicsManager';
import KafkaConnectManager from './components/KafkaConnectManager';
import KafkaConfigManager from './components/KafkaConfigManager';
import GlobalConfigManager from './components/GlobalConfigManager';

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} theme="light">
          <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(0, 0, 0, 0.2)' }} />
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<OrderedListOutlined />}>
              <Link to="/zookeeper">Zookeeper</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<OrderedListOutlined />}>
              <Link to="/topics">Kafka Topics</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              <Link to="/connectors">Kafka Connect</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<SlidersFilled />}>
              <Link to="/config">Kafka Config</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<GlobalOutlined />}>
              <Link to="/global-config">Global Config</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <h1 style={{ margin: '0 16px', lineHeight: '64px' }}>Kafka Manager</h1>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<h2>Welcome to Kafka Manager</h2>} />
              <Route path="/zookeeper" element={<ZookeeperManager />} />
              <Route path="/topics" element={<KafkaTopicsManager />} />
              <Route path="/connectors" element={<KafkaConnectManager />} />
              <Route path="/config" element={<KafkaConfigManager />} />
              <Route path="/global-config" element={<GlobalConfigManager />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;