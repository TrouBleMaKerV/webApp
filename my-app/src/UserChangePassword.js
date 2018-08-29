import React, { Component } from 'react';
import './css/UserLogin.css';
import {Form} from 'element-react'
import {Input} from  'element-react'
import {Button,Menu} from 'element-react'
import 'element-theme-default';
import axios from 'axios'
class UserChangePassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                password : '',
                newPassword: '',
                checkPass : '',
            },
            rules: {
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                newPassword:[
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请输入密码'));
                        } else {
                            if (this.state.form.checkPass !== '') {
                                this.refs.form.validateField('checkPass');
                            }
                            callback();
                        }
                    } }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.state.form.newPassword) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    } }
                ],
            }
        };
    }
    onSubmit(e){
        axios.get(`http://localhost:8080//setPassword`,{
            params :{
                userId : this.props.match.params.userId ,
                password:this.state.form.password,
                newPassword:this.state.form.newPassword
            }
        })
            .then(res => {
                const form = res.data;
                if(form == true){
                    alert("修改成功");
                    this.onBack();
                }else{
                    alert("修改失败");
                }
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    onBack(){
        var road = '/User/'+ this.props.match.params.userId +'/UserInfo';
        this.props.history.push(road);
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
    render() {
        return (
            <div >
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
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" className="form">
                    <Form.Item label="原密码" prop="password">
                        <Input value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} placeholder="请输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item label="新密码" prop="newPassword">
                        <Input value={this.state.form.newPassword} onChange={this.onChange.bind(this, 'newPassword')} placeholder="请输入新密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item label="确认密码" prop="checkPass">
                        <Input value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} placeholder="请再次输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>修改</Button>
                        <Button type="primary" onClick={this.onBack.bind(this)}>返回</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default UserChangePassword;