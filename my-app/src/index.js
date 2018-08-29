import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import UserLogin from './UserLogin'
import SchoolLogin from './SchoolLogin'
import ManageLogin from './ManageLogin'
import UserRegister from './UserRegister'
import SchoolRegister from './SchoolRegister'
import SchoolState from './SchoolState'
import SchoolInfo from './SchoolInfo'
import SchoolOrder from './SchoolOrder'
import SchoolModify from './SchoolInfoModify'
import SchoolCourse from './SchoolCourse'
import SchoolAddScore from './SchoolAddScore'
import SchoolChangePassword from './SchoolChangePassword'
import SchoolCreateOrder from './SchoolPayment'
import ModifyCourse from './ModifyCourse'
import addCourse from './SchoolAddCourse'
import UserSearch from './UserSearch'
import UserOrder from './UserOrder'
import SearchResult from  './SearchResult'
import UserInfo from './UserInfo'
import UserInfoModify from './UserInfoModify'
import UserChangePassword from './UserChangePassword'
import Score from  './Score'
import AddOrder from './AddOrder'
import ManageMain from  './ManageMain'
import ManageApple from './ManageApply'
import ManageInfo from './ManageInfo'
import ManageSearchSchool from './ManageSearchSchool'
import ManageSearchUser from './ManageSearchUser'
import 'element-theme-default';
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom';

ReactDOM.render(
    (<Router>
        <div>
            <Route path="/UserLogin" component ={ App }/>
            <Route path="/SchoolLogin" component ={ App }/>
            <Route path="/ManageLogin" component = {App}/>
            <Route path="/UserRegister" component = {App}/>
            <Route path="/SchoolRegister" component = {App}/>
            <Route path="/SchoolState/:schoolId" component = {App}/>
            <Route path="/UserLogin" component ={ UserLogin }/>
            <Route path="/SchoolLogin" component ={ SchoolLogin }/>
            <Route path="/ManageLogin" component = {ManageLogin}/>
            <Route path="/UserRegister" component = {UserRegister}/>
            <Route path="/SchoolRegister" component = {SchoolRegister}/>
            <Route path="/SchoolState/:schoolId" component = {SchoolState}/>
            <Route path="/User/:userId/Main" component ={ UserSearch }/>
            <Route path="/User/:userId/UserInfo" component ={ UserInfo }/>
            <Route path="/User/:userId/UserInfoModify" component ={ UserInfoModify }/>
            <Route path="/User/:userId/UserChangePassword" component ={ UserChangePassword }/>
            <Route path="/User/:userId/SearchType/:searchType/Search/:search" component ={ SearchResult }/>
            <Route path="/User/:userId/OrderType/:orderType" component ={ UserOrder }/>
            <Route path="/User/:userId/Score" component ={ Score }/>
            <Route path="/User/:userId/Order/:courseId" component ={ AddOrder }/>
            <Route path="/School/:schoolId/OrderType/:orderType" component ={ SchoolOrder }/>
            <Route path="/School/:schoolId/Modify" component ={ SchoolModify }/>
            <Route path="/School/:schoolId/addCourse" component ={ addCourse }/>
            <Route path="/School/:schoolId/addScore" component ={ SchoolAddScore }/>
            <Route path="/School/:schoolId/Course" component ={ SchoolCourse }/>
            <Route path="/School/:schoolId/changePassword" component ={ SchoolChangePassword }/>
            <Route path="/School/:schoolId/ModifyCourse/:courseId" component ={ ModifyCourse }/>
            <Route path="/School/:schoolId/Main" component ={ SchoolInfo }/>
            <Route path="/School/:schoolId/CreateOrder" component ={ SchoolCreateOrder }/>
            <Route path="/Manage/:id/Main" component ={ ManageMain }/>
            <Route path="/Manage/:id/Info" component ={ ManageInfo }/>
            <Route path="/Manage/:id/Apply" component ={ ManageApple }/>
            <Route path="/Manage/:id/SearchType/1/Search/:search" component ={ ManageSearchSchool }/>
            <Route path="/Manage/:id/SearchType/2/Search/:search" component ={ ManageSearchUser }/>
        </div>
    </Router>),document.getElementById('root'))
registerServiceWorker();
