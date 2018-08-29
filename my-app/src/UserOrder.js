import React, { Component } from 'react';
import 'element-theme-default';
import './css/Menu.css';
import {Table,Button,Menu} from 'element-react'
import axios from 'axios'
class UserOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    label: "订单号",
                    prop: "orderId",
                    width: 150
                },
                {
                    label: "日期",
                    prop: "time",
                    width: 180
                },
                {
                    label: "学校编号",
                    prop: "schoolId",
                    width: 150
                },
                {
                    label: "学校名称",
                    prop: "schoolName",
                    width: 150
                },
                {
                    label: "课程编号",
                    prop: "courseId",
                    width: 150
                },
                {
                    label: "课程名称",
                    prop: "courseName",
                    width: 180
                },
                {
                    label: "班级",
                    prop: "classes",
                    width:100
                },
                {
                    label: "价格",
                    prop: "price",
                    width: 100
                },
                {
                    label: "状态",
                    prop: "orderState",
                    width:180
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 180,
                    render: (row, column,index)=>{
                        if(this.state.data[index].orderState == "未支付"){
                            return <span><Button type="text" size="small" onClick={this.onPay.bind(this,index)}>支付</Button></span>
                        }else{
                            return <span><Button type="text" size="small" onClick={this.onCancel.bind(this,index)}>撤销</Button></span>
                        }
                    }
                }
            ],
            data: []
        }
    }
    onCancel(e){
        axios.get(`http://localhost:8080//cancel`,{
            params :{
                userId : this.props.match.params.userId ,
                orderId : this.state.data[e].orderId
            }
        })
            .then(res => {
                const form = res.data;
                if(form == true){
                    alert("撤销成功");
                    this.onBack();
                }else{
                    alert("撤销失败");
                }
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    onSelect(e) {
        var userId = this.props.match.params.userId;
        if (e == "1") {
            this.props.history.push('/User/' + userId + '/Main');
        } else if (e == "2-1") {
            this.props.history.push('/User/' + userId + '/OrderType/1');
            axios.get(`http://localhost:8080//getOrderByUserIdAndOrderState`,{
                params :{
                    userId : this.props.match.params.userId ,
                    orderState : 1
                }
            })
                .then(res => {
                    const data = res.data;
                    this.setState({ data });
                })
                .catch(function(response) {
                    console.log(response);
                })
        } else if (e == "2-2") {
            axios.get(`http://localhost:8080//getOrderByUserIdAndOrderState`,{
                params :{
                    userId : this.props.match.params.userId ,
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
            this.props.history.push('/User/' + userId + '/OrderType/2');
        } else if (e == "2-3") {
            axios.get(`http://localhost:8080//getOrderByUserIdAndOrderState`,{
                params :{
                    userId : this.props.match.params.userId ,
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
            this.props.history.push('/User/' + userId + '/OrderType/3');
        } else if (e == "3") {
            this.props.history.push('/User/' + userId + '/Score');
        } else {
            this.props.history.push('/User/' + userId+'/UserInfo');
        }
    }
    onPay(e){
        axios.get(`http://localhost:8080//pay`,{
            params :{
                userId : this.props.match.params.userId ,
                orderId : this.state.data[e].orderId
            }
        })
            .then(res => {
                const form = res.data;
                if(form == true){
                    alert("支付成功");
                    this.onBack();
                }else{
                    alert("支付失败");
                }
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    componentWillMount() {
        axios.get(`http://localhost:8080//getOrderByUserIdAndOrderState`,{
            params :{
                userId : this.props.match.params.userId ,
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

export default UserOrder;