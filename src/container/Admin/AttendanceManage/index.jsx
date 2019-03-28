import React from 'react';
import './index.less'
import Table from '../../Admin/AttendanceManage/AttendanceTable'
import axios from 'axios'

class AttendanceManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attendanceData: [],
        }
    }

    componentDidMount() {
        this.initData()
    }

    initData() {
        axios.get('http://localhost:5002/getAllAttendanceByDate', { params:{date: ''} }).then((response)=> {
            this.setState({
                attendanceData: response.data.data
            })
        })
    }
    render() {
        return(
            <div className={'attendancemanage_body'}>
                <h3 className={'attendancemanage_title'}>
                    考勤信息管理
                </h3>
                <Table tableData={this.state.attendanceData} initData={this.initData.bind(this)}/>
            </div>
        )
    }
}
export default AttendanceManage;