import { render, waitFor } from "@testing-library/react";
import Footer from "../Footer";
import { Provider } from "react-redux";
import store from "../utils/store";
//StaticRouter doesnt need a browser
import { StaticRouter } from "react-router-dom/server";

//Unit Testing
//TestCase for Testing if footer is present
test("footer should be present on rendering", async () => {
  //Load footercomponent
  const footer= render(
    <StaticRouter>
      <Provider store={store}>
        <Footer/>
      </Provider>
    </StaticRouter>
  );
  const footerPresent = await waitFor(() => footer.getByTestId("footer"), {
    timeout: 3000,
  });

  expect(footerPresent.innerHTML).toContain("<h4 class=\"flex justify-center w-full fixed bottom-0 max-h-14 p-2 bg-red-400 text-white\">YumBites Food ©2023 All Rights Reserved<span class=\"ml-40\">Develped by ❤️Keegan❤️</span></h4>");

});