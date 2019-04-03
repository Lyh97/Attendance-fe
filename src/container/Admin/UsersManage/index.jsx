import React from 'react';
import { Table, Divider, Input, Button, Modal } from 'antd';
import UserForms from './UserForm';
import axios from 'axios';
import { exportExcel } from 'xlsx-oc';
import './index.less';

class UsersManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            UserInfoTitle: '职员信息',
            visible: false,
            addVisible: false,
            userInfo: {},
            title: '',
            data: [],
            params: {
                age: 0,
                id: 0,
                name: "",
                password: "",
                role: "",
                telephone: "",
            },
            type: '',
        }
    }

    componentDidMount() {
        this.init()
    }

    init() {
        axios.get('http://localhost:5002/getAllUserInfo').then((response)=> {
            this.setState({
                data: response.data.data,
                addVisible: false,
                visible: false
            })
        })
    }
    handleOk = () => {
        this.setState({ 
            visible: false,
            addVisible: false,
        });
    }

    handleCancel = () => {
        this.setState({ visible: false, addVisible: false });
    }

    showAddModal() {
        this.setState({ addVisible: true, type: 'add' })
    }

    showUpdateUserInfo(userInfo) {
        this.setState({
            userInfo: userInfo,
            title: userInfo.name,
            visible: true, 
            type: 'update'
        })
    }

    deleteUserById(user) {
        axios.get('http://localhost:5002/deleteUserInfoById', { params:{ id:user.id } }).then((response)=> {
            if(response.data.status === 200) {
                this.init();
            }
        })
    }

    exportDefaultExcel() {
        var _headers = [
            { k: 'id', v: '工号' }, 
            { k: 'name', v: '姓名' },
            { k: 'role', v: '权限' }, 
            { k: 'telephone', v: '电话' }
        ]
        exportExcel(_headers, this.state.data);
    }

    render() {
        const columns = [ {
            title: '工号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '电话',
            dataIndex: 'telephone',
            key: 'telephone',
        }, {
            title: 'role',
            key: 'role',
            dataIndex: 'role',
            filters: [{
                text: '职员',
                value: '0',
            }, {
                text: '管理员',
                value: '1',
            }],
            onFilter: (value, record) => record.role.indexOf(value) === 0,
            render: role => (
                <span>
                    {role === '1'?'管理员':'职员'}
                </span>
            ),
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showUpdateUserInfo(record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.deleteUserById(record)}>删除</a>
                </span>
            ),
        }];

        return(
            <div>
                <div>
                    <h3 style={{ margin: '10px 0px 0px 30px', fontSize: '16.38px', fontWeight: 600, float: 'left' }}>{ this.state.UserInfoTitle }</h3>
                    <Button style={{ margin: '10px 30px 0px 0px',float: 'right',zIndex:100 }} 
                        onClick={() => this.exportDefaultExcel()} shape="round" icon="download" size='default'>导出</Button>
                    <Button style={{ margin: '10px',float: 'right',zIndex:100 }} 
                        type="primary" shape="round" icon="plus" size='default' 
                        onClick={() => this.showAddModal()}>添加职员</Button>
                </div>
                <div className='userManage_table_body'>
                    <Table columns={columns} dataSource={this.state.data} size='middle'/>
                </div>

                <Modal width= '600px' title= {this.state.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <div className='addPublicty_body'>
                        <UserForms userInfo={this.state.userInfo} initData= {() => this.init()} modalType={ this.state.type }/>
                    </div>
                </Modal>

                <Modal width= '600px' title= '添加职员' visible={this.state.addVisible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <div className='addPublicty_body'>
                        <UserForms userInfo={this.state.params} initData= {() => this.init()} modalType={ this.state.type }/>
                    </div>
                </Modal>

            </div>
        )
    }
}
export default UsersManage;