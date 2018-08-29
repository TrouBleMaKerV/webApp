import React, { Component } from 'react';
import 'element-theme-default';
import {Button,Table,Menu} from 'element-react'
import axios from 'axios'
import './css/SchoolInfo.css'
class Course extends Component {
    constructor(props) {
        super(props);
        this.state={
            columns: [
                {
                    label: "课程编号",
                    prop: "courseId",
                    width: 100
                },
                {
                    label: "课程名称",
                    prop: "courseName",
                    width: 100
                },
                {
                    label: "课程类型",
                    prop: "type",
                    width:100
                },
                {
                    label: "上课地点",
                    prop: "address",
                    width: 200
                },
                {
                    label: "上课时间",
                    prop: "courseStartTime",
                    width:140
                },
                {
                    label: "下课时间",
                    prop: "courseEndTime",
                    width:140
                },
                {
                    label: "开学日期",
                    prop: "startTime",
                    width:140
                },
                {
                    label: "放假日期",
                    prop: "endTime",
                    width:140
                },
                {
                    label: "价格",
                    prop: "price",
                    width:100
                },
                {
                    label: "课程介绍",
                    prop: "introduction",
                    width:275
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 100,
                    render: (row, column,index)=>{
                        return <span><Button type="text" size="small" onClick={this.onChange.bind(this,index)}>修改</Button></span>
                    }
                }
            ],
            data: []
        }
    }
    componentWillMount() {
        axios.get(`http://localhost:8080//getCourseBySchoolId`,{
            params :{
                schoolId : this.props.match.params.schoolId
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    onChange(index){
        var road = '/School/'+this.props.match.params.schoolId+'/ModifyCourse/'+ this.state.data[index].courseId;
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
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    height={650}
                />
            </div>
        );
    }
}
export default Course;