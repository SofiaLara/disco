import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArtworks, fetchArtworkById } from '../services/api';

export const getArtworks = createAsyncThunk(
    'artworks/getArtworks',
    async () => {
        const {data} = await fetchArtworks();
        return data.data;
    }
);

export const getArtworkDetail = createAsyncThunk(
    'artworks/getArtworkDetail',
    async (id) => {
        const {data} = await fetchArtworkById(id);
        return data.data;
    }
);

const initialState = {
    list: [],
    details: {},
    status: 'idle',
    error: null
};

const artworksSlice = createSlice({
    name: 'artworks',
    initialState,
    reducers: {
        resetState: state => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArtworks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getArtworks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(getArtworks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getArtworkDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getArtworkDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.details[action.payload.id] = action.payload;
            })
            .addCase(getArtworkDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { resetState } = artworksSlice.actions;
export default artworksSlice.reducer;
