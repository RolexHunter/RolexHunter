
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ClockIcon, Squares2X2Icon, CircleStackIcon } from '@heroicons/react/24/solid'; // Using solid icons for active state

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center p-2 w-1/4 transition-colors duration-200
         ${isActive ? 'text-primary' : 'text-on-surface-muted hover:text-on-surface'}`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

const BottomNavigation: React.FC = () => {
  return (
    <nav className="bg-surface shadow-t-md border-t border-gray-700 flex justify-around items-center h-16 sticky bottom-0 z-10">
      <NavItem to="/home" icon={<HomeIcon className="w-6 h-6" />} label="Home" />
      <NavItem to="/recent" icon={<ClockIcon className="w-6 h-6" />} label="Recent" />
      <NavItem to="/categories" icon={<Squares2X2Icon className="w-6 h-6" />} label="Categories" />
      <NavItem to="/storage" icon={<CircleStackIcon className="w-6 h-6" />} label="Storage" />
    </nav>
  );
};

export default BottomNavigation;
