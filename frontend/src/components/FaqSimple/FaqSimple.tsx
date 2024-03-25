import { Container, Title, Accordion, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
    maxWidth: '71.25rem',
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.2)`,
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },


  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

export function FaqSimple() {
  const { classes } = useStyles();
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="left" className={classes.title}>
        Frequently asked questions
      </Title>  

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="1">
          <Accordion.Control>What is OpenBridge?</Accordion.Control>
          <Accordion.Panel>OpenBridge is a billing proxy platform designed to facilitate seamless monetization of APIs. It allows API providers to securely expose their services to consumers while managing billing and payment transactions efficiently.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="2">
          <Accordion.Control>How does OpenBridge work?</Accordion.Control>
          <Accordion.Panel>OpenBridge acts as an intermediary between API providers and consumers, handling billing-related tasks such as payment processing, usage tracking, and invoicing. It ensures that API providers receive compensation for the services they offer while giving consumers access to reliable and secure APIs.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="3">
          <Accordion.Control>Can I customize billing rules on OpenBridge?</Accordion.Control>
          <Accordion.Panel>Yes, OpenBridge provides users with the flexibility to create their own billing rules. This feature allows API providers to tailor pricing structures and billing methods according to their specific business requirements, ensuring optimal monetization of their services.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="4">
          <Accordion.Control>How does OpenBridge protect API keys from unauthorized access?</Accordion.Control>
          <Accordion.Panel>OpenBridge employs stringent security measures to safeguard API keys and prevent unauthorized access. These measures include encryption protocols, access controls, and secure storage mechanisms to ensure that API keys remain confidential and are only accessible to authorized users. Additionally, OpenBridge continuously monitors and updates its security protocols to mitigate emerging threats and vulnerabilities, providing peace of mind to API providers and consumers alike.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="5">
          <Accordion.Control>How do I get started with OpenBridge?</Accordion.Control>
          <Accordion.Panel>Getting started with OpenBridge is simple. API providers can sign up for an account on the platform, integrate their APIs, and configure billing rules as needed. Consumers can then discover and access these APIs through OpenBridge API Marketplace, making it easy for both parties to monetize and utilize API services effectively.</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
