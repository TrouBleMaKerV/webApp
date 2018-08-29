import React, { Component } from 'react';
import './css/UserLogin.css';
import {Form} from 'element-react'
import {Input} from  'element-react'
import {Button} from 'element-react'
import 'element-theme-default';
import axios from 'axios'
class SchoolRegister extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                schoolName : '',
                address : '',
                introduction : '',
                password : '',
                checkPass :''
            },
            rules: {
                schoolName : [
                    {required: true, message: '请输入学校名称', trigger: 'blur' },
                ],
                address : [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
                introduction: [
                    { required:true,message:'学校介绍',trigger:'blur'}
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
        axios.post(`http://localhost:8080//signUpSchool`,{
            schoolName : this.state.form.schoolName,
            address : this.state.form.address,
            introduction : this.state.form.introduction,
            password : this.state.form.password,
        })
            .then(res => {
                const form = res.data;
                if(form != null ){
                    alert("您的编号为: " + form +  "请等待管理员通过");
                    this.props.history.push('/SchoolLogin');
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
    render() {
        return (
            <div className="form" >
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"  >
                    <Form.Item label="名称" prop="schoolName">
                        <Input value={this.state.form.schoolName} onChange={this.onChange.bind(this, 'schoolName')} placeholder="请输入名称" ></Input>
                    </Form.Item>
                    <Form.Item label="地址" prop="address">
                        <Input value={this.state.form.address} onChange={this.onChange.bind(this, 'address')} placeholder="请输入地址" ></Input>
                    </Form.Item>
                    <Form.Item label="介绍" prop="introduction">
                        <Input value={this.state.form.introduction} onChange={this.onChange.bind(this, 'introduction')} placeholder="请输入介绍" ></Input>
                    </Form.Item>
                    <Form.Item label="密码" prop="password">
                        <Input value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} placeholder="请输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item label="确认密码" prop="checkPass">
                        <Input value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} placeholder="请再次输入密码" type="password"></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>注册</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SchoolRegister;