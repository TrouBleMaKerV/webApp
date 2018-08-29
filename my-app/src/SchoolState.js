import React, { Component } from 'react';
import './css/UserLogin.css';
import {Table} from 'element-react'
import 'element-theme-default';
class SchoolState extends Component{
    constructor(props){
        super(props);
        this.state = {
            form:{
                columns: [
                    {
                        label: "名称",
                        prop: "name",
                        width: 180
                    }
                    ,
                    {
                        label: "地址",
                        prop: "address",
                        width: 360
                    },
                    {
                        label: "介绍",
                        prop: "introduction",
                        width: 360
                    },
                    {
                        label: "状态",
                        prop: "state",
                        width: 180

                    }
                ],
                data:{
                    school:{
                        name:'',
                        address:'',
                        introduction:'',
                        state:''
                    }
                }
            }
        }
    }
    render() {
        return (
            <Table
                style={{width: '100%'}}
                columns={this.state.columns}
                maxHeight={200}
                data={this.state.data}
            />
        )
    }
}
export default SchoolState;