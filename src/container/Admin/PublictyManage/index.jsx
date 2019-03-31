import React from 'react';
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Table, Tag, Input, Button, Modal} from 'antd';
import './index.less'

class PublicityManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            publicity: '公示板',
            editorState: null,
            visible: false,
            title: '',
            content: '',
            addVisible: false
        }
    }

    componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent()
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
        // this.setState({
        //     editorState: BraftEditor.createEditorState(htmlContent)
        // })
    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        console.log(htmlContent)
    }

    handleEditorChange = (editorState) => {
        console.log(editorState.toHTML());
        this.setState({ editorState });
    }

    showModal = (params) => {
        console.log(params)
        this.setState({
            visible: true,
            title: params.title,
            content: params.content
        });
    }

    updatePublictyStatus(params) {
        console.log(params);
    }

    deletePublicty(params) {
        console.log('delete');
        console.log(params);
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

    render () {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            className: 'publicty_table_content',
            width: 300,
            render: (text, record) => <a onClick={() => this.showModal(record)}>{text}</a>,
        }, {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
            className: 'publicty_table_content',
            width: 500
        }, {
            title: '发布时间',
            dataIndex: 'issue_date',
            key: 'issue_date',
            sorter: (a, b) => new Date(a.issue_date)>(b.issue_date)? 1:-1,
            sortDirections: ['descend', 'ascend'],
            width: 300,
        }, {
            title: '发布状态',
            key: 'status',
            dataIndex: 'status',
            render: status => (
                <span>
                    <Tag color={status==1 ? 'green' : 'volcano'} key={status}>{status === 1?'已发布':'未发布'}</Tag>
                </span>
            ),
            width: 100,
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.updatePublictyStatus(record)}> 撤回 {record.name}</a> |
                    <a onClick={() => this.deletePublicty(record)}> 删除 {record.name}</a>
                </span>
            ),
            width: 150
        }];
          
        const data = [{
            id: '1',
            title: 'John Brown',
            content: 'New York No. 1 Lake Park',
            issue_date: '2019-03-26',
            status: 1   
        }, {
            id: '2',
            title: 'Jim Green',
            content: '<div style="color: red">London No. 1 Lake Park London No.</div>1 Lake Park London No. 1 Lake Park London No. 1 Lake ParkLondon No. <div>1 Lake Park London No.</div>London No. 1 Lake Park London No. \n London No. 1 Lake Park London No. \n London No. 1 Lake Park London No. \n London No. 1 Lake Park London No. \n London No. 1 Lake Park London No. \n London No. 1 Lake Park London No. \n London No. 1 Lake Park London No. \n London No. 1 Lake Park London No. \n London No. 1 Lake Park London No. \n ',
            issue_date: '2019-03-27',
            status: 1
        }, {
            id: '3',
            title: 'Joe Black',
            content: 'Sidney No. 1 Lake Park',
            issue_date: '2019-03-28',
            status: 0
        }];

        return (
          <React.Fragment>
            <div>
                <h3 style={{ margin: '20px 0px 0px 30px', fontSize: '16.38px', fontWeight: 600, float: 'left' }}>公告信息管理</h3>
                <Button style={{ margin: '20px 30px',float: 'right',zIndex:100 }} type="primary" shape="round" icon="plus" size='default' onClick={() => this.showAddModal()}>添加公告</Button>
            </div>
            <div className='publicty_manage_table'>
                <Table columns={columns} dataSource={data} size='middle'/>
            </div>
            <Modal width= '800px' style={{ top: 20 }} title= {this.state.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
            </Modal>
            <Modal width= '1000px' style={{ top: 20 }} title= '添加公告' visible={this.state.addVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <div className='addPublicty_body'>
                    <div className={'addPublic_title'}>
                        <h4>标题:</h4>
                        <Input placeholder="填写标题" />
                    </div>
                    <div className={'editor_class'}>
                        <h4>内容:</h4>
                        <BraftEditor
                            className= {"editor_body"}
                            value={this.state.editorState}
                            onChange={this.handleEditorChange}
                            onSave={this.submitContent} />
                    </div>
                </div>
            </Modal>
          </React.Fragment>
        )
    }
}
export default PublicityManage;