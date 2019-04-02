import React from 'react';
import { Table, Divider, Input, Button, Modal } from 'antd';
import UserForms from './UserForm';
import axios from 'axios'
import './index.less'

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
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5002/getAllUserInfo').then((response)=> {
            this.setState({
                data: response.data.data
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
        this.setState({ addVisible: true })
    }

    showUpdateUserInfo(userInfo) {
        this.setState({
            userInfo: userInfo,
            title: userInfo.name,
            visible: true
        })
    }

    render() {
        const columns = [{
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                <a onClick={() => this.showUpdateUserInfo(record)}>编辑</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
                </span>
            ),
        }];

        return(
            <div>
                <div>
                    <h3 style={{ margin: '10px 0px 0px 30px', fontSize: '16.38px', fontWeight: 600, float: 'left' }}>{ this.state.UserInfoTitle }</h3>
                    <Button style={{ margin: '10px 30px',float: 'right',zIndex:100 }} 
                        type="primary" shape="round" icon="plus" size='default' 
                        onClick={() => this.showAddModal()}>添加职员</Button>
                </div>
                <div className='userManage_table_body'>
                    <Table columns={columns} dataSource={this.state.data} />
                </div>

                <Modal width= '600px' title= {this.state.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <div className='addPublicty_body'>
                        <UserForms userInfo={this.state.userInfo}/>
                    </div>
                </Modal>

                <Modal width= '600px' title= '添加职员' visible={this.state.addVisible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <div className='addPublicty_body'>
                        <UserForms userInfo={this.state.params}/>
                    </div>
                </Modal>

            </div>
        )
    }
}
export default UsersManage;