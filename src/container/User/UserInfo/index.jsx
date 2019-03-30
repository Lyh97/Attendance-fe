import React from 'react';
import './index.less'
import { Table, Tag } from 'antd'

const { Column } = Table;

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: '职员信息',
            dataSource: [
                {
                    key: '1',
                    number: '001',
                    person: '吕嘎BOOM',
                    time: '2018-3-30',
                    status: ['未签到']
                },
                {
                    key: '2',
                    number: '001',
                    person: '吕嘎BOOM',
                    time: '2018-3-31',
                    status: ['已签到']
                }
            ]
        }
    }

    render() {
        return(
            <div>
                <h2>职员信息</h2>
                <Table dataSource={this.state.dataSource}>
                    <Column
                        title="工号"
                        dataIndex="number"
                        key="number"
                    />
                    <Column
                        title="姓名"
                        dataIndex="person"
                        key="person"
                        
                    />
                    <Column
                        title="签到日期"
                        dataIndex="time"
                        key="time"
                        sorter={(a, b) => a.time>b.time? 1:-1}
                    />
                    <Column
                        title="签到状态"
                        dataIndex="status"
                        key="status"
                        render={status => (
                            <span>
                                {status.map(element => element === '未签到' ? <Tag color="#f50" key={element}>{element}</Tag> : <Tag color="#87d068" key={element}>{element}</Tag>)}
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}
export default UserInfo;