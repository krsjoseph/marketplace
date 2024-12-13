import React from 'react';
const avatarStyles = ['adventurer', 'avataaars', 'bottts', 'funEmoji', 'lorelei', 'notionists', 'openPeeps', 'personas', 'pixelArt'] as const;
const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
const seed = Math.random().toString(36).substring(7);

const UserAvatar = () => {
  return (
    <div className="h-8 w-8 rounded-full overflow-hidden">
      <img
        src={`https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}&backgroundColor=purple`}
        alt="User avatar"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default UserAvatar;
