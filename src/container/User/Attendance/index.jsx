import React from 'react';
import './index.less'
import Table from './AttendanceTable'
class Attendance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attendance: '考勤'
        }
    }

    render() {
        return(
            <div className={'attendance_body'}>
                <div className={'attendance_title'}>
                    职员考勤
                </div>
                <Table />
            </div>
        )
    }
}
export default Attendance;