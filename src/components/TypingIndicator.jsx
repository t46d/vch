import React from 'react';

export default function TypingIndicator({ users = [] }) {
  if (!users || users.length === 0) return null;
  const display = users.slice(0,3); // show up to 3 users
  return (
    <div className="px-2 py-1 text-sm text-gray-300 flex items-center gap-2">
      <div className="flex items-center gap-2">
        {display.map(u => (
          <div key={u.id} className="flex items-center gap-2">
            {u.avatar_url ? (
              <img src={u.avatar_url} alt={u.name || 'avatar'} className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300">{(u.name||'?').slice(0,1).toUpperCase()}</div>
            )}
          </div>
        ))}
        <div className="ml-2">{display.length === 1 ? `${display[0].name || 'Someone'} is typing` : `${display.length} users are typing`}</div>
        <div className="ml-3 flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
