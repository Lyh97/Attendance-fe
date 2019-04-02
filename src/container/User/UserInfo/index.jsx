import React from 'react';
import './index.less'
import { Table, Tag } from 'antd'
import axios from 'axios'

const { Column } = Table;

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: '职员信息',
            dataSource: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5002/getAttendanceById', {
            params: {
                id: this.getCookie('userId')
            }
        }).then(response => {
            console.log(response.data)
            for(var i = 0; i<response.data.data.length; i++) {
                response.data.data[i]['key'] = i
                response.data.data[i]['attendance_status'] = [response.data.data[i]['attendance_status']]
            }
            this.setState({
                dataSource: response.data.data
            })
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
            <div className='userInfo_body'>
                <h3 className='userInfo_title'>职员信息</h3>
                <Table dataSource={this.state.dataSource} size="middle">
                    <Column
                        title="工号"
                        dataIndex="user_id"
                        key="user_id"
                    />
                    <Column
                        title="姓名"
                        dataIndex="user_name"
                        key="user_name"
                        
                    />
                    <Column
                        title="签到日期"
                        dataIndex="attendance_time"
                        key="attendance_time"
                        sorter={(a, b) => a.time>b.time? 1:-1}
                    />
                    <Column
                        title="签到状态"
                        dataIndex="attendance_status"
                        key="attendance_status"
                        render={attendance_status => (
                            <span>
                                {attendance_status.map(element => element === 'success' ? <Tag color="#87d068" key={element}>{element}</Tag> : <Tag color="#f50" key={element}>{element}</Tag>)}
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}
export default UserInfo;