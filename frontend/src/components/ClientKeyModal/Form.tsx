import React from 'react';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { APIService } from '../../api/model';

export interface NewForm {
    name: string;
    revoked: boolean;
    api_service: any; // Change the type according to your API service type
}

interface NewFormProps {
    actionFunction: (data: NewForm) => Promise<any>;
    service: APIService;
}

function NewFormComponent({ actionFunction, service }: NewFormProps) {
    const form = useForm({
        initialValues: {
            name: '',
            revoked: false,
            api_service: service.id,
        },

        validate: {
            name: (value) => (value.trim() !== '' ? null : 'Name is required'),
        },
    });

    return (
        <Box maxWidth={300} mx="auto">
            <form onSubmit={form.onSubmit((values) => actionFunction(values))}>
                <TextInput
                    mt="xs"
                    withAsterisk
                    label="API Service"
                    disabled
                    value={service.name}
                />
                <TextInput
                    mt="xs"
                    withAsterisk
                    label="Name"
                    placeholder="Name"
                    {...form.getInputProps('name')}
                />

                <Group position="right" mt="lg">
                    <Button type="submit">Create</Button>
                </Group>
            </form>
        </Box>
    );
}

export default NewFormComponent;
