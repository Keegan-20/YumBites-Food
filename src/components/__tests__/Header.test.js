import {render,waitFor } from "@testing-library/react";
import HeaderComponent from "../Header";
import { Provider } from "react-redux";
import store from "../utils/store";
//StaticRouter doesnt need a browser
import { StaticRouter } from "react-router-dom/server";

//TestCase for Testing the logo is present
test("logo should load on rendering the header", async() => {
  const header = render(
    <StaticRouter>
        <Provider store={store}>
           <HeaderComponent />
           
       </Provider>
    </StaticRouter>
  );
  const logo = await waitFor(() => 
  header.getByTestId('logo'), { timeout: 2000 }); 

   console.log(logo);  
    expect(logo.src).toBe("http://localhost/dummy.png");
});
