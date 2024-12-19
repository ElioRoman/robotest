import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ItemsPage from "../items/page.js";
import itemsReducer from "../store/features/items/itemsSlice";
import authReducer from "../store/features/auth/authSlice";

// Mocking the useRouter hook from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ItemsPage", () => {
  const renderWithStore = (store) => {
    return render(
      <Provider store={store}>
        <ItemsPage />
      </Provider>
    );
  };

  test("displays items correctly", () => {
    const initialItems = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

    // Set the `isLoggedIn` state in auth slice to simulate a logged-in user
    const store = configureStore({
      reducer: {
        items: itemsReducer,
        auth: authReducer,
      },
      preloadedState: {
        items: { items: initialItems },
        auth: { isLoggedIn: true },
      },
    });

    // Mock the useRouter hook to prevent the routing error
    const mockPush = jest.fn();
    require("next/navigation").useRouter.mockReturnValue({
      push: mockPush,
    });

    renderWithStore(store);

    // Check if both items are rendered in the list
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
