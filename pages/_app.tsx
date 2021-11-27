import React, {FC} from 'react';
import {AppProps} from 'next/app';
import '../styles/globals.scss'
import {wrapper} from '../redux/store';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);

