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

    componentDidMount() {
        browserHistory.push({
            pathname: 'attendance'
        })
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

    //获取cookie
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={ (collapsed) => this.onCollapse(collapsed) }>
                <div className="logo" />
                    {this.getCookie('role') === '1' ? (
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" onClick={(param) => this.toPages('attendance')}>
                                <Icon type="form" />
                                <span>签到</span>
                            </Menu.Item>
                            <Menu.Item key="4" onClick={(param) => this.toPages('attendancemanage')}>
                                <Icon type="form" />
                                <span>考勤管理</span>
                            </Menu.Item>
                            <Menu.Item key="5" onClick={(param) => this.toPages('publicitymanage')}>
                                <Icon type="desktop" />
                                <span>公示管理</span>
                            </Menu.Item>
                            <Menu.Item key="6" onClick={(param) => this.toPages('userInfomanage')}>
                                <Icon type="user" />
                                <span>职员信息管理</span>
                            </Menu.Item>
                        </Menu>
                        ):(
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
                        </Menu>
                    )}
            </Sider>
        )
    }
}
export default AttendanceSider;