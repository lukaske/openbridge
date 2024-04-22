import React from 'react';
import { Text, Group, Button } from '@mantine/core';
import {CustomAppShell} from '../../src/components/CustomAppShell';
import { IconPlus, IconBuildingStore, IconExternalLink } from '@tabler/icons-react';
import { useRouter  } from 'next-nprogress-bar';

const ActivatedAPI: React.FC = () => {
  const { push } = useRouter();
  return (
    <Group position="right">
      <Button leftIcon={<IconBuildingStore size={20} />} variant="outline" onClick={() => push('/marketplace')}>Visit API Marketplace</Button>
    </Group>
);
};

export default ActivatedAPI;