import React, { Component } from 'react';
import 'element-theme-default';
import {Button,Form,Menu} from 'element-react'
import axios from 'axios'
import './css/SchoolInfo.css'
class SchoolInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            form:{
                schoolId : '',
                schoolName : '',
                address : '',
                introduction: '',
                balance:''
            },
        }
    }
    onSubmit(){
        var road = '/School/'+ this.props.match.params.schoolId + '/modify';
        this.props.history.push(road);
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
                <Form ref="form" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this) } className="form" >
                    <Form.Item label="编号" prop="schoolId">
                        <label>{ this.state.form.schoolId }</label>
                    </Form.Item>
                    <Form.Item label="学校名" prop="schoolName">
                        <label>{ this.state.form.schoolName }</label>
                    </Form.Item>
                    <Form.Item label="地址" prop="address">
                        <label>{this.state.form.address}</label>
                    </Form.Item>
                    <Form.Item label="余额" prop="balance">
                        <label>{this.state.form.balance}</label>
                    </Form.Item>
                    <Form.Item label="介绍" prop="introduction">
                        <label>{this.state.form.introduction}</label>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>修改</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SchoolInfo;