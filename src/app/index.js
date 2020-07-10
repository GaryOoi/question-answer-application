/**
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Result, Button } from 'antd';

import Header from 'containers/Header';
import { createLoadableComponent } from 'utils/loadable';

import { FlexGrowDiv, FlexLayoutContent } from './styles';

const Home = createLoadableComponent(() => import('pages/Home'));
const Login = createLoadableComponent(() => import('pages/Login'));

function App() {
  return (
    <>
      <Helmet
        titleTemplate="%s - Walymo"
        defaultTitle="Walymo - Connecting knowledge"
      />
      {/* Header */}
      <Header />
      <FlexGrowDiv>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />

          <Route path="">
            <Result
              status="404"
              title="Oops, you have roamed into the unknown!"
              extra={
                <Link to="/">
                  <Button type="primary">Let&apos;s Go Home</Button>
                </Link>
              }
            />
          </Route>
        </Switch>
      </FlexGrowDiv>
      {/* Footer */}
    </>
  );
}

export default App;
