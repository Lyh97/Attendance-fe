import React from 'react';
import './index.less'
import axios from 'axios'

class Attendance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attendanceData: [],
        }
    }

    render() {
        return(
            <div className={'attendance_body'}>
                <h3 className={'attendance_title'}>
                    职员考勤
                </h3>
            </div>
        )
    }
}
export default Attendance;