import React from 'react';
import { Route, BrowserRouter, Switch, Link, useRouteMatch } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Switch>
        <Route path="/" exact>
          <InnerWrapper>
            <Home></Home>
          </InnerWrapper>
        </Route>
        <Route path="/groups">
          <InnerWrapper>
            <Groups></Groups>
          </InnerWrapper>
        </Route>
        <Route>
          <InnerWrapper>
            <div>not found</div>
          </InnerWrapper>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const InnerWrapper: React.FC = ({ children }) => {
  return (
    <div>
      <b>inner</b> <MatchResult></MatchResult>
      {children}
    </div>
  );
};

function Home() {
  return (
    <>
      <div>slash</div>
      <MatchResult></MatchResult>
    </>
  );
}
function MatchResult() {
  const m = useRouteMatch();

  return (
    <>
      match result -> <pre>{JSON.stringify(m)}</pre>
    </>
  );
}
function Header() {
  return (
    <>
      <MatchResult></MatchResult>
      <Link to="/etc">etc</Link> | <Link to="/groups/list">/groups/list</Link> |{' '}
      <Link to="/">home</Link>
      <hr></hr>
    </>
  );
}
function Groups() {
  return (
    <>
      <div>groups</div>
      <Route path="/groups/list">
        <div>
          this is list
          <div>
            <MatchResult></MatchResult>
          </div>
        </div>
      </Route>
      <Route path="/groups/new">
        <div>this is new</div>
      </Route>
    </>
  );
}
