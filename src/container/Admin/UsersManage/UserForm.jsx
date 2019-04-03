import React from 'react';
import 'antd/dist/antd.css';
import './index.less';
import axios from 'axios';

import {
  Form, Input, Tooltip, Icon, Select, Button,
} from 'antd';

const { Option } = Select;

class UserForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    currency: '1'
  };

  componentDidMount() {
    this.handleReset();
    console.log(this.props.userInfo)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        if(this.props.modalType === 'add') {
          axios.post('http://localhost:5002/addUser', values).then((response) => {
            if(response.data.status === 200) {
              this.handleReset();
              this.props.initData();
            }
          })
        } else if(this.props.modalType === 'update') {
          values['id'] = this.props.userInfo.id
          axios.post('http://localhost:5002/updateUserInfoById', values).then((response) => {
            if(response.data.status === 200) {
              this.handleReset();
              this.props.initData();
            }
          })
        }

      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      currency: '1'
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={(
                <span>
                姓名&nbsp;
                <Tooltip title="你的全称">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            )}
          >
            {getFieldDecorator('name', {initialValue: this.props.userInfo.name}, {
                rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }],
            })(
                <Input />
            )}
        </Form.Item>
        <Form.Item
          label="密码"
        >
          {getFieldDecorator('password', {initialValue: this.props.userInfo.password}, {
            rules: [{
              required: true, message: '请输入你的密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label="确认密码"
        >
          {getFieldDecorator('confirm', {initialValue: this.props.userInfo.password}, {
            rules: [{
              required: true, message: '请再次输入你的密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          label="年龄"
        >
          {getFieldDecorator('age', {initialValue: this.props.userInfo.age}, {
            rules: [{
              required: true, message: '请输入你的年龄!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="头衔"
        >
          { getFieldDecorator('role', {initialValue: this.props.userInfo.role === '1'?'1':'0'}, {
            rules: [{
              required: true, message: '请输入你的头衔!',
            }],
          })(
            <Select
              size= 'small'
              style={{ width: '32%' }}
              onChange={this.handleCurrencyChange}
            >
              <Option value="0">职员</Option>
              <Option value="1">管理员</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="手机号码">
          {getFieldDecorator('telephone', {initialValue: this.props.userInfo.telephone}, {
            rules: [{ required: true, message: '请输入你的手机号码!' },
                    { len: 11, message: '请输入正确的号码位数!' }]
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{float: 'right'}}> { this.props.modalType === 'add'? '提交添加' : '提交编辑'}</Button>
        </Form.Item>
      </Form>
    );
  }
}

const UserForms = Form.create({ name: 'register' })(UserForm);
export default UserForms;