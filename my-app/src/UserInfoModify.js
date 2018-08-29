import React, { Component } from 'react';
import 'element-theme-default';
import './css/FromLeft.css'
import {Button,Form,Input,Menu,Select,DatePicker} from 'element-react'
import axios from 'axios'
class UserInfoModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                userId : '',
                username : '',
                birthday : null,
                introduction: '',
                sex : ''
            },
        };
    }
    onSubmit(e){
        axios.post(`http://localhost:8080//modify`,{
            userId : this.state.form.userId ,
            username : this.state.form.username,
            birthday : this.state.form.birthday,
            introduction: this.state.form.introduction,
            sex : this.state.form.sex
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
    onBack(){
        var road = '/User/'+ this.props.match.params.userId +'/UserInfo';
        this.props.history.push(road);
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
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
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"  className="form-left"  >
                    <Form.Item label="用户名" prop="username">
                        <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')}></Input>
                    </Form.Item>
                    <Form.Item label="个人介绍" prop="introduction">
                        <Input value={this.state.form.introduction} onChange={this.onChange.bind(this, 'introduction')}  ></Input>
                    </Form.Item>
                    <Form.Item label="生日" prop="birthday">
                        <Input value={this.state.form.birthday} onChange={this.onChange.bind(this, 'birthday')}  ></Input>
                    </Form.Item>
                    <Form.Item label="性别" prop="introduction">
                        <Select value={this.state.form.sex} onChange={this.onChange.bind(this, 'sex')} placeholder="请选择性别">
                            <Select.Option label="男" value="男"></Select.Option>
                            <Select.Option label="女" value="女"></Select.Option>
                        </Select>
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
export default UserInfoModify;