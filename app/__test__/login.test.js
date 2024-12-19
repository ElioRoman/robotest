import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginPage from "../login/page.js";
import authReducer from "../store/features/auth/authSlice.js";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  let mockRouterPush;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: mockRouterPush });
  });

  const renderWithProviders = (ui, { store } = {}) => {
    const defaultStore = configureStore({
      reducer: { auth: authReducer },
    });
    return render(<Provider store={store || defaultStore}>{ui}</Provider>);
  };

  test("does not proceed with invalid email", async () => {
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Simulate invalid email input and form submission
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(loginButton);
    });

    // Assert that the validation error message is displayed
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();

    // Ensure router navigation was not called
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
