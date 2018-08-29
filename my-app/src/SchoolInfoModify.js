import React, { Component } from 'react';
import 'element-theme-default';
import {Button,Form,Input,Menu} from 'element-react'
import './css/FromLeft.css'
import axios from 'axios'
class SchoolInfoModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                schoolId : '',
                schoolName : '',
                address : '',
                introduction: '',
            },
        };
    }
    onSubmit(e){
        axios.post(`http://localhost:8080//modifySchool`,{
            schoolId : this.props.match.params.schoolId ,
            schoolName: this.state.form.schoolName,
            address: this.state.form.address,
            introduction: this.state.form.introduction
        })
            .then(res => {
                const form = res.data;
                if(form == true){
                    alert("提交成功，等待管理员审核")
                    this.props.history.push('/School/'+this.props.match.params.schoolId +'/Main');
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
    onSelect(e){
        var schoolId = this.props.match.params.schoolId;
        if( e == "1" ){
            this.props.history.push('/School/'+schoolId +'/Main');
        } else if ( e == "2-1"){
            this.props.history.push('/School/'+schoolId+'/OrderType/1');
        } else if( e == "2-2"){
            this.props.history.push('/School/'+schoolId+'/OrderType/2');
        } else if( e == "2-3"){
            this.props.history.push('/School/'+schoolId+'/OrderType/3');
        } else if(e == "3") {
            this.props.history.push('/School/'+schoolId+'/Course');
        } else if(e == "4-1"){
            this.props.history.push('/School/'+schoolId+'/addCourse');
        }else if(e == "4-2"){
            this.props.history.push('/School/'+schoolId+'/addScore');
        }else {
            this.props.history.push('/School/'+schoolId+'/createOrder');
        }
    }
    componentWillMount() {
        axios.get(`http://localhost:8080//getSchoolById`,{
            params :{
                schoolId : this.props.match.params.schoolId ,
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
    onChangePassword(){
        this.props.history.push('/School/'+this.state.form.schoolId+'/changePassword');
    }
    render() {
        return (
            <div >
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">学校信息</Menu.Item>
                    <Menu.SubMenu index="2" title="我的订单">
                        <Menu.Item index="2-1">已支付</Menu.Item>
                        <Menu.Item index="2-2">未支付</Menu.Item>
                        <Menu.Item index="2-3">已撤销</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item index="3">我的课程</Menu.Item>
                    <Menu.SubMenu index="4" title="添加">
                        <Menu.Item index="4-1">添加课程</Menu.Item>
                        <Menu.Item index="4-2">添加成绩</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item index="5">现场登记</Menu.Item>
                </Menu>
                <br/>
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"  className="form-left"  >
                    <Form.Item label="学校名" prop="schoolName">
                        <Input value={this.state.form.schoolName} onChange={this.onChange.bind(this, 'schoolName')}></Input>
                    </Form.Item>
                    <Form.Item label="地址" prop="address">
                        <Input value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}  ></Input>
                    </Form.Item>
                    <Form.Item label="介绍" prop="introduction">
                        <Input value={this.state.form.introduction} onChange={this.onChange.bind(this, 'introduction')} ></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>修改</Button>
                        <Button type="primary" onClick={this.onChangePassword.bind(this)}>修改密码</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SchoolInfoModify;