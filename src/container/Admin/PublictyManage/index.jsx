import React from 'react';
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Input, Button } from 'antd'
import './index.less'

class PublicityManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            publicity: '公示板',
            editorState: null
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

    render () {
        return (
          <React.Fragment>
            <h3 style={{ margin:"10px", fontWeight:600}}>添加公示</h3>
            <div className='publicty_body'>
                <div className={'public_title'}>
                    <h4>标题:</h4>
                    <Input placeholder="Publicty Title" />
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
            <div className={"operation_buttons"}>
                <Button type="primary">发布</Button>
                <Button type="danger">保存</Button>
            </div>
          </React.Fragment>
        )
    }
}
export default PublicityManage;