import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const userListMock = [
  {
    id: 1,
    name: "Deepak",
  },
];

const mockFetch = () => ({
  ok: true,
  json: async () => userListMock,
});

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("Should render sucess fully", () => {
  expect(screen.getByTestId("add-campaign-section")).toBeInTheDocument();
  expect(screen.getByTestId("campaign-list-section")).toBeInTheDocument();
  expect(screen.getByTestId("add-campaign-input")).toBeInTheDocument();
  expect(screen.getByTestId("add-campaign-button")).toBeInTheDocument();
});

test("Should Button be diabled when no campaign data", () => {
  expect(screen.getByTestId("add-campaign-button")).toHaveAttribute("disabled");
});
test("Should Button be enabled when when adding campaign data", () => {
  fireEvent.change(screen.getByTestId("add-campaign-input"), {
    target: { value: "{}" },
  });
  expect(screen.getByTestId("add-campaign-button")).not.toHaveAttribute(
    "disabled"
  );
});
test("Should show error on clicking with invalid data", () => {
  fireEvent.change(screen.getByTestId("add-campaign-input"), {
    target: { value: "{}" },
  });
  fireEvent.click(screen.getByTestId("add-campaign-button"));
  expect(screen.getByTestId("add-campaign-error")).toBeInTheDocument();
});
test("Should show success on clicking with valid campaign data", () => {
  const mockCampaignData = JSON.stringify({
    id: 100,
    name: "Divavu",
    startDate: "9/19/2021",
    endDate: "3/9/2023",
    Budget: 88377,
    userId: 3,
  });
  fireEvent.change(screen.getByTestId("add-campaign-input"), {
    target: { value: mockCampaignData },
  });
  fireEvent.click(screen.getByTestId("add-campaign-button"));
  expect(screen.getByTestId("add-campaign-success")).toBeInTheDocument();
});
test("Should show error when start date is greater than end date", () => {
  const mockCampaignData = {
    id: 101,
    name: "Divavu",
    endDate: "9/19/2021",
    startDate: "3/9/2023",
    Budget: 88377,
    userId: 3,
  };
  fireEvent.change(screen.getByTestId("add-campaign-input"), {
    target: { value: mockCampaignData },
  });
  fireEvent.click(screen.getByTestId("add-campaign-button"));
  expect(screen.getByTestId("add-campaign-error")).toBeInTheDocument();
});
test("Should show error when adding a campaign with same id", () => {
  const mockCampaignData = {
    id: 102,
    name: "Divavu",
    startDate: "9/19/2021",
    endDate: "3/9/2023",
    Budget: 88377,
    userId: 3,
  };
  fireEvent.change(screen.getByTestId("add-campaign-input"), {
    target: { value: mockCampaignData },
  });
  fireEvent.click(screen.getByTestId("add-campaign-button"));
  expect(screen.getByTestId("add-campaign-success")).toBeInTheDocument();
  fireEvent.change(screen.getByTestId("add-campaign-input"), {
    target: { value: mockCampaignData },
  });
  fireEvent.click(screen.getByTestId("add-campaign-button"));
  expect(screen.getByTestId("add-campaign-error")).toBeInTheDocument();
});
