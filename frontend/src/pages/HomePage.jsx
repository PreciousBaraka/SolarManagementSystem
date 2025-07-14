import React from 'react';
import { images } from '../lib/constants'; 

function HomePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">
                Welcome to the Solar Management System
            </h1>
            <p className="text-center text-gray-600 mt-4">
                Manage your solar energy business efficiently.
            </p>
            <div className="flex justify-center mt-8">
                <img
                    src={images.logo}
                    alt="Solar Company Logo"
                    className="h-32 w-32 rounded-full object-cover shadow-lg"
                />
            </div>
            
        </div>
    );
}

export default HomePage;
