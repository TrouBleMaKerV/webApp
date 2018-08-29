import React, { Component } from 'react';
import 'element-theme-default';
import './css/SchoolInfo.css'
import {Button,Form,Input,Menu} from 'element-react'
import axios from 'axios'
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                userId: 0,
                email : '',
                balance : '',
                introduction: '',
                level: '',
                expend: '',
                username : '',
                birthday : '',
                sex : ''
            },
        };
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    componentWillMount() {
        axios.get(`http://localhost:8080//getUserById`,{
            params :{
                userId : this.props.match.params.userId ,
            }
        })
            .then(res => {
                const form = res.data;
                this.setState({ form });
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    onSelect(e) {
        var userId = this.props.match.params.userId;
        if (e == "1") {
            this.props.history.push('/User/' + userId + '/Main');
        } else if (e == "2-1") {
            this.props.history.push('/User/' + userId + '/OrderType/1');
        } else if (e == "2-2") {
            this.props.history.push('/User/' + userId + '/OrderType/2');
        } else if (e == "2-3") {
            this.props.history.push('/User/' + userId + '/OrderType/3');
        } else if (e == "3") {
            this.props.history.push('/User/' + userId + '/Score');
        } else {
            this.props.history.push('/User/' + userId+'/UserInfo');
        }
    }
    onChangeInfo(){
        var road = '/User/'+this.props.match.params.userId+'/UserInfoModify';
        this.props.history.push(road);
    }
    onChangePassword(){
        var road = '/User/'+this.props.match.params.userId+'/UserChangePassword';
        this.props.history.push(road);
    }
    render() {
        return (
            <div  >
                <Menu theme="dark"  className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">主页</Menu.Item>
                    <Menu.SubMenu index="2" title="我的订单">
                        <Menu.Item index="2-1">已支付</Menu.Item>
                        <Menu.Item index="2-2">未支付</Menu.Item>
                        <Menu.Item index="2-3">已撤销</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item index="3">成绩查看</Menu.Item>
                    <Menu.Item index="4">个人信息</Menu.Item>
                </Menu>
                <br/>
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"   className="form">
                    <Form.Item label="邮箱" prop="email">
                        <label>{ this.state.form.email }</label>
                    </Form.Item>
                    <Form.Item label="余额" prop="balance">
                        <label>{ this.state.form.balance }</label>
                    </Form.Item>
                    <Form.Item label="会员等级" prop="level">
                        <label>{this.state.form.level}</label>
                    </Form.Item>
                    <Form.Item label="积分" prop="expend">
                        <label>{this.state.form.expend}</label>
                    </Form.Item>
                    <Form.Item label="介绍" prop="introduction">
                        <label>{this.state.form.introduction}</label>
                    </Form.Item>
                    <Form.Item label="用户名" prop="userName">
                        <label>{this.state.form.username}</label>
                    </Form.Item>
                    <Form.Item label="生日" prop="birthday">
                        <label>{this.state.form.birthday}</label>
                    </Form.Item>
                    <Form.Item label="性别" prop="sex">
                        <label>{this.state.form.sex}</label>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onChangeInfo.bind(this)}>修改信息</Button>
                        <Button type="primary" onClick={this.onChangePassword.bind(this)}>修改密码</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default UserInfo;