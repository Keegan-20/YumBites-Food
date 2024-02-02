import { render, waitFor } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
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
        <Body />
      </Provider>
    </StaticRouter>
  );
  const shimmerUi = await waitFor(() => body.getByTestId("shimmer"), {
    timeoout: 2000,
  });

  console.log(shimmerUi);
});
