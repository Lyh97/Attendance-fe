import React from 'react';
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Input, Tag, Table, Modal, Button } from 'antd'
import './index.less'
import axios from 'axios'

const { Column } = Table;

class Publicity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            publicity: '公示板',
            editorState: null,
            dataSource: [
                // {
                //     key: '1',
                //     author_name: '吕嘎BOOM',
                //     issue_date: '2018-3-30',
                //     content: '',
                //     title: ['nice']
                // }
            ],
            dialog: false,
            tag: '',
            content: ''
        }
    }

    componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent()
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
        // this.setState({
        //     editorState: BraftEditor.createEditorState(htmlContent)
        // })
        axios.get('http://localhost:5002/getPublicty').then(response => {
            for(var i = 0; i<response.data.data.length; i++) {
                response.data.data[i]['key'] = i
            }
            this.setState({
                dataSource: response.data.data
            })
        })
    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        console.log(htmlContent)
    }

    handleEditorChange = (editorState) => {
        console.log(editorState.toHTML())
        this.setState({ editorState })
    }

    handleOk = () => {
        this.setState({
            dialog: false,
        });
    }
    
    handleCancel = () => {
        this.setState({
            dialog: false,
        });
    }

    render () {
        return (
          <React.Fragment>
            <div className='publicty_body'>
                <h3 className={'public_title'}>
                    公告板
                </h3>
                <div className={'public_con'}>
                    <Table dataSource={this.state.dataSource} size="middle">
                        <Column
                            title="标题"
                            dataIndex="title"
                            key="title"
                            render={title => (
                                <span style={{ cursor: 'pointer', color:'rgb(21, 41, 226)' }}> {title} </span>
                            )}
                            onCellClick={(title) => { 
                                this.setState({
                                    dialog: !this.state.dialog,
                                    tag: title['title'],
                                    context: title['context']
                                })
                            }}
                        />
                        <Column
                            title="发布人"
                            dataIndex="author_name"
                            key="author_name"
                        />
                        <Column
                            title="发布时间"
                            dataIndex="issue_date"
                            key="issue_date"
                            sorter={(a, b) => a.issue_date>b.issue_date? 1:-1}
                        />
                    </Table>
                    <Modal
                        title={this.state.tag}
                        visible={this.state.dialog}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div dangerouslySetInnerHTML={{__html: this.state.content}} />
                    </Modal>
                </div>
            </div>
          </React.Fragment>
        )
    }
}
export default Publicity;