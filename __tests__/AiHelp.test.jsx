import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { renderWithProviders } from "../test-utils/mockStore";
import AiHelp from "@/app/aihelp/page";

// Mock axios
jest.mock("axios");

// Mock Card component
jest.mock("@/components/Card", () => {
    return function MockCard({ product }) {
        return <div data-testid="mock-card">{product.name}</div>;
    };
});

// Mock framer-motion is already handled in jest.setup.js

describe("AI Help Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const preloadedState = {
        data: { products: [] },
        cart: { cart: [] },
        like: { likes: [] },
    };

    test("renders initial state correctly", () => {
        renderWithProviders(<AiHelp />, { preloadedState });

        expect(screen.getByText(/AI Shoe Assistant/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/e\.g\. comfortable running shoes for men/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
    });

    test("updates input value on change", () => {
        renderWithProviders(<AiHelp />, { preloadedState });

        const input = screen.getByPlaceholderText(/e\.g\. comfortable running shoes for men/i);
        fireEvent.change(input, { target: { value: "running shoes" } });
        expect(input.value).toBe("running shoes");
    });

    test("shows error when searching with empty input", () => {
        renderWithProviders(<AiHelp />, { preloadedState });

        const searchButton = screen.getByRole("button", { name: /Search/i });
        fireEvent.click(searchButton);

        expect(screen.getByText(/Please enter what you're looking for/i)).toBeInTheDocument();
    });

    test("performs search successfully and displays results", async () => {
        const mockProducts = [
            { id: "1", name: "Speedy Shoe", price: 120 },
            { id: "2", name: "Cloud Walker", price: 150 },
        ];
        axios.post.mockResolvedValueOnce({ data: mockProducts });

        renderWithProviders(<AiHelp />, { preloadedState });

        const input = screen.getByPlaceholderText(/e\.g\. comfortable running shoes for men/i);
        const searchButton = screen.getByRole("button", { name: /Search/i });

        fireEvent.change(input, { target: { value: "sporty shoes" } });
        fireEvent.click(searchButton);

        // Check loading state
        expect(screen.getByText(/AI is thinking/i)).toBeInTheDocument();

        // Wait for results
        await waitFor(() => {
            expect(screen.getAllByTestId("mock-card")).toHaveLength(2);
        });

        expect(screen.getByText("Speedy Shoe")).toBeInTheDocument();
        expect(screen.getByText("Cloud Walker")).toBeInTheDocument();
        expect(axios.post).toHaveBeenCalledWith("/ai/api", { userNeed: "sporty shoes" });
    });

    test("shows error message on search failure", async () => {
        axios.post.mockRejectedValueOnce(new Error("Network Error"));

        renderWithProviders(<AiHelp />, { preloadedState });

        const input = screen.getByPlaceholderText(/e\.g\. comfortable running shoes for men/i);
        const searchButton = screen.getByRole("button", { name: /Search/i });

        fireEvent.change(input, { target: { value: "shoes" } });
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.getByText(/Something went wrong\. Try again\./i)).toBeInTheDocument();
        });
    });

    test("shows empty results message when no matches found", async () => {
        axios.post.mockResolvedValueOnce({ data: [] });

        renderWithProviders(<AiHelp />, { preloadedState });

        const input = screen.getByPlaceholderText(/e\.g\. comfortable running shoes for men/i);
        const searchButton = screen.getByRole("button", { name: /Search/i });

        fireEvent.change(input, { target: { value: "unknown" } });
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.getByText(/No shoes matched your request/i)).toBeInTheDocument();
        });
    });

    test("triggers search on Enter key press", async () => {
        axios.post.mockResolvedValueOnce({ data: [] });

        renderWithProviders(<AiHelp />, { preloadedState });

        const input = screen.getByPlaceholderText(/e\.g\. comfortable running shoes for men/i);
        fireEvent.change(input, { target: { value: "shoes" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
        });
    });
});
