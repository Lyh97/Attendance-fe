import React from 'react';

class UsersManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: '职员信息'
        }
    }

    render() {
        return(
            <div>
                { this.state.userInfo }
                <div dangerouslySetInnerHTML={{__html: "<p>balabalabalabala.......</p><p>balalababalalaba....</p>"}} />
            </div>
        )
    }
}
export default UsersManage;