import React from 'react';

class Publicity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            publicity: '公示板'
        }
    }

    render() {
        return(
            <div>
                { this.state.publicity }
            </div>
        )
    }
}
export default Publicity;