import React, { Component } from 'react';
import 'element-theme-default';
import logo from './logo.svg';
import {Button,Form,Menu,Select,Input,Table} from 'element-react'
import axios from 'axios'
class ManageSearchResult extends Component {
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
            columns: [
                {
                    label: "机构编号",
                    prop: "schoolId",
                    width: 180
                },
                {
                    label: "学校名称",
                    prop: "schoolName",
                    width: 200
                },
                {
                    label: "余额",
                    prop: "balance",
                    width: 180
                },
                {
                    label: "地址",
                    prop: "address",
                    width: 300
                },
                {
                    label: "介绍",
                    prop: "introduction",
                    width:180
                },
            ],
            data: []
        }
    }
    onSearch(){
        if(this.state.form.value == 2){
            var road = '/Manage/' +this.props.match.params.id +'/SearchType/'+this.state.form.value+'/Search/'+this.state.form.search;
            this.props.history.push(road);
        }else {
            axios.get(`http://localhost:8080//searchSchool`,{
                params :{
                    schoolName : this.props.match.params.search ,
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
    componentWillMount() {
        axios.get(`http://localhost:8080//searchSchool`,{
            params :{
                schoolName : this.props.match.params.search ,
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
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    height={480}
                />
            </div>
        );
    }
}
export default ManageSearchResult;