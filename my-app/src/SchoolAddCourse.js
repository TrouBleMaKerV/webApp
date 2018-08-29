import React, { Component } from 'react';
import {Form} from 'element-react'
import {Input} from  'element-react'
import {Button,DatePicker,Select,Layout,TimePicker,Menu} from 'element-react'
import 'element-theme-default';
import './css/FromLeft.css'
import axios from 'axios'
class SchoolAddCourse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                schoolId: '',
                courseName : '',
                type : '',
                introduction : '',
                price : '',
                startTime : null,
                endTime : null ,
                courseStartTime: null,
                courseEndTime: null,
                address: ''
            },
            rules: {
                courseName : [
                    {required: true, message: '请输入课程名称', trigger: 'blur' },
                ],
                introduction: [
                    { required:true,message:'请输入课程介绍',trigger:'blur'}
                ],
                price:[
                    { required:true,message:'课程价格',trigger:'blur'}
                ],
                address: [
                    { required:true,message:'请输入地址',trigger:'blur'}
                ],
                courseStartTime: [
                    {type: 'date', required:true,message:'请输入上课时间',trigger:'change'}
                ],
                courseEndTime: [
                    { type: 'date',required:true,message:'请输入上课时间',trigger:'change'}
                ],
                startTime: [
                    { type:"date",required:true,message:'请输入课程开始时间',trigger:'change'}
                ],
                endTime: [
                    { type:"date",required:true,message:'请输入课程结束时间',trigger:'change'}
                ],
            }
        };
    }
    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
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
    componentWillMount(){
        this.state.form.schoolId = this.props.match.params.schoolId;
    }
    onAdd(e){
        axios.post(`http://localhost:8080//addCourse`,{
                    schoolId : this.state.form.schoolId,
                    courseName: this.state.form.courseName,
                    startTime: this.state.form.startTime,
                    endTime: this.state.form.endTime,
                    courseStartTime: this.state.form.courseStartTime,
                    courseEndTime: this.state.form.courseEndTime,
                    price: this.state.form.price,
                    type: this.state.form.type,
                    introduction: this.state.form.introduction,
                    address: this.state.form.address
        })
            .then(res => {
                const data = res.data;
                if(data==true){
                    alert("添加成功");
                    this.props.history.push('/School/'+this.props.match.params.schoolId +'/Main');
                }else{
                    alert("添加失败");
                }
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
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" className="form-left" >
                    <Form.Item label="名称" prop="courseName">
                        <Input value={this.state.form.courseName} onChange={this.onChange.bind(this, 'courseName')} placeholder="请输入名称" ></Input>
                    </Form.Item>
                    <Form.Item label="课程类型" prop="type">
                        <Select value={this.state.form.type} placeholder="请选择课程类型" onChange={this.onChange.bind(this, 'type')}>
                            <Select.Option label="奥数" value="奥数"></Select.Option>
                            <Select.Option label="英语" value="英语"></Select.Option>
                            <Select.Option label="音乐" value="音乐"></Select.Option>
                            <Select.Option label="其他" value="其他"></Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="上课地点" prop="address">
                        <Input value={this.state.form.address} onChange={this.onChange.bind(this, 'address')} placeholder="请输入地址" ></Input>
                    </Form.Item>
                    <Form.Item label="学期时间" required={true}>
                    <Layout.Col span="11">
                        <Form.Item prop="startTime" labelWidth="0px">
                            <DatePicker
                                value={this.state.form.startTime}
                                placeholder="选择开始日期"
                                onChange={this.onChange.bind(this, 'startTime')}
                            />
                        </Form.Item>
                    </Layout.Col>
                    <Layout.Col className="line" span="2">-</Layout.Col>
                    <Layout.Col span="11">
                        <Form.Item prop="endTime" labelWidth="0px">
                            <DatePicker
                                value={this.state.form.endTime}
                                placeholder="选择结束日期"
                                onChange={this.onChange.bind(this, 'endTime')}
                            />
                        </Form.Item>
                    </Layout.Col>
                    </Form.Item>
                    <Form.Item label="课程时间" required={true}>
                        <Layout.Col span="11">
                            <Form.Item prop="courseStartTime" labelWidth="0px">
                                <TimePicker
                                    value={this.state.form.courseStartTime}
                                    selectableRange="8:00:00 - 16:00:00"
                                    placeholder="选择开始时间"
                                    onChange={this.onChange.bind(this, 'courseStartTime')}
                                />
                            </Form.Item>
                        </Layout.Col>
                        <Layout.Col className="line" span="2">-</Layout.Col>
                        <Layout.Col span="11">
                            <Form.Item prop="courseEndTime" labelWidth="0px">
                                <TimePicker
                                    value={this.state.form.courseEndTime}
                                    selectableRange="10:00:00 - 18:00:00"
                                    placeholder="选择结束时间"
                                    onChange={this.onChange.bind(this, 'courseEndTime')}
                                />
                            </Form.Item>
                        </Layout.Col>
                    </Form.Item>
                    <Form.Item label="介绍" prop="introduction">
                        <Input value={this.state.form.introduction} onChange={this.onChange.bind(this, 'introduction')} placeholder="请输入介绍" ></Input>
                    </Form.Item>
                    <Form.Item label="价格" prop="price">
                        <Input value={this.state.form.price} onChange={this.onChange.bind(this, 'price')} placeholder="请输入价格" ></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onAdd.bind(this)}>添加</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SchoolAddCourse;