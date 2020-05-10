import React from 'react';
import { Link } from 'react-router-dom';
import { useActions } from 'typeless';
import { SessionActions } from '~/features/session/interface';

export function Header() {
  const { logout } = useActions(SessionActions);
  const links = [
    { path: '/', content: 'home' },
    { path: '/groups/list' },
    { path: '/etc' },
    { path: '/login' },
  ];
  return (
    <>
      <div>
        <button onClick={logout}>logout</button>
      </div>
      {links.map((l, i) => (
        <React.Fragment key={l.path}>
          <Link to={l.path}>{l.content ?? l.path}</Link>
          {i < links.length - 1 && ' | '}
        </React.Fragment>
      ))}
      <hr></hr>
    </>
  );
}
