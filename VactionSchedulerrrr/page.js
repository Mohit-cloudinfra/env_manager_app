'use client';

import { useEffect, useState } from 'react';
import VacationSchedulerUI from './VacationSchedulerUI';
import VacationSchedulerMobileUI from './VacationSchedulerMobileUI';

function VactionScheduler() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to detect mobile devices using userAgent
        const detectMobileDevice = () => {
            const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";
            return /Mobi|Android|iPhone|iPad/i.test(userAgent);
        };

        // Function to check screen width
        const handleResize = () => {
            setIsMobile(detectMobileDevice() || window.innerWidth <= 768); // Set based on device or screen width
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); // Listen for screen resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup
        };
    }, []);
    return (
        <div className='w-100' style={{height:"100vh"}}>
            {isMobile ? <VacationSchedulerMobileUI  /> : <VacationSchedulerUI />}
        </div>
    );
};

export default VactionScheduler;