import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtworkDetail } from '../slices/artworksSlice';
import { useParams, Link } from 'react-router-dom';
import Layout from './Layout';
import placeholder from '../img/image-placeholder.png'

function ArtworkDetail() {
    const dispatch = useDispatch();
    
    // Fetch the artwork ID from the URL params
    const { id } = useParams();
    
    // Select detailed artwork, status, and potential error from the Redux state
    const { status, error, details } = useSelector(state => state.artworks);
    const artworkDetail = details[id];

    console.log(details, 'deets')

    useEffect(() => {
        console.log(artworkDetail, 'artwork deet')
        // Fetch the artwork detail only if not available in Redux store or if the ID doesn't match.
        if (!artworkDetail) {
            dispatch(getArtworkDetail(id));
        }
    }, [dispatch, id, artworkDetail]);

    // Render content based on the API call's status
    const renderContent = () => {
        switch (status) {
            case 'loading':
                return <div aria-live="polite">Loading artwork details...</div>;
            case 'succeeded':
                if (artworkDetail) {
                    return (
                        <div>
                            <h2>{artworkDetail.title}</h2>
                            <div className="artwork-wrapper">
                                <div className="artwork-wrapper-img">
                                    <img src={artworkDetail.image_id ? `https://www.artic.edu/iiif/2/${artworkDetail.image_id}/full/843,/0/default.jpg`: `${placeholder}`}
                                        alt={artworkDetail.thumbnail ? artworkDetail.thumbnail.alt_text : artworkDetail.title}
                                        height={artworkDetail.thumbnail ? artworkDetail.thumbnail.height : 200}
                                        width={artworkDetail.thumbnail ? artworkDetail.thumbnail.width : 200}
                                    />
                                </div>
                                <div className="artwork-wrapper-description">
                                    <p>{artworkDetail.artist_title}</p>
                                    <p>{artworkDetail.artist_display}</p>
                                    <p>{artworkDetail.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            case 'failed':
                return <div role="alert">Error fetching artwork details: {error}</div>;
            default:
                return null;
        }
    };

    return (
        <Layout>
            {renderContent()}
            <div className='button-cta'><Link to="/">Back to Artworks List</Link></div>
        </Layout>
    );
}

export default ArtworkDetail;
