import React from 'react';
import './index.less'
import { Icon, Button, Tag } from 'antd'
import axios from 'axios'

class Attendance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attendanceData: [],
            name: '吕噶BOOM',
            time: '2019-03-29',
            // status: '已签到',
            status: '未签到',
            // color: '#87d068',
            color: '#f50',
            finished: false
        }
    }

    render() {
        return(
            <div className={'attendance_body'}>
                <div className={'active_box'}>
                    <Button onClick={() => {
                        this.state.finished === false ? this.setState({
                            status: '已签到',
                            color: '#87d068',
                            finished: !this.state.finished
                        }) : this.setState({
                            status: '未签到',
                            color: '#f50',
                            finished: !this.state.finished
                        })
                    }} className={'active_btn'} shape="circle" icon="dingding"></Button>
                    <div className={'detail_box'}>
                        <div className={'detail_name'}>
                            <span className={'name_tag'}><Icon type="user" />姓名</span>
                            <span className={'name_tag2'}>{ this.state.name }</span>
                        </div>
                        <div className={'detail_time'}>
                            <span className={'name_tag'}><Icon type="dashboard" />时间</span>
                            <span className={'name_tag2'}>{ this.state.time }</span>
                        </div>
                        <div className={'detail_status'}>
                            <span className={'name_tag'}><Icon type="alert" />状态</span>
                            <Tag color={this.state.color} className={'name_tag3'}>{ this.state.status }</Tag>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Attendance;