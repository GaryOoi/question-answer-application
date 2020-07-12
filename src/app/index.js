/**
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import { Result, Button } from 'antd';

import Header from 'components/Header';
import Footer from 'components/Footer';
import GlobalStyle from './gloabalStyles';
import { createLoadableComponent } from 'utils/loadable';

import { FlexGrowDiv } from './styles';

const Home = createLoadableComponent(() => import('pages/Home'));
const Answer = createLoadableComponent(() => import('pages/Answer'));
const AskQuestion = createLoadableComponent(() => import('pages/AskQuestion'));
const Login = createLoadableComponent(() => import('pages/Login'));
const Register = createLoadableComponent(() => import('pages/Register'));

function App() {
  return (
    <>
      <Helmet
        titleTemplate="%s - Q&A Forum"
        defaultTitle="Q&A Forum - Ask anything you want"
      />
      {/* Header */}
      <Header />
      <FlexGrowDiv>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/answer/:questionId" component={Answer} />
          <Route exact path="/askquestion" component={AskQuestion} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

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
      <Footer />
      <GlobalStyle />
    </>
  );
}

export default App;
