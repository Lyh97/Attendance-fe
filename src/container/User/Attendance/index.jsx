import React from 'react';
import './index.less'
import { Icon, Button, Tag, message } from 'antd'
import axios from 'axios'

class Attendance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attendanceData: [],
            name: '',
            time: '',
            // status: '已签到',
            status: '',
            // color: '#87d068',
            color: '',
            finished: false
        }
    }

    componentDidMount() {
        var date = new Date()
        var time = date.getFullYear() + '-' + (date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDay() >= 10 ? date.getDay() : '0' + date.getDay())
        var name = this.getCookie('userName')
        this.setState({
            time: time,
            name: name
        })
        axios.get('http://localhost:5002/getAttendanceByIdAndDate', {
            params: {
                id: this.getCookie('userId')
            }
        }).then(response => {
            if (response.data.status === 301) {
                this.setState({
                    status: '已签到',
                    color: '#87d068'
                })
            } else if(response.data.status === 200){
                this.setState({
                    status: '未签到',
                    color: '#f50'
                })
            }
        })
    }

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
        return(
            <div className={'attendance_body'}>
                <div className={'active_box'}>
                    <Button onClick={() => {
                        if(this.getCookie('userId') === '' || this.getCookie('userId') === null) {
                            message.error('请先登录。');
                            return;
                        }
                        this.setState({
                            status: '已签到',
                            color: '#87d068',
                        })
                        axios.get('http://localhost:5002/attendance', { 
                            params: {
                                id: this.getCookie('userId')
                            }
                        }).then(response => {
                            console.log(response)
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