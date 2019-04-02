import React from 'react';
import { Table, Divider, Input, Button, Modal } from 'antd';
import './index.less'

class UsersManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: '职员信息',
            visible: false,
            addVisible: false
        }
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

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
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
                <a href="javascript:;">编辑</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
                </span>
            ),
        }];
          
        const data = [{
            id: 10002,
            name: "God",
            password: "RvlMjeFPs2aAhQdo/xt/Kg==",
            age: 32,
            telephone: "15134253541",
            role: "0"
        },
        {
            id: 10003,
            name: "Qi Hongbo",
            password: "RvlMjeFPs2aAhQdo/xt/Kg==",
            age: 23,
            telephone: "18945723323",
            role: "0"
        },
        {
            id: 10005,
            name: "God",
            password: "RvlMjeFPs2aAhQdo/xt/Kg==",
            age: 25,
            telephone: "15134232541",
            role: "0"
        },
        {
            id: 10006,
            name: "Qi Hongbo",
            password: "RvlMjeFPs2aAhQdo/xt/Kg==",
            age: 27,
            telephone: "18945223323",
            role: "0"
        }];

        return(
            <div>
                <div>
                    <h3 style={{ margin: '10px 0px 0px 30px', fontSize: '16.38px', fontWeight: 600, float: 'left' }}>{ this.state.userInfo }</h3>
                    <Button style={{ margin: '10px 30px',float: 'right',zIndex:100 }} type="primary" shape="round" icon="plus" size='default' onClick={() => this.showAddModal()}>添加职员</Button>
                </div>
                <div className='userManage_table_body'>
                    <Table columns={columns} dataSource={data} />
                </div>
                
                <Modal width= '600px' title= {this.state.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                </Modal>

                <Modal width= '600px' title= '添加职员' visible={this.state.addVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div className='addPublicty_body'>
                        
                    </div>
                </Modal>

            </div>
        )
    }
}
export default UsersManage;