import React from "react";
import Profile from "./ProfileClass";
import UserContext from "./utils/UserContext";
class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("parent cons");
  }

  componentDidMount() {
    //Best place to make an api call since it will be called after render
    console.log(" parent cdm");
  }

  render() {
    console.log("parent render");
    return (
      <>
        <h1>About Us</h1>
        {/* Context in class based component */}
        <UserContext.Consumer>
          {({ user }) => (
            <h4>
              {user.name} -{user.state}
            </h4>
          )}
        </UserContext.Consumer>

        <p> YumBites Food</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          feugiat at magna a tincidunt. Sed condimentum est suscipit, tempus
          eros pellentesque, egestas sapien. Aenean odio odio, maximus eget nibh
          et, elementum laoreet nibh. In iaculis condimentum est, sit amet
          vestibulum neque finibus eget. Etiam pharetra luctus volutpat. Mauris
          pharetra turpis nisi, ut commodo ipsum imperdiet eget. Aenean sit amet
          elementum odio. Morbi a posuere enim, ac vulputate dolor. Nunc eu
          augue mollis ligula rhoncus porttitor. Morbi sapien libero, varius a
          tempus vel, rutrum egestas libero. Ut vitae nunc tortor.
        </p>
        {/* child componet */}
        <Profile name={"Keegan"} rollno="191205002" age="22" />
        {/* <Profile name={"Keegan2"} rollno="191205002" age="26"/> */}
      </>
    );
  }
}

export default About;
