import React from 'react';
import Login from './login'
import img from '../../assert/1.jpg';
import './index.less';
import { Avatar, Row, Col, Layout, Popover } from 'antd';

const { Header } = Layout;

class AttendanceHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        const text = <div className='login_title'> <span>Login</span> </div>;
        const content = ( <Login /> );
        return (
            <Header className="header">
                <Row>
                    <Col xs={18}>
                        <div className="logo">
                            公司考勤系统
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div>
                            <Popover id='login_body' placement="bottomRight" title={text} content={content} trigger="click">
                                <Avatar size="large" src={img} className="bigAvatar head_icon" />
                            </Popover>
                        </div>
                    </Col>
                </Row>
            </Header>
        )
    }
}
export default AttendanceHeader;