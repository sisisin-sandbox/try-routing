import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export function MatchResult() {
  const m = useRouteMatch();

  return (
    <>
      match result -> <span>{JSON.stringify(m)}</span>
    </>
  );
}
