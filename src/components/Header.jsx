import logoImage from "../img/logo.svg";

// Named Exports:
 const Title = () => (
    <img className="logo" src={logoImage} alt="logoImage"/>
);


//creating a header section
 export const HeaderComponent = () => {
    return (
        <div className="header">
            <Title />
            <div className="nav-items">
                <ul>  
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    );
};
export default HeaderComponent;