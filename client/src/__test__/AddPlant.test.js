import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddPlant from "../components/AddPlant";
import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom";
import plantCareStore from "../store/plantCareStore";

jest.mock("axios");

//test for add New plant
test("test Add a New Plant title", () => {
  render(
    <Provider store={plantCareStore}>
      <BrowserRouter>
        <AddPlant />
      </BrowserRouter>
    </Provider>
  );
  const title = screen.getByTestId("page-title");
  expect(title).toHaveTextContent("Add a New Plant");
});

//test for watering frequency input
test("test watering frequency input", () => {
  render(
    <Provider store={plantCareStore}>
      <BrowserRouter>
        <AddPlant />
      </BrowserRouter>
    </Provider>
  );
  const input = screen.getByTestId("watering-frequency");
  fireEvent.change(input, { target: { value: "7" } });
  expect(input.value).toBe("7");
});

//test for cancel button 
test("test cancel button", () => {
  render(
    <Provider store={plantCareStore}>
      <BrowserRouter>
        <AddPlant />
      </BrowserRouter>
    </Provider>
  );
  const cancelButton = screen.getByTestId("cancel");
  fireEvent.click(cancelButton);
  expect(cancelButton).toHaveTextContent("Cancel");
});

//test for add plant button
test("test add plant button", () => {
  render(
    <Provider store={plantCareStore}>
      <BrowserRouter>
        <AddPlant />
      </BrowserRouter>
    </Provider>
  );
  const addButton = screen.getByTestId("add plant");
  fireEvent.click(addButton);
  expect(addButton).toHaveTextContent("Add Plant");
});


