//Class Based Component
import React from "react";
class Profile extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
        count:0,
        name:'Keegan',
    };
    console.log(' child constructor:'  + this.props.name);
}
     componentDidMount(){
        //APi call
        console.log(" child componentDidMount:" + this.props.name);
     }
     //first constructuor is called than render and at the end componentDidMount is called
     // render() mandatory for class based component
    render() {  
        console.log('child render:' + this.props.name);
        return (
        <>
        <h1>Profile Class Component</h1>
             <h5>dESI bHALAK 75 DAYS HARD</h5>
             {/* this keyword refers to profile class */}
             <h2>Name: {this.props.name}</h2>
             <h3>age:{this.props.age}</h3>
             <h3>Palyer name is {this.state.name} and Initial Count is:{this.state.count}</h3>
             <button onClick={()=>{
                //we do not mutate state directly i.e this.state=something cant modify directly use setstae
                 this.setState({count:this.state.count+1})}
             }
                 >SetCount</button>
             
         </>
        )
    }
}

export default Profile;