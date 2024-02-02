import { render, waitFor,fireEvent } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Body from "../Body";
import store from "../utils/store";
import { RESTAURANT_DATA } from "../../mocks/Restaurant_data";

//dummy fetching of data
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(RESTAURANT_DATA);
    },
  });
});

test("Shimmer UI should load on homepage", async () => {
  //load the body component
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body/>
      </Provider>
    </StaticRouter>
  );
  const shimmerUi = await waitFor(() => body.getByTestId("shimmer"), {
    timeout: 2000,
  });

   expect(shimmerUi.children.length).toBe(20);
});


test("restaurant list should be render on load",async()=>{
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body/>
      </Provider>
    </StaticRouter>
  );

  const restaurantList= await waitFor(()=>body.getByTestId("res-list"),{
    timeout:2000,
  });
  console.log(RESTAURANT_DATA.length);
  expect(restaurantList.children.length).toBe(18)
  
}) 

 //testcase for search button
test("Search for string(food) on Homepage",async()=>{
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body/>
      </Provider>
    </StaticRouter>
  );

  
}) 
