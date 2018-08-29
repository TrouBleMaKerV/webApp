import React, { Component } from 'react';
import 'element-theme-default';
import './css/SchoolInfo.css'
import {Button,Form,Select,Menu,Switch,Input} from 'element-react'
import axios from 'axios'
class SchoolPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                userId:'',
                schoolId:'',
                courseId: '',
                classes: '',
            },
            value: false,
        };
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
    onOrder(E){
        axios.post(`http://localhost:8080//SchoolCreateOrder`,{
            userId:this.state.form.userId,
            schoolId:this.props.match.params.schoolId,
            courseId: this.state.form.courseId,
            classes: this.state.form.classes,
        })
            .then(res => {
                const form = res.data;
                if(form == true){
                    alert("添加成功");
                    this.props.history.push('/School/' + this.props.match.params.schoolId + '/Main');
                }
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    render() {
        return (
            <div  >
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
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"  className="form">
                    <Form.Item label="课程编号" prop="courseId">
                        <Input value={this.state.form.courseId} onChange={this.onChange.bind(this, 'courseId')} placeholder="请输入名称" ></Input>
                    </Form.Item>
                    <Form.Item label="用户编号" prop="userId">
                        <Input value={this.state.form.userId} onChange={this.onChange.bind(this, 'userId')} placeholder="请输入名称" ></Input>
                    </Form.Item>
                    <Form.Item label="选班">
                        <Switch
                            value={this.state.value}
                            onText="是"
                            offText="否"
                            onValue={false}
                            offValue={true}
                            onChange={(value)=>{this.setState({value: value})}}>
                        </Switch>
                    </Form.Item>
                    <Form.Item label="班级" prop="classes" >
                        <Select value={this.state.form.classes} onChange={this.onChange.bind(this, 'classes')} placeholder="请选择班级" disabled={this.state.value}>
                            <Select.Option label="一班" value="1"></Select.Option>
                            <Select.Option label="二班" value="2"></Select.Option>
                            <Select.Option label="三班" value="3"></Select.Option>
                            <Select.Option label="四班" value="4"></Select.Option>
                            <Select.Option label="五班" value="5"></Select.Option>
                            <Select.Option label="六班" value="6"></Select.Option>
                            <Select.Option label="七班" value="7"></Select.Option>
                            <Select.Option label="八班" value="8"></Select.Option>
                            <Select.Option label="九班" value="9"></Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onOrder.bind(this)}>预定</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SchoolPayment;