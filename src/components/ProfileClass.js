//Class Based Component
import React from "react";
class Profile extends React.Component {
    constructor(props) {
    super(props)
    this.state= {
        userInfo: {
          name:"Dummy Name",
          location:"Dummy Location",
          bio:"Dummy bio",
        },
      }
    console.log(' child constructor:'  + this.props.name);
}
  //cdm will be called after first render 
     async componentDidMount(){
        //APi call   
      const data =  await fetch("https://api.github.com/users/Keegan-20");
      const json = await data.json();
      console.log(json);
      this.setState({
        userInfo:json,
      });
      console.log("child -ComponentDidMount:" + this.props.name);
     }

     //componentDidUpdate is called after every update
     componentDidUpdate(){
      console.log("Component Did Update");  
     } 

     componentWillUnmount() {
      console.log("Component Will Unmount");
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
             <img src={this?.state?.userInfo?.avatar_url} alt="github profile Img"/>
             <h2>Name: {this?.state?.userInfo?.name}</h2>
             <h3>Location:{this?.state?.userInfo?.location}</h3>
             <h3>Bio:{this?.state?.userInfo?.bio}</h3>  
         </>
        )
    }
}

export default Profile;