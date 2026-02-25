// __tests__/Navbar.test.jsx
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { renderWithProviders } from "../test-utils/mockStore";

// Mock next/navigation at the top level
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    usePathname: () => "/",
}));

describe("Navbar", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const preloadedState = {
        data: { products: [] },
        cart: { cart: [], Price: 0 },
        like: { likes: [] },
        email: {},
        order: {},
    };

    test("renders StepStyle logo", () => {
        renderWithProviders(<Navbar />, { preloadedState });
        const logo = screen.getByTestId("logo");
        expect(logo).toBeInTheDocument();
    });

    test("renders all navigation links", () => {
        renderWithProviders(<Navbar />, { preloadedState });
        const links = ["Home", "Catalogue", "AI Help", "Contact Us", "About Us"];
        links.forEach((link) => {
            // Use getAllByText as they might be in both desktop and mobile drawer
            expect(screen.getAllByText(link)[0]).toBeInTheDocument();
        });
    });

    test("shows correct cart quantity", () => {
        const state = {
            ...preloadedState,
            cart: { cart: [{ id: 1, quantity: 3 }], Price: 100 }
        };
        renderWithProviders(<Navbar />, { preloadedState: state });
        // Total quantity should be 3
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    test("navigates to home when logo clicked", () => {
        renderWithProviders(<Navbar />, { preloadedState });
        const logo = screen.getByTestId("logo");
        fireEvent.click(logo);
        expect(mockPush).toHaveBeenCalledWith("/");
    });

    test("navigates to wishlist when heart clicked", () => {
        renderWithProviders(<Navbar />, { preloadedState });
        const heart = screen.getByTestId("heart-icon");
        fireEvent.click(heart);
        expect(mockPush).toHaveBeenCalledWith("/wishlist");
    });

    test("navigates to admin when user icon clicked", () => {
        renderWithProviders(<Navbar />, { preloadedState });
        const user = screen.getByTestId("user-icon");
        fireEvent.click(user);
        expect(mockPush).toHaveBeenCalledWith("/admin");
    });

    test("toggles mobile menu", () => {
        renderWithProviders(<Navbar />, { preloadedState });
        const toggle = screen.getByLabelText("Toggle menu");

        // The mobile drawer is the one with transition-transform and translate-x-full/0
        // We check the drawer element directly
        const mobileMenu = document.querySelector('.translate-x-full');
        expect(mobileMenu).toBeInTheDocument();

        fireEvent.click(toggle);

        // After click, it should have translate-x-0
        const openedMenu = document.querySelector('.translate-x-0');
        expect(openedMenu).toBeInTheDocument();
    });
});