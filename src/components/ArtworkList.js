import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtworks } from '../slices/artworksSlice';
import { Link } from 'react-router-dom';
import Layout from './Layout';

function ArtworkList() {
    const dispatch = useDispatch();

    // Get artworks, status, and error from the Redux store
    const { list: artworks, status, error } = useSelector(state => state.artworks);

    // Fetch artworks when the component mounts
    useEffect(() => {
        // Triggers the getArtworks action only if the status is 'idle'
        if (status === 'idle') {
            dispatch(getArtworks());
        }
    }, [status, dispatch, artworks.length]);

    // Function to render content depending on the status
    const renderContent = () => {
        switch (status) {
            case 'loading':
                return <div aria-live="polite">Loading artworks...</div>;
            case 'succeeded':
                return (
                    <ul aria-label="List of Artworks">
                        {artworks.map(artwork => (
                            <li key={artwork.id}>
                                <Link to={`/artwork/${artwork.id}`} aria-label={`View details for ${artwork.title}`}>
                                    {artwork.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                );
            case 'failed':
                return <div role="alert">Sorry, {error}</div>;
            default:
                return null;
        }
    };

    return (
        <Layout>
            {renderContent()}
        </Layout>
    );
}

export default ArtworkList;
