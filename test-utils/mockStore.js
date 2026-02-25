import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/lib/reducer/productSlice';
import cartReducer from '@/lib/reducer/cartSlice';
import wishListReducer from '@/lib/reducer/wishListSlice';
import emailSendSlice from '@/lib/reducer/emailSendSlice';
import orderSlice from '@/lib/reducer/orderSlice';

/**
 * Reusable test utility to render components with a mocked Redux store.
 */
export const renderWithProviders = (
    ui,
    {
        preloadedState = {},
        // Ability to pass a custom store if needed, otherwise creates one
        store = configureStore({
            reducer: {
                data: productReducer,
                cart: cartReducer,
                like: wishListReducer,
                email: emailSendSlice,
                order: orderSlice,
            },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) => {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const createMockStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            data: productReducer,
            cart: cartReducer,
            like: wishListReducer,
            email: emailSendSlice,
            order: orderSlice,
        },
        preloadedState,
    });
};
