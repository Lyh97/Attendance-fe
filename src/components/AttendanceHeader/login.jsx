import React from 'react';
import './index.less'
import { Input, Button, Icon, message, Divider } from 'antd';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Login extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            userName: '',
            password: '',
            userInfo: {}
        }
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount() {
        if(this.getCookie('userId') !== '')
            this.updateUserInfo(this.getCookie('userId'))
    }

    changeUsername(e) {
        this.setState({
            userName: e.target.value
        })
    }
    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin() {
        axios.post('http://localhost:5002/login',
        {   
            userName: this.state.userName,
            password: this.state.password
        }).then((response) => {
            if(response.data.status === 200) {
                message.success('登陆成功', 3);
                this.setCookie('userId', response.data.data.id, 1);
                this.setCookie('userName', response.data.data.name, 1);
                this.setCookie('role', response.data.data.role, 1);
                this.updateUserInfo(this.getCookie('userId'))
                location.reload();
            } else {
                message.error('登陆失败');
            }
        })
    }
    logout() {
        this.setCookie('userId', '', -1);
        this.setCookie('userName', '', -1);
        this.setCookie('role', '', -1);
        this.setState({
            userInfo: []
        })
        browserHistory.push({
            pathname: 'attendance'
        })
        location.reload();
    }
    
    updateUserInfo(userId) {
        axios.get('http://localhost:5002/getUserInfoById',
        {   
            params: { 
                id: userId
            }
        }).then((response) => {
            if(response.data.status === 200) {
                this.setState({ 
                    userInfo: response.data.data
                })
            }
        })
    }

    //设置cookie
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
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

    render() {
            let loginBody = this.getCookie('userId') === ''? (
                <div>
                    <div className='login_info_item'>
                        <span > 员工号 <span style={{ color: 'red' }}>*</span>: </span>
                        <Input style={{ marginTop: '5px'}} placeholder="请输入 员工号" allowClear onChange={ this.changeUsername } />
                    </div>
                    <div className='login_info_item'>
                        <span > 密码 <span style={{ color: 'red' }}>*</span>: </span>
                        <Input.Password style={{ marginTop: '5px'}} placeholder="请输入 密码" allowClear onChange={ this.changePassword } />
                    </div>
                    <div className='login_button'>
                        <Button onClick={() => this.submitLogin()} type="primary">登陆 <Icon type="right-circle" /> </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='user_info_item'>
                        <span className='userinfo_title'> 员工号 : </span> 
                        <span className='userInfo_content'>{ this.state.userInfo.name }</span>
                    </div>
                    <div className='user_info_item'>
                        <span className='userinfo_title'> 年龄 : </span> 
                        <span className='userInfo_content'>{ this.state.userInfo.age }</span> 
                    </div>
                    <div className='user_info_item'>
                        <span className='userinfo_title'> 电话 : </span> 
                        <span className='userInfo_content'>{ this.state.userInfo.telephone }</span>
                    </div>
                    <div className='user_info_item'>
                        <span className='userinfo_title'> 权限 : </span> 
                        <span className='userInfo_content'>{ this.state.userInfo.role === '1'?'管理员':'职员' }</span>
                    </div>

                    <div className='login_button'>
                        <Button onClick={() => this.logout()} type="danger">登出 <Icon type="right-circle" /> </Button>
                    </div>
                </div>
            )
        return (
            <div style={{ width: '250px', height: '250px', color: '#fff'}}>
                { loginBody }
            </div>
        )
    }
}
export default Login;