import React from 'react';
import './styles/style.less';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Layout, Breadcrumb } from 'antd';
import ADSider from './components/AttendanceSider';
import ADHeader from './components/AttendanceHeader'

import "antd/dist/antd.css";
import Routes from './routes';

const { Content } = Layout;

browserHistory.listen((location) => {
    setTimeout(() => {
        if (location.action === 'POP') return;
        window.scrollTo(0, 0);
    });
});
ReactDOM.render(
    <Layout className={"sys_body"}>
      <ADHeader />
      <Layout>
        <ADSider/>
        <Layout>
          <Content style={{ background: '#fff', margin: 0, minHeight: 400, overflowY: 'auto', margin: '0px' }} >
              <Router history={browserHistory} routes={Routes}/>
          </Content>
        </Layout>
      </Layout>
  </Layout>,
    document.getElementById('root')
);
