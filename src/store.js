import { configureStore } from '@reduxjs/toolkit';
import artworksReducer from './slices/artworksSlice';

const store = configureStore({
    reducer: {
        artworks: artworksReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
