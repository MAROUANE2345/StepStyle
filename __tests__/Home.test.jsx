import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils/mockStore";
import Home from "@/app/page";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: mockPush }),
    usePathname: () => "/",
}));

// Mock useDispatch to avoid side effects
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

describe("Home Page Component", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders hero section with headline, description, and buttons", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText(/Step Into Confidence/i)).toBeInTheDocument();
        expect(screen.getByText(/Discover premium footwear/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Shop Now/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Search with AI/i })).toBeInTheDocument();
    });

    it("renders the 'Designed for Every Step' features section", () => {
        renderWithProviders(<Home />);
        const features = ["Premium Materials", "All-Day Comfort", "Modern Style"];
        features.forEach(feature => {
            expect(screen.getByText(feature)).toBeInTheDocument();
        });
    });

    it("renders loading state for Best Sellers when products are loading", () => {
        const preloadedState = { data: { products: [], loading: true, error: null } };
        renderWithProviders(<Home />, { preloadedState });
        expect(screen.getByText(/Loading best sellers/i)).toBeInTheDocument();
    });

    it("renders products when best sellers are available", () => {
        const mockProducts = [
            { id: "1", name: "Ultra Boost", category: "Running", price: 180, img: "/shoe.jpg" },
            { id: "2", name: "Air Max", category: "Lifestyle", price: 150, img: "/shoe2.jpg" }
        ];
        const preloadedState = { data: { products: mockProducts, loading: false, error: null } };
        renderWithProviders(<Home />, { preloadedState });

        mockProducts.forEach(product => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        });
    });

    it("renders category preview sections", () => {
        renderWithProviders(<Home />);
        // There are multiple "Men's Collection" texts (title and image alt)
        const men = screen.getAllByText(/Men's Collection/i)[0];
        const women = screen.getAllByText(/Women's Collection/i)[0];
        const kids = screen.getAllByText(/Kids Collection/i)[0];

        [men, women, kids].forEach(section => expect(section).toBeInTheDocument());
    });

    it("renders Explore Our Collection section with correct links", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText(/Explore Our Collection/i)).toBeInTheDocument();

        // Check links by href
        const menLink = screen.getByRole('link', { name: /Men's Collection Stylish shoes designed for comfort and daily life\./i });
        expect(menLink).toHaveAttribute("href", "/catalogue?filter=Men");

        const womenLink = screen.getByRole('link', { name: /Women's Collection Elegant shoes for style and all-day comfort\./i });
        expect(womenLink).toHaveAttribute("href", "/catalogue?filter=Women");

        const kidsLink = screen.getByRole('link', { name: /Kids Collection Fun, comfortable shoes for kids of all ages\./i });
        expect(kidsLink).toHaveAttribute("href", "/catalogue?filter=Kids");
    });

    it("renders 'Find Your Perfect Pair' call-to-action section", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText(/Find Your Perfect Pair/i)).toBeInTheDocument();
        const browseButton = screen.getByRole("link", { name: /Browse Shoes/i });
        expect(browseButton).toBeInTheDocument();
        expect(browseButton).toHaveAttribute("href", "/catalogue");
    });

    it("renders About Us and Contact Us sections at the bottom", () => {
        renderWithProviders(<Home />);
        const about = screen.getByRole("link", { name: /About Us/i });
        const contact = screen.getByRole("link", { name: /Contact Us/i });
        expect(about).toBeInTheDocument();
        expect(contact).toBeInTheDocument();
    });
});