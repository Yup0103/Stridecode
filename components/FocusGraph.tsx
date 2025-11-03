import React from 'react';

// Mock data for the graph
const FOCUS_DATA = [60, 65, 75, 70, 85, 90, 80, 75, 65, 50, 55, 60, 70];

const FocusGraph: React.FC = () => {
    const width = 350;
    const height = 120;
    const padding = 10;

    const dataPoints = FOCUS_DATA.map((value, index) => ({
        x: (width / (FOCUS_DATA.length - 1)) * index,
        y: height - (value / 100) * (height - padding * 2) - padding,
    }));

    const pathD = dataPoints.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).join(' ');
    
    const areaPathD = `${pathD} V ${height} L ${dataPoints[0].x} ${height} Z`;

    // Simulate current time, placing the marker around the dip in focus
    const currentTimeIndex = 9;
    const markerPoint = dataPoints[currentTimeIndex];

    return (
        <div className="bg-dark-card p-4 rounded-2xl border border-dark-border relative overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00A9B0" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#111111" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3FB950" />
                        <stop offset="100%" stopColor="#00A9B0" />
                    </linearGradient>
                </defs>

                {/* Area under the curve */}
                <path d={areaPathD} fill="url(#areaGradient)" />

                {/* Main line graph */}
                <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Current time marker line */}
                <line x1={markerPoint.x} y1="0" x2={markerPoint.x} y2={height} stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-medium-text/50" />
                
                {/* Current time marker point */}
                <circle cx={markerPoint.x} cy={markerPoint.y} r="5" fill="#111111" stroke="#00A9B0" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-2 right-4 text-xs text-medium-text font-mono">
                Focus dipping...
            </div>
        </div>
    );
};

export default FocusGraph;
