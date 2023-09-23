import React from 'react';
import Profile from './ProfileClass';

class About extends React.Component {
    constructor(props){
        super(props);
    }
     componentDidMount() { 
        //Best place to make an api call since it will be called after render
        console.log("cdm");
     }

  render() {
    return(
        <>
        <h1>About Us</h1>
        <p> YumBites Food</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat at magna a tincidunt. Sed condimentum est suscipit, tempus eros pellentesque, egestas sapien. Aenean odio odio, maximus eget nibh et, elementum laoreet nibh. In iaculis condimentum est, sit amet vestibulum neque finibus eget. Etiam pharetra luctus volutpat. Mauris pharetra turpis nisi, ut commodo ipsum imperdiet eget. Aenean sit amet elementum odio. Morbi a posuere enim, ac vulputate dolor. Nunc eu augue mollis ligula rhoncus porttitor. Morbi sapien libero, varius a tempus vel, rutrum egestas libero. Ut vitae nunc tortor.</p>
          <Profile name={"Keegan"} rollno="191205002" age="22"/>
        </>

    )
 }   
}

export default About;