import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Login, Signup } from '.';
import { PAGE_PATHS, STORES } from '../../constants';
import { AuthWrapper } from '../../components/Auth';
import BaseStore from '../../stores/Base';
import '../../css/Auth/auth.css';

interface InjectedProps {
  [STORES.BASE_STORE]: BaseStore;
}

class Auth extends Component<InjectedProps> {
  constructor(props: InjectedProps) {
    super(props);
    this.props[STORES.BASE_STORE].setMenuVisible(false);
  }

  componentWillUnmount() {
    this.props[STORES.BASE_STORE].setMenuVisible(true);
  }

  render() {
    return (
      <AuthWrapper>
        <Route exact path={PAGE_PATHS.AUTH} component={Login} />
        <Route path={PAGE_PATHS.LOGIN} component={Login} />
        <Route path={PAGE_PATHS.SIGNUP} component={Signup} />
      </AuthWrapper>
    );
  }
}

export default inject(STORES.BASE_STORE)(observer(Auth));
