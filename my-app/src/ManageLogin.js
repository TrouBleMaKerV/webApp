import React, { Component } from 'react';
import './css/UserLogin.css';
import {Form} from 'element-react'
import {Input} from  'element-react'
import {Button} from 'element-react'
import 'element-theme-default';
import axios from 'axios'
class ManageLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                manageId : '',
                password : ''
            },
            rules: {
                manageId : [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                ],
                password : [
                    {required: true, message: '请输入密码', trigger: 'blur' },
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
    onLogin(e){
        axios.get('http://localhost:8080//manageLogin',{
                params : {
                    id : this.state.form.manageId,
                    password : this.state.form.password
                }
            }
        )
            .then(res => {
                if(res.data.id == null){
                    alert('用户名或密码错误')
                }else {
                    this.props.history.push("/Manage/"+res.data.id+"/Main");
                }

            })
            .catch(function(response) {
                console.log(response);
            })
    }
    render() {
        return (
            <div className="form" >
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" onSubmit={this.onSubmit.bind(this) } >
                    <Form.Item label="编号" prop="manageId">
                        <Input value={this.state.form.manageId} onChange={this.onChange.bind(this, 'manageId')} placeholder="请输入编号" style="width:300px"></Input>
                    </Form.Item>
                    <Form.Item label="密码" prop="password">
                        <Input value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} placeholder="请输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onLogin.bind(this)}>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default ManageLogin;