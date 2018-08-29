import React, { Component } from 'react';
import 'element-theme-default';
import {Table,Menu,Button} from 'element-react'
import axios from 'axios'
class ManageApply extends Component {
    constructor(props) {
        super(props);
        this.state={
            columns: [
                {
                    label: "机构编号",
                    prop: "schoolId",
                    width: 180
                },
                {
                    label: "学校名称",
                    prop: "schoolName",
                    width: 180
                },
                {
                    label: "地址",
                    prop: "address",
                    width: 180
                },
                {
                    label: "介绍",
                    prop: "introduction",
                    width:180
                },
                {
                    label: "状态",
                    prop: "state",
                    width:180
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 180,
                    render: (row, column,index)=>{
                            return <span><Button type="text" size="small" onClick={this.onSure.bind(this,index)}>通过</Button><Button type="text" size="small" onClick={this.onPass.bind(this,index)}>不通过</Button></span>
                    }
                }
            ],
            data: []
        }
    }
    onSure(index){
        axios.post(`http://localhost:8080//sure`,{
            schoolId : this.state.data[index].schoolId,
            schoolName:this.state.data[index].schoolName,
            address : this.state.data[index].address,
            introduction : this.state.data[index].introduction,
            password : this.state.data[index].password,
            balance : this.state.data[index].balance
        })
            .then(res => {
                const data = res.data;
                if(data == true){
                    alert("通过成功")
                    axios.get(`http://localhost:8080//getApply`)
                        .then(res => {
                            const data = res.data;
                            this.setState({ data });
                        })
                        .catch(function(response) {
                            console.log(response);
                        })
                }
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    onPass(index){
        axios.get(`http://localhost:8080//pass`,{
            params:{
                schoolId : this.state.data[index].schoolId,
            }
        })
            .then(res => {
                const data = res.data;
                if(data == true){
                    alert("不通过成功")
                    axios.get(`http://localhost:8080//getApply`)
                        .then(res => {
                            const data = res.data;
                            this.setState({ data });
                        })
                        .catch(function(response) {
                            console.log(response);
                        })
                }
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    componentWillMount() {
        axios.get(`http://localhost:8080//getApply`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
            .catch(function(response) {
                console.log(response);
            })
    }
    onSelect(e){
        if( e == "1" ){
            this.props.history.push('/Manage/' +this.props.match.params.id +'/Main');
        } else if(e == "2") {
            this.props.history.push('/Manage/' +this.props.match.params.id +'/Apply');
        } else {
            this.props.history.push('/Manage/' +this.props.match.params.id +'/Info');
        }
    }
    render() {
        return (
            <div >
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">平台主页</Menu.Item>
                    <Menu.Item index="3">申请列表</Menu.Item>
                    <Menu.Item index="4">平台信息</Menu.Item>
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
export default ManageApply;