// Tiny stroke-based icon set, one function per glyph, sharing the same
// 24x24 viewBox convention. Keeping these together avoids re-pasting the
// same SVG path data inside every component that needs a search/cart icon.
function Icon({ path, className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
  );
}

export const LocationPinIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
export const ChevronDownIcon = (props) => <Icon {...props} path="M19 9l-7 7-7-7" />;
export const ChevronLeftIcon = (props) => <Icon {...props} path="M15 19l-7-7 7-7" />;
export const ChevronRightIcon = (props) => <Icon {...props} path="M9 5l7 7-7 7" />;
export const SearchIcon = (props) => <Icon {...props} path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />;
export const TrackIcon = (props) => <Icon {...props} path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />;
export const CartIcon = (props) => <Icon {...props} path="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />;
export const UserIcon = (props) => <Icon {...props} path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
export const MenuIcon = (props) => <Icon {...props} path="M4 6h16M4 12h16M4 18h16" />;
