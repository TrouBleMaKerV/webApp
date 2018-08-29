import React, { Component } from 'react';
import {Form} from 'element-react'
import {Input} from  'element-react'
import {Button,DatePicker,Select,Layout,TimePicker,Menu} from 'element-react'
import 'element-theme-default';
import './css/FromLeft.css'
import axios from 'axios'
class SchoolAddScore extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                schoolId: '',
                schoolName: '',
                userId: '',
                courseName : '',
                date : '',
                score : '',
            },
            rules: {
                courseName : [
                    {required: true, message: '请输入课程名称', trigger: 'blur' },
                ],
                schoolName: [
                    {required: true, message: '请输入机构名称', trigger: 'blur' },
                ],
                userId: [
                    {required: true, message: '请输入用户编号', trigger: 'blur' },
                ],
                score:[
                    { required:true,message:'请填写成绩',trigger:'blur'}
                ],
                date: [
                    { type:"date",required:true,message:'请选择日期',trigger:'change'}
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
        axios.post(`http://localhost:8080//addScore`,{
            schoolId: this.state.form.schoolId,
            schoolName: this.state.form.schoolName,
            userId: this.state.form.userId ,
            courseName: this.state.form.courseName,
            date: this.state.form.date,
            score: this.state.form.score,
        })
            .then(res => {
                const data = res.data;
                if(data==true){
                    alert("添加成功");
                    this.props.history.push('/School/'+this.state.form.schoolId+'/Main');
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
                    <Form.Item label="课程名称" prop="courseName">
                        <Input value={this.state.form.courseName} onChange={this.onChange.bind(this, 'courseName')} placeholder="请输入名称" ></Input>
                    </Form.Item>
                    <Form.Item label="机构名称" prop="schoolName">
                        <Input value={this.state.form.schoolName} onChange={this.onChange.bind(this, 'schoolName')} placeholder="请输入机构名称" ></Input>
                    </Form.Item>
                    <Form.Item label="用户编号" prop="userId">
                        <Input value={this.state.form.userId} onChange={this.onChange.bind(this, 'userId')} placeholder="请输入用户编号" ></Input>
                    </Form.Item>
                    <Form.Item label="学期时间" required={true}>
                        <Form.Item prop="date" labelWidth="0px">
                            <DatePicker
                                value={this.state.form.date}
                                placeholder="选择开始日期"
                                onChange={this.onChange.bind(this, 'date')}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="成绩" prop="score">
                        <Input value={this.state.form.score} onChange={this.onChange.bind(this, 'score')} placeholder="请输入成绩" ></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.onAdd.bind(this)}>添加</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SchoolAddScore;