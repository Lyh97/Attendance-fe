import React from 'react';
import { Table, Input, Button, Icon, Tag, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

class AttendanceTable extends React.Component{
    constructor(prop) {
        super(prop);
        this.state = {
            searchText: '',
            data: []
        }
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
            }) => (
            <div style={{ padding: 8 }}>
            <Input
                ref={node => { this.searchInput = node; }}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)}
                icon="search" size="small" style={{ width: 90, marginRight: 8 }} >
                Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
            setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]} autoEscape textToHighlight={text.toString()} />
        ),
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    rejectAttendance(params, status) {
        axios.get('http://localhost:5002/updateAttendanceStatusById',
        { params: { id:params.id, status: status }}).then((response) => {
            if(response.data.status === 200) {
                if(status === 'success')
                    message.success('驳回成功', 3);
                else
                    message.success('恢复成功', 3);
                this.props.initData();
            }
        })
    }

    render() {
        const columns = [
        {
            title: '员工号',
            dataIndex: 'user_id',
            key: 'user_id',
            width: '25%',
            ...this.getColumnSearchProps('user_id'),
        }, 
          {
            title: '姓名',
            dataIndex: 'user_name',
            key: 'user_name',
            width: '25%',
            ...this.getColumnSearchProps('user_name'),
          }, {
            title: '打卡时间',
            dataIndex: 'attendance_time',
            key: 'attendance_time',
            width: '25%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => new Date(a.attendance_time)>(b.attendance_time)? 1:-1,
          }, {
            title: '打卡状态',
            dataIndex: 'attendance_status',
            filters: [{
                text: '签到成功',
                value: 'success',
            }, {
                text: '签到失败',
                value: 'fail',
            }],
            key: 'attendance_status',
            onFilter: (value, record) => record.attendance_status.indexOf(value) === 0,
            render: attendance_status => (
                <span>
                    <Tag color={attendance_status==='success'?'green':'red'} key={attendance_status}>{attendance_status.toUpperCase()}</Tag>
                </span>
            )
          }, {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (text, record) => (
                record.attendance_status === 'success'? (
                    <div>
                        {/* <Button type="primary" size="small" style={{ marginRight: '10px'}}>编辑</Button> */}
                        <Popconfirm title="确定要驳回?" onConfirm={() => this.rejectAttendance(record, 'fail')}>
                            <Button type="danger" size="small">驳回</Button>
                        </Popconfirm>
                    </div>
                ): (
                    <div>
                        {/* <Button type="primary" size="small" style={{ marginRight: '10px'}}>编辑</Button> */}
                        <Button type="primary" onClick={() => this.rejectAttendance(record, 'success')} size="small">恢复</Button>
                    </div>
                )
            )
          },
        ];
        return (
            <Table columns={columns} dataSource={this.props.tableData} size="small" scroll={{ x: 1000 }} />
        )
    }
}
export default AttendanceTable;