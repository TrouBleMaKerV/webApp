import React, { Component } from 'react';
import 'element-theme-default';
import {Form,Menu} from 'element-react'
import axios from 'axios'
class ManageInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            form:{
                balance: '50000000',
                schools: '10',
                users: '100'
            },
        }
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
    componentWillMount() {
        axios.get(`http://localhost:8080//getManageById`,{
            params :{
                id : this.props.match.params.id
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
    render() {
        return (
            <div >
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">平台主页</Menu.Item>
                    <Menu.Item index="2">申请列表</Menu.Item>
                    <Menu.Item index="3">平台信息</Menu.Item>
                </Menu>
                <br/>
                <Form  model={this.state.form} labelWidth="80"   className="form">
                    <Form.Item label="余额" >
                        <label>{this.state.form.balance}</label>
                    </Form.Item>
                    <Form.Item label="机构数" >
                        <label>{this.state.form.schools}</label>
                    </Form.Item>
                    <Form.Item label="用户量" >
                        <label>{this.state.form.users}</label>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default ManageInfo;