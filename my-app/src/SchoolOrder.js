import React, { Component } from 'react';
import 'element-theme-default';
import {Table,Button,Menu} from 'element-react'
import axios from 'axios'
import './css/SchoolInfo.css'
class SchoolOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    label: "订单号",
                    prop: "orderId",
                    width: 180
                },
                {
                    label: "日期",
                    prop: "time",
                    width: 180
                },
                {
                    label: "学生编号",
                    prop: "userId",
                    width: 150
                },
                {
                    label: "学生名",
                    prop: "userName",
                    width: 180
                },
                {
                    label: "课程名称",
                    prop: "courseName",
                    width: 180
                },
                {
                    label: "班级",
                    prop: "classes",
                    width:180
                },
                {
                    label: "价格",
                    prop: "price",
                    width:150
                },
                {
                    label: "状态",
                    prop: "orderState",
                    width:150
                }
            ],
            data: []
        }
    }
    onSelect(e){
        var schoolId = this.props.match.params.schoolId ;
        if( e == "1" ){
            this.props.history.push('/School/'+schoolId +'/Main');
        } else if ( e == "2-1"){
            axios.get(`http://localhost:8080//getOrderBySchoolIdAndOrderState`,{
                params :{
                    schoolId : this.props.match.params.schoolId ,
                    orderState : 1
                }
            })
             .then(res => {
                 const data = res.data;
                 this.setState({ data });
             })
            this.props.history.push('/School/'+schoolId+'/OrderType/1');
        } else if( e == "2-2"){
            axios.get(`http://localhost:8080//getOrderBySchoolIdAndOrderState`,{
                params :{
                    schoolId : this.props.match.params.schoolId ,
                    orderState : 2
                }
            })
                .then(res => {
                    const data = res.data;
                    this.setState({ data });
                })
                .catch(function(response) {
                    console.log(response);
                })
            this.props.history.push('/School/'+schoolId+'/OrderType/2');
        } else if( e == "2-3"){
            axios.get(`http://localhost:8080//getOrderBySchoolIdAndOrderState`,{
                params :{
                    schoolId : this.props.match.params.schoolId ,
                    orderState : 3
                }
            })
                .then(res => {
                    const data = res.data;
                    this.setState({ data });
                })
                .catch(function(response) {
                    console.log(response);
                })
            this.props.history.push('/School/'+schoolId+'/OrderType/3');
        } else if(e == "3") {
            this.props.history.push('/School/'+schoolId+'/Course');
        } else if(e == "4-1"){
            this.props.history.push('/School/'+schoolId+'/addCourse');
        }else if (e == "4-2") {
            this.props.history.push('/School/' + schoolId + '/addScore');
        } else {
            this.props.history.push('/School/' + schoolId + '/createOrder');
        }

    }
    componentWillMount() {
        axios.get(`http://localhost:8080//getOrderBySchoolIdAndOrderState`,{
            params :{
                schoolId : this.props.match.params.schoolId ,
                orderState : this.props.match.params.orderType
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
    render() {
        return (
            <div>
                <Menu theme="dark"  className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
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

export default SchoolOrder;