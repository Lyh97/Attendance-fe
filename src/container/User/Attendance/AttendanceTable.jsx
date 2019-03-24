import React from 'react';
import { Table, Input, Button, Icon, Tag } from 'antd';
import Highlighter from 'react-highlight-words';

const data = [{
    id: '1001',
    name: 'John Brown',
    date: '2018-12-12',
    status: '签到成功',
  }, {
    id: '1002',
    name: 'Joe Black',
    date: '2018-12-13',
    status: '签到成功',
  }, {
    id: '1003',
    name: 'Jim Green',
    date: '2018-12-14',
    status: '签到成功',
  }, {
    id: '1004',
    name: 'Jim Red',
    date: '2018-12-15',
    status: '签到成功',
  }
];

class AttendanceTable extends React.Component{
    constructor(prop) {
        super(prop);
        this.state = {
            searchText: '',
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

    render() {
        const columns = [
        {
            title: '员工号',
            dataIndex: 'id',
            key: 'id',
            width: '25%',
            ...this.getColumnSearchProps('id'),
        }, 
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            ...this.getColumnSearchProps('name'),
          }, {
            title: '打卡时间',
            dataIndex: 'date',
            key: 'date',
            width: '25%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => new Date(a.date)>(b.date)? 1:-1,
          }, {
            title: '打卡状态',
            dataIndex: 'status',
            filters: [{
                text: 'Yes',
                value: '签到成功',
            }, {
                text: 'No',
                value: 'Error',
            }],
            key: 'status',
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: status => (
                <span>
                    <Tag color={'green'} key={status}>{status.toUpperCase()}</Tag>
                </span>
            )
          }
        ];
        return (
            <Table columns={columns} dataSource={data} size="small" />
        )
    }
}
export default AttendanceTable;