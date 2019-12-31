import React, {Component} from 'react';

const dummy_props={
    title: "테스트용 타이틀",
    content: "테스트용 글"
}
export default class PostView extends Component{
    render(){
        //const {title, content} = dummy_props
        return(
            <div>
                <h3>{this.props.title}</h3>
                <p>{this.props.content}</p>
            </div>
        )
    }
}