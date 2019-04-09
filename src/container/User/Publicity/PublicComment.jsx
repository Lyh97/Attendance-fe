import {
    Comment, Avatar, Form, Button, List, Input, message
  } from 'antd';
import moment from 'moment';
import React from 'react';
import axios from 'axios'

const TextArea = Input.TextArea;

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class PublicComment extends React.Component {
    state = {
      comments: [],
      submitting: false,
      value: '',
    }
  
    handleSubmit = () => {
      if (!this.state.value || !this.getCookie('userName')) {
        message.error('请先登录。');
        return;
      }
      
      this.setState({
        submitting: true,
      });
      
      axios.post('http://localhost:5002/addComment', {
          publicId: this.props.publicId,
          userId: this.getCookie('userId'),
          author: this.getCookie('userName'),
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: this.state.value
      }).then(response => {
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
              {
                publicId: this.props.publicId,
                userId: this.getCookie('userId'),
                author: this.getCookie('userName'),
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{this.state.value}</p>,
                datetime: moment().fromNow(),
              },
              ...this.state.comments,
            ],
          });
        }, 1000);
      })
    }

    componentDidMount() {
      
    }

    componentWillReceiveProps() {
      this.setState({
        comments : this.props.comments
      })
    }
  
    //获取cookie
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    handleChange = (e) => {
      this.setState({
        value: e.target.value,
      });
    }
  
    render() {
      const { comments, submitting, value } = this.state;
  
      return (
        <div>
          <Comment
            avatar={(
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            )}
            content={(
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            )}
          />
          {comments.length > 0 && 
            <List
              dataSource={this.state.comments}
              header={`${this.state.comments.length} ${this.state.comments.length > 1 ? 'replies' : 'reply'}`}
              itemLayout="horizontal"
              renderItem={props => <Comment {...props} />}
            />
          }
        </div>
      );
    }
  }
  
  export default PublicComment;