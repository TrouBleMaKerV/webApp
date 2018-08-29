import React, { Component } from 'react';
import './css/UserLogin.css';
import {Form} from 'element-react'
import {Input} from  'element-react'
import {Button} from 'element-react'
import 'element-theme-default';
import axios from 'axios'
class UserLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                email : '',
                password : ''
            },
            rules: {
                email : [
                    {required: true, message: '请输入邮箱', trigger: 'blur' },
                    {type: 'email', message: '请输入正确的邮箱',trigger: 'change'}
                ],
                password : [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        };
    }
    onSubmit(e){
        e.preventDefault();
         this.refs.form.validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    onRegister(e){
        this.props.history.push("/UserRegister");
    }
    onClick(e){
        axios.get('http://localhost:8080//login',{
                params : {
                    email : this.state.form.email,
                    password : this.state.form.password
                }
            }
        )
            .then(res => {
                if(res.data.userId == null){
                    alert('用户名或密码错误')
                }else {
                    this.props.history.push("/User/"+res.data.userId+"/Main");
                }

            })
            .catch(function(response) {
                console.log(response);
            })
    }
    render() {
        return (
            <div className="form" >
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" >
                    <Form.Item label="邮箱" prop="email">
                        <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} placeholder="请输入邮箱" ></Input>
                    </Form.Item>
                    <Form.Item label="密码" prop="password">
                        <Input value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} placeholder="请输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onClick.bind(this)}>登录</Button>
                        <Button type="primary" onClick={this.onRegister.bind(this)}>注册</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default UserLogin;