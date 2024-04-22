import { use, useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  rem,
  createStyles,
  Group,
  getStylesRef,
  Badge,
  Button,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconClipboardText,
  IconMailbox,
  IconTimeline,
  IconCoin,
  IconCoins,
  IconCloudDataConnection,
  IconNetwork,
  IconApi,
  IconAccessPoint,
  IconUserCircle,
  IconUser,
  IconWorldCode,
  IconWorldCheck,
  IconSun,
  IconMoon,
} from '@tabler/icons-react';

import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { NavbarSimple } from '../NavbarSimple/NavbarSimple';
import { User } from '../NavbarSimple/_user';
import { MainLinks } from '../NavbarSimple/_mainLinks';
import { Brand} from '../NavbarSimple/_brand';
import { IconBuildingBridge } from '@tabler/icons';
import { useLogout } from '../../hooks/auth/useLogout';
import { useCurrentUser } from '../../hooks/auth/useCurrentUser';
import { useRouter } from 'next-nprogress-bar';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontSize: rem(20),
    fontWeight: 900,
    
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(14),
    },
  },


  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  description: {
  },


  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '/dashboard/my-api', label: 'My APIs', icon: IconWorldCode },
  { link: '/dashboard/activated-api', label: 'Activated APIs', icon: IconWorldCheck },
  { link: '/dashboard/billing', label: 'Billing', icon: IconCoins },
  { link: '/dashboard/analytics', label: 'Analytics', icon: IconTimeline },
];


export function CustomAppShell({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');
  const { logout } = useLogout();
  const { push } = useRouter();
  const {user, refetchUser} = useCurrentUser();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const logoutWrapper = (e: any) => {
    e.preventDefault();
    logout();
    push('/login');
  };

  useEffect(() => {
    const path = window.location.pathname;
    const activeItem = data.find((item) => item.link === path);
    if (activeItem) {
      setActive(activeItem.label);
    }
  }, []);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));


  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar width={{ sm: 300 }} p="md">
        <Navbar.Section grow>
          {links}
        </Navbar.Section>
  
        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => redirectURL(event)}>
            <IconSettings className={classes.linkIcon} stroke={1.5} />
            <span>Settings</span>
          </a>
  
          <a href="#" className={classes.link} onClick={(event) => logoutWrapper(event)}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
     }

      header={
        <Header height={{ base: 60}} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          <Group style={{paddingLeft: 7, cursor: 'pointer'}} onClick={() => push('/')}>
          <IconBuildingBridge
            size={36}
            strokeWidth={2}
            color={'#37B24D'}/> 
            <Title className={classes.title} size={'lg'}>Open Bridge</Title>
          </Group>
          <Group style={{marginLeft: 'auto'}} >
            {colorScheme === 'dark' ? <Button onClick={() => toggleColorScheme()} rightIcon={<IconSun size={16} />}  variant='transparent'><Title size='sm'>{user?.user.email}</Title></Button> : 
            <Button onClick={() => toggleColorScheme()} rightIcon={<IconMoon size={16} />}  variant='transparent'><Title size='sm'>{user?.user.email}</Title></Button>} 
          </Group>

          </div>
        </Header>
      }
      padding="md"

    >
      {children}
      
    </AppShell>
  );
}