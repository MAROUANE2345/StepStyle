import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

// Mock next/link to simplify DOM structure
jest.mock('next/link', () => {
    return ({ children, href }) => <a href={href}>{children}</a>;
});

describe('Footer component', () => {
    it('should render the brand identity correctly', () => {
        render(<Footer />);
        expect(screen.getByText('Step')).toBeInTheDocument();
        expect(screen.getByText('Style')).toBeInTheDocument();
    });

    it('should render all auxiliary navigation links with correct targets', () => {
        render(<Footer />);

        const catalogueLink = screen.getByText('Catalogue');
        expect(catalogueLink).toBeInTheDocument();
        expect(catalogueLink.closest('a')).toHaveAttribute('href', '/catalogue');

        const aboutLink = screen.getByText('About');
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink.closest('a')).toHaveAttribute('href', '/aboutus');

        const contactLink = screen.getByText('Contact');
        expect(contactLink).toBeInTheDocument();
        expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');

        const aiHelpLink = screen.getByText('AI Help');
        expect(aiHelpLink).toBeInTheDocument();
        expect(aiHelpLink.closest('a')).toHaveAttribute('href', '/aihelp');
    });

    it('should display the dynamic copyright notice for the current year', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
        expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    });

    it('should render social media accessibility labels', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    });
});
