import React from 'react';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { BodyType } from '../../services/custom-axios-instance';
import { APIService } from '../../api/model/aPIService';

export interface APIServiceForm {
    name: APIService['name'];
    service_provider: APIService['service_provider'];
    description: APIService['description'];
    url: APIService['url'];
    url_compatible_name: APIService['url_compatible_name'];
    image: APIService['image'];
    api_key: APIService['api_key'];
    active: APIService['active'];
}

interface NewFormProps {
    actionFunction: (service: APIServiceForm) => Promise<any>;
    passedValues?: APIService;
}

function NewForm({actionFunction, passedValues}: NewFormProps) {
    let initialValues: APIServiceForm;

    console.log(passedValues)
    
    if (!passedValues) initialValues = {
        name: 'Cat Facts',
        service_provider: 'The Cat Facts Company',
        description: 'This API provides random cat facts. Docs available on: https://catfact.ninja/',
        url: 'https://catfact.ninja/',
        url_compatible_name: 'cat-facts',
        image: 'https://thecatfacts.com/catfacts.png',
        api_key: 'abc123',
        active: true,
    }
    else initialValues = passedValues as APIServiceForm;

    const form = useForm({
        initialValues: initialValues,

    validate: {
      name: (value) => (value.trim() !== '' ? null : 'Name is required'),
      service_provider: (value) => (value.trim() !== '' ? null : 'Service provider is required'),
      description: (value) => (value.trim() !== '' ? null : 'Description is required'),
      url: (value) => (/^https?:\/\/\S+$/.test(value) ? null : 'Invalid URL'),
      url_compatible_name: (value) => (value.trim() !== '' ? null : 'URL compatible name is required'),
      image: (value) => (value.trim() !== '' ? null : 'Image URL is required'),
      api_key: (value) => (/^[\x00-\x7F]+$/.test(value) ? null : 'API key must consist only of ASCII characters'),
    },
  });

  return (
    <Box maxWidth={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => actionFunction(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Cat Facts"

          {...form.getInputProps('name')}
        />

        <TextInput
          mt='xs'
          withAsterisk
          label="Service Provider"
          placeholder="The Cat Facts Company"
          {...form.getInputProps('service_provider')}
        />

        <TextInput
          mt='xs'
          withAsterisk
          label="Description"
          placeholder="This API provides random cat facts. Please refer to the documentation for more information on catfacts.com"
          {...form.getInputProps('description')}
        />

        <TextInput
          mt='xs'
          withAsterisk
          label="URL"
          placeholder="https://api.thecatfacts.com/"
          {...form.getInputProps('url')}
        />

        <TextInput
        mt='xs'
        withAsterisk
        label="URL Compatible Name"
        placeholder="cat-facts"
        {...form.getInputProps('url_compatible_name')}
        />

        <TextInput
        mt='xs'
        withAsterisk
        label="Image URL"
        placeholder="https://thecatfacts.com/catfacts.png"
        {...form.getInputProps('image')}
        />

        <TextInput
        mt='xs'
        withAsterisk
        label="API Key"
        placeholder="zDvlNlJOQVbeqTcCrBxk"
        {...form.getInputProps('api_key')}
        />

        <Checkbox
          mt="md"
          label={`API is enabled`}
          {...form.getInputProps('active', { type: 'checkbox' })}
        />

        <Group position="right" mt="lg">
          <Button type="submit">{!passedValues? 'Create API': 'Update API'}</Button>
        </Group>
      </form>
    </Box>
  );
}

export default NewForm;
