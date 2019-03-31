import React from 'react';
import './index.less'
import Table from '../../Admin/AttendanceManage/AttendanceTable'
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios'

class AttendanceManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attendanceData: [],
            nowDate: ''
        }
    }

    componentDidMount() {
        this.initData('')
    }

    initData(param) {
        axios.get('http://localhost:5002/getAllAttendanceByDate', { params:{date: param} }).then((response)=> {
            let now = this.getToday();
            this.setState({
                attendanceData: response.data.data,
                nowDate: param
            })
        })
    }

    getToday() {
        let date = new Date();
        let month = date.getMonth()<10? '0'+(date.getMonth()+1) : (date.getMonth()+1).toString();
        let day = date.getDate()<10? '0'+date.getDate() : date.getDate().toString();
        return date.getFullYear()+'-'+ month + '-'+ day;
    }

    dateChange = (value) => {
        let date = value._d;
        let month = date.getMonth()<10? '0'+(date.getMonth()+1) : (date.getMonth()+1).toString();
        let day = date.getDate()<10? '0'+date.getDate() : date.getDate().toString();
        this.initData(date.getFullYear()+'-'+ month + '-'+ day);
      }

    render() {
        const dateFormat = 'YYYY-MM-DD';
        let date = ''
        if(this.state.nowDate === '') {
            date = this.getToday();
        } else {
            date = this.state.nowDate;
        }

        return(
            <div className={'attendancemanage_body'}>
                <h3 className={'attendancemanage_title'}>
                    考勤信息管理
                </h3>
                <div className="attendance_date_picker">
                    <DatePicker onChange={this.dateChange} defaultValue={moment( date, dateFormat)} format={dateFormat} />
                </div>
                <Table tableData={this.state.attendanceData} selectedDate={this.state.nowDate} initData={this.initData.bind(this)}/>
            </div>
        )
    }
}
export default AttendanceManage;