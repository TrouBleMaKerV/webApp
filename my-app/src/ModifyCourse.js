import React, { Component } from 'react';
import 'element-theme-default';
import {Button,Form,Input,Menu,Select,TimePicker,DatePicker,Layout} from 'element-react'
import './css/FromLeft.css'
import axios from 'axios'
class ModifyCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                address: '',
                courseName: '',
                type: '',
                price: '',
                startTime: '',
                endTime: '',
                courseStartTime: '',
                courseEndTime: '',
                introduction: ''
            },
            rules: {
                courseName : [
                    {required: true, message: '请输入课程名称', trigger: 'blur' },
                ],
                introduction: [
                    { required:true,message:'请输入课程介绍',trigger:'blur'}
                ],
                courseType: [
                    { required:true,message:'请输入课程介绍',trigger:'blur'}
                ],
                price:[
                    { required:true,type:'num',message:'课程价格',trigger:'blur'}
                ],
                address: [
                    { required:true,message:'请输入地址',trigger:'blur'}
                ],
                courseStartTime: [
                    { type:"date",required:true,message:'请输入上课时间',trigger:'blur'}
                ],
                courseEndTime: [
                    { type:"date",required:true,message:'请输入上课时间',trigger:'blur'}
                ],
                startTime: [
                    { type:"date",required:true,message:'请输入课程开始时间',trigger:'blur'}
                ],
                endTime: [
                    { type:"date",required:true,message:'请输入课程结束时间',trigger:'blur'}
                ],
            }
        };
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
    onSubmit(e){
        axios.post(`http://localhost:8080//modifyCourse`,{
            courseId : this.props.match.params.courseId,
            address: this.state.form.address,
            courseName: this.state.form.courseName,
            type: this.state.form.type,
            price: this.state.form.price,
            startTime: this.state.form.startTime,
            endTime: this.state.form.endTime,
            courseStartTime: this.state.form.courseStartTime,
            courseEndTime: this.state.form.courseEndTime,
            introduction: this.state.form.introduction
        })
            .then(res => {
                const data = res.data;
                if(data==true){
                    alert("修改成功");
                    this.props.history.push('/School/'+this.props.match.params.schoolId+'/Course')
                }else{
                    alert("修改失败");
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
        var schoolId = this.props.match.params.schoolId ;
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
        } else if(e == "4"){
            this.props.history.push('/School/'+schoolId+'/addCourse');
        }else {
            this.props.history.push('/School/'+schoolId+'/addScore');
        }

    }
    onRemove(e){
        axios.get(`http://localhost:8080//removeCourse`,{
            params:{
                courseId : this.props.match.params.courseId,
            }
        })
            .then(res => {
                const data = res.data;
                if(data==true){
                    alert("撤销成功");
                    this.props.history.push('/School/'+this.props.match.params.schoolId+'/Course')
                }else{
                    alert("撤销失败");
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
                    <Menu.Item index="4">添加课程</Menu.Item>
                    <Menu.Item index="5">添加成绩</Menu.Item>
                </Menu>
                <br/>
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" onSubmit={this.onSubmit.bind(this) } className="form-left"  >
                    <Form.Item label="课程名" prop="courseName">
                        <Input value={this.state.form.courseName} onChange={this.onChange.bind(this, 'courseName')}></Input>
                    </Form.Item>
                    <Form.Item label="上课地点" prop="address">
                        <Input value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}  ></Input>
                    </Form.Item>
                    <Form.Item label="介绍" prop="introduction">
                        <Input value={this.state.form.introduction} onChange={this.onChange.bind(this, 'introduction')} ></Input>
                    </Form.Item>
                    <Form.Item label="价格" prop="price">
                        <Input value={this.state.form.price} onChange={this.onChange.bind(this, 'price')} ></Input>
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
                    <Form.Item label="类别" prop="type">
                        <Select value={this.state.form.type} onChange={this.onChange.bind(this, 'sex')} placeholder="请选择性别">
                            <Select.Option label="奥数" value="奥数"></Select.Option>
                            <Select.Option label="英语" value="英语"></Select.Option>
                            <Select.Option label="音乐" value="音乐"></Select.Option>
                            <Select.Option label="其他" value="其他"></Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>修改</Button>
                        <Button type="primary" onClick={this.onRemove.bind(this)}>撤销</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default ModifyCourse;