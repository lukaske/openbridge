import { useState } from 'react';
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, useMantineTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { HeaderAction, HeaderActionProps } from '../src/components/HeaderAction/HeaderAction';
import links from '../config/navigation.json'
import auth_links from '../config/auth_navigation.json'
import { FooterLinks } from '../src/components/FooterLinks/FooterLinks';
import footer from '../config/footer.json';
import {AuthHeader} from '../src/components/AuthHeader/AuthHeader';
import MyAppShell from '../src/components/MyAppShell/MyAppShell';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const appRoutes = ['/dashboard', '/settings', '/analytics', '/forms', '/responses'];

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('obrazci-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>Open Bridge | Your billable API</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <ProgressBar color="#37B24D" height="2px" />
        <MantineProvider theme={{ colorScheme, primaryColor: 'green' }} withGlobalStyles withNormalizeCSS>
          {!appRoutes.includes(props.router.pathname)?
          <>
            <HeaderAction {...links}/>
            <Component {...pageProps}/>
          </>:
            <MyAppShell>
              <Component {...pageProps}/>
            </MyAppShell>
          }
          <Notifications />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
