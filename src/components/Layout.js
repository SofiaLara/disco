import React from 'react';

function Layout({ children }) {
    return (
        <div>
            <header>
                <h1>Art Institute of Chicago</h1>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;
