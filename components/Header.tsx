import React from 'react';
import { BASE_PATH } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <img
            src={`${BASE_PATH}assets/challenge_banner.png`}
            alt="GENEA Gesture Generation Challenge banner"
            className="w-full object-cover"
          />
          <div
            className="absolute top-0 left-0 right-0 flex flex-col justify-between px-6 py-10"
            style={{ height: '80%', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
            <div>
              <h1 className="text-6xl font-extrabold tracking-tight text-white leading-relaxed">
                The 4th GENEA
              </h1>
              <h1 className="text-6xl font-extrabold tracking-tight text-white leading-relaxed">
                Gesture Generation
              </h1>
              <h1 className="text-6xl font-extrabold tracking-tight text-white leading-relaxed">
                Challenge
              </h1>
            </div>
            <div>
              <hr className="mb-3 border-white/40 w-48" />
              <p className="text-2xl font-semibold text-white/90 leading-relaxed">
                Interactive Social Agents Workshop
              </p>
              <p className="text-2xl font-semibold text-white/90 leading-relaxed">
                September 8-9, 2026
              </p>
              <p className="text-2xl font-semibold text-white/90 leading-relaxed">
                ECCV 2026 in Malmö, Sweden
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;