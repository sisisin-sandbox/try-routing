import React from 'react';
import { Link } from 'react-router-dom';
import { useActions } from 'typeless';
import { SessionActions } from '~/features/session/interface';

export function Header() {
  const { logout } = useActions(SessionActions);
  const links = [
    { path: '/', content: 'home' },
    { path: '/groups' },
    { path: '/etc' },
    { path: '/profile' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid black' }}>
      <div style={{ flex: 'auto' }}>
        {links.map((l, i) => (
          <React.Fragment key={l.path}>
            <Link to={l.path}>{l.content ?? l.path}</Link>
            {i < links.length - 1 && ' | '}
          </React.Fragment>
        ))}
      </div>
      <div style={{ flex: 'auto', maxWidth: '100px' }}>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}
