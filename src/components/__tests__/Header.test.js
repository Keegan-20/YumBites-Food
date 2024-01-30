import { render} from "@testing-library/react";
import HeaderComponent from "../Header";
import { Provider } from "react-redux";
import store from "../utils/store";
//StaticRouter doesnt need a browser
import {StaticRouter} from "react-router-dom/server";

test("logo should load on rendering the header", () => {
    const header= render(
    <StaticRouter>
    <Provider store={store}>
    <HeaderComponent/>
    </Provider>
    </StaticRouter>
   );
    console.log(header);
});