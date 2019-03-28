import React from 'react';
import img from '../../assert/1.jpg';
import './index.less';
import { Avatar, Row, Col, Layout } from 'antd';

const { Header } = Layout;

class AttendanceHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <Header className="header">
                <Row>
                <Col xs={18}>
                    <div className="logo">
                        {/* 公司考勤系统 */}
                    </div>
                </Col>
                <Col xs={6}>
                    <Avatar size="large" src={img} className="bigAvatar head_icon" />
                </Col>
                </Row>
            </Header>
        )
    }
}
export default AttendanceHeader;