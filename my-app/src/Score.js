import React, { Component } from 'react';
import './css/App.css';
import 'element-theme-default';
import {Table,Menu} from 'element-react'
import axios from 'axios'
class Score extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    label: "学校名",
                    prop: "schoolName",
                    width: 180
                },
                {
                    label: "课程名",
                    prop: "courseName",
                    width: 180
                },
                {
                    label: "班级",
                    prop: "classes",
                    width: 180
                },
                {
                    label: "日期",
                    prop: "date",
                    width: 180
                },
                {
                    label: "得分",
                    prop: "score",
                    width:180
                },

            ],
            data: []
        }
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
            this.props.history.push('/User/' + userId + '/Score');
        } else {
            this.props.history.push('/User/' + userId+'/UserInfo');
        }
    }
    componentWillMount() {
        axios.get(`http://localhost:8080//getScoreByUserId`,{
            params :{
                userId : this.props.match.params.userId
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

export default Score;