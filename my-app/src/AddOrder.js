import React, { Component } from 'react';
import 'element-theme-default';
import './css/SchoolInfo.css'
import {Button,Form,Select,Menu,Switch} from 'element-react'
import axios from 'axios'
class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                userId:'',
                schoolId:'',
                courseId: '',
                schoolName: '',
                address: '',
                courseName: '',
                type: '',
                price: '',
                startTime: '',
                endTime: '',
                courseStartTime: '',
                courseEndTime: '',
                introduction: '',
                classes: '',
            },
            value: false,
        };
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
            this.props.history.push('/User/' + userId + '/OrderType/');
        } else {
            this.props.history.push('/User/' + userId+'/UserInfo');
        }
    }
    componentWillMount() {
        axios.get(`http://localhost:8080//getCourseById`,{
            params :{
                courseId : this.props.match.params.courseId
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
    onOrder(E){
        axios.post(`http://localhost:8080//createOrder`,{
            userId:this.props.match.params.userId,
            schoolId:this.state.form.schoolId,
            courseId: this.state.form.courseId,
            schoolName: this.state.form.schoolName,
            courseName: this.state.form.courseName,
            type: this.state.form.type,
            price: this.state.form.price,
            introduction: this.state.form.introduction,
            classes: this.state.form.classes,
        })
            .then(res => {
                const form = res.data;
                if(form == true){
                    alert("添加成功");
                    this.props.history.push('/User/' + this.props.match.params.userId + '/Main');
                }
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    render() {
        return (
            <div  >
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
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"  className="form">
                    <Form.Item label="课程编号" prop="courseId">
                        <label>{ this.state.form.courseId }</label>
                    </Form.Item>
                    <Form.Item label="学校名称" prop="schoolName">
                        <label>{ this.state.form.schoolName }</label>
                    </Form.Item>
                    <Form.Item label="课程名称" prop="courseName">
                        <label>{this.state.form.courseName}</label>
                    </Form.Item>
                    <Form.Item label="上课地点" prop="address">
                        <label>{this.state.form.address}</label>
                    </Form.Item>
                    <Form.Item label="课程类型" prop="type">
                        <label>{this.state.form.type}</label>
                    </Form.Item>
                    <Form.Item label="开学时间" prop="startTime">
                        <label>{this.state.form.startTime}</label>
                    </Form.Item>
                    <Form.Item label="放假时间" prop="endTime">
                        <label>{this.state.form.endTime}</label>
                    </Form.Item>
                    <Form.Item label="上课时间" prop="courseStartTime">
                        <label>{this.state.form.courseStartTime}</label>
                    </Form.Item>
                    <Form.Item label="下课时间" prop="courseEndTime">
                        <label>{this.state.form.courseEndTime}</label>
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
export default AddOrder;