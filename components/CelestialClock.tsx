import React, { useState, useEffect } from 'react';
import { AstrolabeBackground } from './Decorations';

type PlanetType = 'month' | 'dayOfMonth' | 'dayOfWeek';

const Planet: React.FC<{ type: PlanetType }> = ({ type }) => {
    switch (type) {
        case 'month': // Mars-like
            return (
                <div className="w-full h-full rounded-full relative overflow-hidden" style={{ background: 'radial-gradient(circle, #f87171, #991b1b)' }}>
                    <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)' }}></div>
                    <div className="absolute w-1/2 h-1/2 bg-red-300/30 rounded-full blur-sm top-[15%] left-[20%]"></div>
                    <div className="absolute w-1/4 h-1/4 bg-red-200/20 rounded-full blur-md bottom-[20%] right-[25%]"></div>
                </div>
            );
        case 'dayOfMonth': // Earth-like
             return (
                <div className="w-full h-full rounded-full relative overflow-hidden" style={{ background: 'radial-gradient(circle, #7dd3fc, #1d4ed8)' }}>
                    <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.7)' }}></div>
                     <div className="absolute w-1/3 h-1/3 bg-white/50 rounded-full blur-sm top-[20%] left-[15%] transform rotate-45"></div>
                     <div className="absolute w-1/2 h-1/2 bg-green-300/30 rounded-full blur-md bottom-[15%] right-[10%] transform -rotate-30"></div>
                </div>
            );
        case 'dayOfWeek': // Mystic/Gas
            return (
                <div className="w-full h-full rounded-full relative overflow-hidden" style={{ background: 'radial-gradient(circle, #c084fc, #4338ca)' }}>
                    <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,0.6)' }}></div>
                    <div className="absolute w-full h-1/3 bg-purple-300/20 blur-sm top-[33%] transform skew-y-12"></div>
                </div>
            );
        default:
            return null;
    }
};

const OrbitingBody: React.FC<{ size: string; planetType: PlanetType; distance: string; }> = ({ size, planetType, distance }) => {
    const planetGlowColors = {
        month: 'rgba(248, 113, 113, 0.6)', // red-400
        dayOfMonth: 'rgba(56, 189, 248, 0.6)', // sky-400
        dayOfWeek: 'rgba(192, 132, 252, 0.6)', // purple-400
    };

    return (
        <div className="absolute" style={{ top: `calc(50% - ${distance} - (${size} / 2))`, left: `calc(50% - (${size} / 2))` }}>
            <div className="rounded-full" style={{ 
                width: size, 
                height: size, 
                boxShadow: `0 0 10px 2px ${planetGlowColors[planetType]}, 0 0 20px 5px ${planetGlowColors[planetType].replace('0.6', '0.2')}` 
            }}>
                <Planet type={planetType} />
            </div>
        </div>
    )
};

const RingLabels: React.FC<{
  labels: (string | number)[];
  radius: number;
  className?: string;
  startAngle?: number;
}> = ({ labels, radius, className, startAngle = -90 }) => {
  const count = labels.length;
  return (
    <>
      {labels.map((label, i) => {
        const angle = startAngle + (i / count) * 360;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        return (
          <div
            key={`label-${i}`}
            className={`absolute top-1/2 left-1/2 w-8 h-8 flex items-center justify-center ${className}`}
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            }}
          >
            {label}
          </div>
        );
      })}
    </>
  );
};

