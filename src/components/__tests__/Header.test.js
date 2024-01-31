import { render, waitFor } from "@testing-library/react";
import HeaderComponent from "../Header";
import { Provider } from "react-redux";
import store from "../utils/store";
//StaticRouter doesnt need a browser
import { StaticRouter } from "react-router-dom/server";

//Unit Testing
//TestCase for Testing the logo is present
test("logo should load on rendering the header", async () => {
  //Load header component
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <HeaderComponent />
      </Provider>
    </StaticRouter>
  );
  const logo = await waitFor(() => header.getByTestId("logo"), {
    timeout: 2000,
  });

  console.log(logo);
  expect(logo.src).toBe("http://localhost/dummy.png");
});

//TestCase for Testing if webapp is Online
test("Online status should be Green on rendering header", async () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <HeaderComponent />
      </Provider>
    </StaticRouter>
  );
  const onlineStatus = await waitFor(
    () => header.getByTestId("online-status"),
    {
      timeout: 2000,
    }
  );
  console.log(onlineStatus);
  //what output you are expecting
  expect(onlineStatus.innerHTML).toBe("🟢🟢🟢");
});

//TestCase for  checking Cart is empty on rendering
test("Cart should have 0 items on rendering header", async () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <HeaderComponent />
      </Provider>
    </StaticRouter>
  );
  const cart = await waitFor(() => header.getByTestId("cart"), {
    timeout: 2000,
  });
  //output you are expecting
  expect(cart.innerHTML).toBe("Cart -0 items");
});
