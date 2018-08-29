import React, { Component } from 'react';
import './css/UserLogin.css';
import {Form} from 'element-react'
import {Input} from  'element-react'
import {Button,Menu} from 'element-react'
import 'element-theme-default';
import axios from 'axios'
class UserRegister extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                email : '',
                password :'',
                checkPass :'',
                code : '',
                getCode: ''
            },
            rules: {
                email : [
                    {required: true, message: '请输入邮箱', trigger: 'blur' },
                    {type: 'email', message: '编号必须为数字值',trigger: 'change'}
                ],
                code : [
                    { required: true, message: '请输入验证码', trigger: 'change' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
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
                        } else if (value !== this.state.form.password) {
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
        if(this.state.form.getCode != this.state.form.code){
            alert("验证码错误");
        }else{
            axios.post(`http://localhost:8080//signUp`,{
                email: this.state.form.email,
                password: this.state.form.password
            })
                .then(res => {
                    const form = res.data;
                    if(form == true){
                        alert("注册成功");
                        this.props.history.push('/UserLogin');
                    }
                })
                .catch(function(response) {
                    console.log(response);
                })
        }
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    getCode(){
        axios.get(`http://localhost:8080//getCode`,{
            params :{
                email : this.state.form.email
            }
        })
            .then(res => {
                const form = res.data;
                this.state.form.getCode = form;
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    render() {
        return (
            <div className="form" >
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"  >
                    <Form.Item label="邮箱" prop="email">
                        <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} placeholder="请输入邮箱" ></Input>
                    </Form.Item>
                    <Form.Item label="密码" prop="password">
                        <Input value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} placeholder="请输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item label="确认密码" prop="checkPass">
                        <Input value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} placeholder="请再次输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item label="验证码" prop="code">
                        <Input value={this.state.form.code} onChange={this.onChange.bind(this, 'code')} placeholder="请输入验证码"  append={<Button type="primary" onClick={this.getCode.bind(this)}>获取验证码</Button>}></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>注册</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default UserRegister;