export const CelestialClock: React.FC = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11
    const dayOfMonth = date.getDate(); // 1-31
    const dayOfWeek = date.getDay(); // 0-6 (Sun-Sat)
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const fractionOfDay = (hours * 3600 + minutes * 60 + seconds) / 86400;

    const monthRotation = ((month + (dayOfMonth - 1) / daysInMonth) / 12) * 360;
    const dayOfMonthRotation = ((dayOfMonth - 1 + fractionOfDay) / daysInMonth) * 360;
    const dayOfWeekRotation = ((dayOfWeek + fractionOfDay) / 7) * 360;

    return (
        <div className="w-[450px] h-[450px] relative flex items-center justify-center">
            <style>
            {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 20px 10px rgba(251, 191, 36, 0.3), 0 0 40px 20px rgba(251, 191, 36, 0.15); opacity: 0.9; }
                    50% { transform: scale(1.05); box-shadow: 0 0 30px 15px rgba(251, 191, 36, 0.4), 0 0 50px 25px rgba(251, 191, 36, 0.2); opacity: 1; }
                }
            `}
            </style>
            
            <AstrolabeBackground className="absolute w-full h-full text-slate-500/50" />

             {/* Static Labels */}
            <div className="absolute w-full h-full pointer-events-none">
                <RingLabels
                    labels={['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']}
                    radius={165}
                    className="text-slate-400 text-sm"
                />
                 {
                    [1, 5, 10, 15, 20, 25, 30].map(day => {
                        const angle = -90 + ((day - 1) / daysInMonth) * 360; 
                        const radius = 112;
                        const x = radius * Math.cos((angle * Math.PI) / 180);
                        const y = radius * Math.sin((angle * Math.PI) / 180);
                        return (
                        <div
                            key={`day-${day}`}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 text-xs"
                            style={{
                            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                            }}
                        >
                            {day}
                        </div>
                        );
                    })
                }
                <RingLabels
                    labels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                    radius={75}
                    className="text-slate-400 text-xs font-bold"
                />
            </div>

            {/* Central Orb - Sun */}
            <div className="w-32 h-32 rounded-full bg-yellow-500/30 relative overflow-hidden flex items-center justify-center shadow-[0_0_30px_10px_rgba(251,191,36,0.3)]">
                <div 
                    className="absolute w-full h-full rounded-full" 
                    style={{
                        background: 'radial-gradient(circle, rgba(254,249,195,1) 0%, rgba(251,191,36,1) 40%, rgba(245,158,11,1) 70%, rgba(217,119,6,0.8) 100%)',
                        animation: 'pulse-glow 4s ease-in-out infinite'
                    }} 
                />
                 <div 
                    className="absolute w-full h-full rounded-full opacity-50"
                    style={{ 
                        background: `
                            radial-gradient(circle at 30% 30%, white 0%, transparent 8%),
                            radial-gradient(circle at 70% 60%, white 0%, transparent 6%)
                        `,
                        animation: 'spin 20s linear infinite reverse'
                    }}
                />
                <div className="w-20 h-20 bg-yellow-100 rounded-full blur-lg opacity-80"></div>
            </div>

            {/* Celestial Bodies & Rings */}
            <div className="w-full h-full absolute transition-transform duration-1000 ease-linear" style={{ transform: `rotate(${monthRotation}deg)` }}>
                <OrbitingBody size="20px" planetType="month" distance="180px" />
                <div className="w-[85%] h-[85%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-600/70"></div>
            </div>
            <div className="w-full h-full absolute transition-transform duration-1000 ease-linear" style={{ transform: `rotate(${dayOfMonthRotation}deg)` }}>
                 <OrbitingBody size="14px" planetType="dayOfMonth" distance="130px" />
                 <div className="w-[65%] h-[65%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-500/60"></div>
            </div>
             <div className="w-full h-full absolute transition-transform duration-1000 ease-linear" style={{ transform: `rotate(${dayOfWeekRotation}deg)` }}>
                 <OrbitingBody size="8px" planetType="dayOfWeek" distance="90px" />
                 <div className="w-[45%] h-[45%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-400/50"></div>
            </div>

            {/* Ornate Frame */}
            <div className="absolute w-[95%] h-[95%] rounded-full border-4 border-amber-800/50 shadow-inner shadow-black"></div>
            <div className="absolute w-full h-full rounded-full border-2 border-slate-400/70 "></div>

        </div>
    );
};