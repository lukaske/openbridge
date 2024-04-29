import React, { useEffect, useState } from 'react';
import { Container, Card, Text, TextInput, Button, LoadingOverlay } from '@mantine/core';
import { useCurrentUser } from '../../src/hooks/auth/useCurrentUser';
import { useAuthUserPartialUpdate, useAuthUserRetrieve } from '../../src/api/endpoints/auth/auth';
import { CustomAppShell } from '../../src/components/CustomAppShell';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

const Settings: React.FC = () => {
    const { user, refetchUser } = useCurrentUser();
    const { data: userDetails, isFetching: isRetrieving, refetch } = useAuthUserRetrieve();
    const { mutateAsync: updateAsync, isPending } = useAuthUserPartialUpdate();

    console.log(userDetails);

    const actionFunction = async (values: any) => {
        updateAsync({data: {
            first_name: values.first_name,
            last_name: values.last_name,
        }}).then(() => {
            notifications.show({ title: 'Success', message: 'Profile updated successfully', color: 'green' });
            refetch();
        }).catch((error: any) => {
            console.log(error);
        });
    };

    const form = useForm({
        validate: {
            first_name: (value) => (value.trim() !== '' ? null : 'First name is required'),
            last_name: (value) => (value.trim() !== '' ? null : 'Last name is required'),
    }});

    useEffect(() => {
        if (userDetails) {
            form.setValues({
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
            });
        }
    }, [userDetails]);

    return (
            <Container size="lg">
                <Card style={{ maxWidth: 540, margin: 'auto' }} shadow="sm" padding="lg" radius="md" withBorder>
                    <Text>Update your profile:</Text>
                    <form onSubmit={form.onSubmit((values) => actionFunction(values))}>
                    <TextInput
                            label="Email"
                            value={userDetails?.email}
                            disabled
                            mt="sm"
                        />
                        <TextInput
                            label="First Name"
                            {...form.getInputProps('first_name')}
                            mt="sm"
                        />
                        <TextInput
                            label="Last Name"
                            {...form.getInputProps('last_name')}
                            mt="sm"
                        />


                        <Button position='right' type="submit" mt="lg" disabled={isPending}>
                            Update
                        </Button>
                    </form>
                    <LoadingOverlay visible={isPending || isRetrieving} />
                </Card>
            </Container>
    );
};

export default Settings;
