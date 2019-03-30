import React from 'react';
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Input, Tag, Table, Modal, Button } from 'antd'
import './index.less'

const { Column } = Table;

class Publicity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            publicity: '公示板',
            editorState: null,
            dataSource: [
                {
                    key: '1',
                    person: '吕嘎BOOM',
                    time: '2018-3-30',
                    context: '',
                    tags: ['nice']
                }
            ],
            dialog: false,
            tag: '',
            context: ''
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
            <h2>公示信息</h2>
            <div className={'public_con'}>
                <Table dataSource={this.state.dataSource}>
                    <Column
                        title="标题"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <span>
                            {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
                            </span>
                        )}
                        onCellClick={(tags) => { 
                            this.setState({
                                dialog: !this.state.dialog,
                                tag: tags['tags'][0],
                                context: tags['context']
                            })
                        }}
                    />
                    <Column
                        title="发布人"
                        dataIndex="person"
                        key="person"
                    />
                    <Column
                        title="发布时间"
                        dataIndex="time"
                        key="time"
                        sorter={(a, b) => a.time>b.time? 1:-1}
                    />
                </Table>
                <Modal
                    title={this.state.tag}
                    visible={this.state.dialog}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div dangerouslySetInnerHTML={{__html: this.state.context}} />
                </Modal>
            </div>
          </React.Fragment>
        )
    }
}
export default Publicity;