import React from 'react';
import { Redirect, Route, Router, Switch, Link, useParams } from 'react-router-dom';
import { useActions } from 'typeless';
import { MatchResult } from '~/components/MatchResult';
import { appHistory } from './appHistory';
import { Header } from './components/Header';
import { getSessionState, SessionActions } from './features/session/interface';
import { useSessionModule } from './features/session/module';

export const App: React.FC = () => {
  useSessionModule();

  return (
    <Router history={appHistory}>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/">
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
        </Route>
        <Route>
          <InnerWrapper>
            <div>not found</div>
          </InnerWrapper>
        </Route>
      </Switch>
    </Router>
  );
};

const Login: React.FC = () => {
  const { loginSucceeded } = useActions(SessionActions);
  const { user } = getSessionState.useState();

  if (user) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      <h3>login</h3>
      <button onClick={() => loginSucceeded({ name: 'okina' })}>login as `okina` user</button>
    </div>
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
const GroupsById: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <div>id: {id}</div>
      <div>
        <Route path="/groups/:id/posts">
          <div>posts</div>
        </Route>
      </div>
    </div>
  );
};

function Groups() {
  const links = [{ path: '/groups' }, { path: '/groups/1' }, { path: '/groups/1/posts' }];

  return (
    <div style={{ display: 'flex', borderTop: '1px dashed gray' }}>
      <div
        style={{ flex: 'auto', maxWidth: '150px', height: '500px', borderRight: '1px dashed gray' }}
      >
        <div>groups page</div>
        {links.map((l, i) => (
          <div key={l.path}>
            - <Link to={l.path}>{l.path}</Link>
          </div>
        ))}
      </div>
      <Switch>
        <Route path="/groups" exact>
          some content
        </Route>
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
        <Route path="/groups/:id">
          <GroupsById></GroupsById>
        </Route>
      </Switch>
    </div>
  );
}
