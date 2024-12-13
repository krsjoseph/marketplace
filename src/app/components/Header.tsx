import React from 'react';
import AmbossLogo from '../img/logo';
import DashboardButton from './DashboardButton';
import Image from 'next/image';

import userAvatarImage from '../img/user.png';

const UserAvatar: React.FC = ({
}) => {
  return (
    <div className="h-8 w-8 rounded-full overflow-hidden">
      <Image
        src={userAvatarImage}
        alt="User avatar"
        className="object-cover"
      />
    </div>
  );
};

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ search, onSearchChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="w-full border-b border-white/10">
      <div className="mx-auto w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-8">
              <AmbossLogo />
              <nav className="flex gap-12 ">
                {['Products', 'Marketplace', 'Stats', 'Pricing', 'Communities'].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-[#A3A3A3] hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">

                <input
                  type="search"
                  placeholder="Search"
                  className="w-64 bg-transparent border border-[#5D5D5D] pl-4 pr-4 py-2 text-sm text-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                  value={search}
                  onChange={handleSearchChange}
                  aria-label="Search"
                />
                <svg
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#FFF"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>


              <DashboardButton onClick={() => { }} />
              <UserAvatar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;