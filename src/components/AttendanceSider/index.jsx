import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link, browserHistory } from 'react-router';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class AttendanceSider extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          collapsed: false,
        };
    }

    onCollapse(collapsed) {
        this.setState({ collapsed });
    }

    toPages(param) {
        browserHistory.push({
            pathname:param,
            state: {param : param},
        });
    }

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={ (collapsed) => this.onCollapse(collapsed) }>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={(param) => this.toPages('attendance')}>
                        <Icon type="form" />
                        <span>签到</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={(param) => this.toPages('publicity')}>
                        <Icon type="desktop" />
                        <span>公示</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={(param) => this.toPages('userInfo')}>
                        <Icon type="user" />
                        <span>职员信息</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="user" /><span>User</span></span>}>
                        <Menu.Item key="4">Tom</Menu.Item>
                        <Menu.Item key="5">Bill</Menu.Item>
                        <Menu.Item key="6">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="team" /><span>Team</span></span>}>
                        <Menu.Item key="7">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}
export default AttendanceSider;