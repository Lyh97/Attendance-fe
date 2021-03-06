import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import attendance from './container/User/Attendance';
import publicity from './container/User/Publicity';
import userInfo from './container/User/UserInfo';

import attendanceManage from './container/Admin/AttendanceManage';
import publicityManage from './container/Admin/PublictyManage';
import userInfoManage from './container/Admin/UsersManage';

// const requireAuth = (nextState, replace) => {
//     if(!sessionStorage.getItem('userid')) {
//         let url = window.location.hash;
//         let objURL = {};
//         url.replace(
//             new RegExp("([^#?=&]+)(=([^&]*))?", "g"),
//             function ($0, $1, $2, $3) {
//                 objURL[$1] = $3;
//             }
//         );
//         if(objURL.access_token){
//             sessionStorage.setItem('token',objURL.access_token);
//         }
//         replace({
//             pathname: '/hello',
//             // state: { nextPathname: nextState.location.pathname }
//         });
//     }
// }

export default (
  	<Router path="/(**/)">
      <IndexRoute component={attendance}/>
      <Route path="/attendance" component={attendance}/>
      <Route path="/publicity" component={publicity}/>
      <Route path="/userInfo" component={userInfo}/>
      <Route path="/attendancemanage" component={attendanceManage}/>
      <Route path="/publicitymanage" component={publicityManage}/>
      <Route path="/userInfomanage" component={userInfoManage}/>
	</Router>
);

