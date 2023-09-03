import React from 'react';
import { Provider } from 'react-redux';
import { render, screen} from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import ArtworkList from '../components/ArtworkList';
import { MemoryRouter } from 'react-router-dom';

// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({
    artworks: {
        list: [{ id: 1, title: 'Artwork 1' }, { id: 2, title: 'Artwork 2' }],
        status: 'succeeded',
        error: null,
    },
});

test('displays artworks when loaded', async () => {
    render(
        <Provider store={store}>
          <MemoryRouter>
            <ArtworkList />
          </MemoryRouter>
        </Provider>
    );
    
    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Artwork 1');
    expect(items[1]).toHaveTextContent('Artwork 2');
});
