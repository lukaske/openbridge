import { use, useState } from 'react';
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
  filterProps,
  Avatar,
  Badge,
  Tooltip
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
} from '@tabler/icons-react';

import { NavbarSimple } from '../NavbarSimple/NavbarSimple';
import { User } from '../NavbarSimple/_user';
import { MainLinks } from '../NavbarSimple/_mainLinks';
import { Brand} from '../NavbarSimple/_brand';
import { IconForms } from '@tabler/icons';
import { useCurrentUser } from '../../hooks/auth/useCurrentUser';
import { useRouter } from 'next/router';

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
  { link: '', label: 'Moji obrazci', icon: IconClipboardText },
  { link: '', label: 'Prejeti odzivi', icon: IconDatabaseImport },
  { link: '', label: 'Analitika', icon: IconTimeline },

];

function hashCode(s: string) {
  for(var i = 0, h = 0; i < s.length; i++)
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h;
}


export default function MyAppShell(props: any) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');
  const [seed, setSeed] = useState((Math.random() + 1).toString(36).substring(7));
  const push = useRouter().push;
  const email = useCurrentUser().user?.user.email;
  console.log(props)
  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
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
        <Navbar width={{ sm: 250 }} p="md">
        <Navbar.Section grow>
          {links}
        </Navbar.Section>
  
        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconSettings className={classes.linkIcon} stroke={1.5} />
            <span>Nastavitve</span>
          </a>
  
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Odjava</span>
          </a>
        </Navbar.Section>
      </Navbar>
     }

      header={
        <Header height={{ base: 60}} p="md" style={{display: 'flex', justifyContent: 'space-between'}}>
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
          <IconForms
            size={36}
            strokeWidth={2}
            color={'#40C057'}/> 
            {' '}
          <Title className={classes.title} size={'xl'}> Obrazci.net</Title>

          </Group>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent:'right' }}>
          <Group style={{paddingLeft: 7}}>
          <Tooltip label={`Account: ${email}`} withArrow arrowSize={6}>
          <Avatar radius="md" src={`https://api.dicebear.com/6.x/croodles-neutral/svg?seed=${seed}&flip=true&backgroundColor=e0f0e3`} />
          </Tooltip>


          </Group>
          </div>

        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}