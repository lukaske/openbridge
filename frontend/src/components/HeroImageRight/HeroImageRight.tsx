import { createStyles, Container, Title, Text, Button, rem } from '@mantine/core';
import {useRouter} from 'next/navigation';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(./splash.jpeg)',
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}));

export function HeroImageRight() {
  const { classes } = useStyles();
  const { push } = useRouter();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Moderna platforma za {' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'teal', to: 'green' }}
              >
               spletne obrazce
              </Text>{'.'}
            </Title>

            <Text className={classes.description} mt={30}>
              Z Obrazci.net lahko ustvarite, gostujte in upravljajte spletne obrazce brez programiranja. 
              Preprosto jih integrirajte z vašo spletno stranjo ali aplikacijo - zahtevnejšim uporabnikom
              pa nudimo tudi API dostop.
              
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'limegreen' }}
              size="xl"
              className={classes.control}
              mt={40}
              onClick={() => push('/login')}
            >
              Ustvari obrazec →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
