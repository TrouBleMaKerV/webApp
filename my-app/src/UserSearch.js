import React, { Component } from 'react';
import logo from './logo.svg';
import 'element-theme-default';
import './css/Menu.css';
import {Input,Select,Button,Form,Menu} from 'element-react'
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                value: '1',
                search: '',
            },
            options: [{
                value: '1',
                label: '机构名称'
            }, {
                value: '2',
                label: '课程名称'
            }, {
                value: '3',
                label: '课程类型'
            }],
        };
    }
    onSearch(){
        var road = '/User/'+this.props.match.params.userId+'/SearchType/'+this.state.form.value+'/Search/'+this.state.form.search;
        this.props.history.push(road);
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
            this.props.history.push('/User/' + userId + '/Score');
        } else {
            this.props.history.push('/User/' + userId+'/UserInfo');
        }
    }
    render() {
        return (
            <div >
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
                <div className="search">
                    <img src={logo} className="App-logo" alt="logo" />
                    <br/>
                    <br/>
                    <Form inline={true} model={this.state.form} >
                        <Form.Item>
                            <Select value={this.state.form.value} onChange={this.onChange.bind(this, 'value')} className="select">
                                {
                                    this.state.options.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value} />
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="请输入内容" value={this.state.form.search} onChange={this.onChange.bind(this, 'search')} append={<Button type="primary" icon="search" onClick={this.onSearch.bind(this)}>搜索</Button>} className="button"/>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        );
    }
}

export default User;