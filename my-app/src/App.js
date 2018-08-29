import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import 'element-theme-default';
import {Button} from 'element-react'
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">cheche补习机构</h1>
                </header>
                <div>
                    <Button type="primary" ><a href="/UserLogin" className="App-a">用户登录</a></Button>
                    <Button type="primary" ><a href="/ManageLogin" className="App-a"> 管理员登录</a></Button>
                    <Button type="primary" ><a href="/SchoolLogin" className="App-a">机构登录</a></Button>
                </div>
                <br/>
            </div>
    );
  }
}

export default App;
