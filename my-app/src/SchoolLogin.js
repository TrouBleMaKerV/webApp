import React, { Component } from 'react';
import './css/UserLogin.css';
import {Form} from 'element-react'
import {Input} from  'element-react'
import {Button} from 'element-react'
import 'element-theme-default';
import axois from 'axios'
class SchoolLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                schoolId : '',
                password : ''
            },
            rules: {
                schoolId : [
                    {required: true, message: '请输入编号', trigger: 'blur' },
                    {type: 'number', message: '编号必须为数字值',trigger: 'change'}
                ],
                password : [
                    {required: true, message: '请输入编号', trigger: 'blur' },
                ]
            }
        };
    }
    onLogin(e){
        axois.get('http://localhost:8080//schoolLogin',{
            params : {
                schoolId: this.state.form.schoolId,
                password: this.state.form.password
            }
        }) .then(res => {
            if(res.data.schoolId == null){
                alert('用户名或密码错误')
            }else {
                this.props.history.push("/School/"+res.data.schoolId+"/Main");
            }

        })
    }
    onRegister(){
        this.props.history.push("/SchoolRegister");
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render() {
        let road='/SchoolState/'+this.state.form.schoolId;
        return (
            <div className="form">
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"  >
                    <Form.Item label="编号" prop="schoolId">
                        <Input value={this.state.form.schoolId} onChange={this.onChange.bind(this, 'schoolId')} placeholder="请输入编号" ></Input>
                    </Form.Item>
                    <Form.Item label="密码" prop="password">
                        <Input value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} placeholder="请输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onLogin.bind(this)}>登录</Button>
                        <Button type="primary" onClick={this.onRegister.bind(this)}>注册</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SchoolLogin;