import React, { Component } from 'react';
import 'element-theme-default';
import logo from './logo.svg';
import {Button,Form,Menu,Select,Input} from 'element-react'
class ManageMain extends Component {
    constructor(props) {
        super(props);
        this.state={
            form:{
                value: '1',
                search: '',
            },
            options: [{
                value: '1',
                label: '机构名称'
            }, {
                value: '2',
                label: '用户名称'
            }],
        }
    }
    onSearch(){
        var road = '/Manage/' +this.props.match.params.id +'/SearchType/'+this.state.form.value+'/Search/'+this.state.form.search;
        this.props.history.push(road);
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
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
                    <Menu.Item index="2">申请列表</Menu.Item>
                    <Menu.Item index="3">平台信息</Menu.Item>
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
export default ManageMain;