import React from 'react';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { APIService, BillingRule } from '../../api/model';

export interface BillingRuleForm {
    api_service: BillingRule['api_service'];
    name: BillingRule['name'];
    description: BillingRule['description'];
    regex: BillingRule['regex'];
    price_per: BillingRule['price_per'];
    rule_level: BillingRule['rule_level'];
}

interface BillingRuleFormProps {
    actionFunction: (rule: BillingRuleForm) => Promise<any>;
    passedValues?: BillingRule;
    service: APIService;
}

function BillingRuleForm({ actionFunction, passedValues, service }: BillingRuleFormProps) {
    let initialValues: BillingRuleForm;

    if (!passedValues) {
        initialValues = {
            api_service: service.id,
            name: 'Flat billing',
            description: 'Every request costs the same amount of money.',
            regex: '.*',
            price_per: '0.01',
            rule_level: 1,
        };
    } else {
        initialValues = passedValues as BillingRuleForm;
    }

    const form = useForm({
        initialValues: initialValues,

        validate: {
            name: (value) => (value.trim() !== '' ? null : 'Name is required'),
            description: (value) => (value.trim() !== '' ? null : 'Description is required'),
            regex: (value) => (value.trim() !== '' ? null : 'Regex is required'),
            price_per: (value) => (value !== null ? null : 'Price per is required'),
            rule_level: (value) => (value !== null ? null : 'Rule level is required'),
        },
    });

    return (
        <Box maxWidth={300} mx="auto">
            <form onSubmit={form.onSubmit((values) => actionFunction(values))}>
                <TextInput
                    withAsterisk
                    label="API Service"
                    value={service.name}
                    disabled
                />

                <TextInput
                    mt="xs"
                    withAsterisk
                    label="Name"
                    placeholder="Name"
                    {...form.getInputProps('name')}
                />

                <TextInput
                    mt="xs"
                    withAsterisk
                    label="Description"
                    placeholder="Description"
                    {...form.getInputProps('description')}
                />

                <TextInput
                    mt="xs"
                    withAsterisk
                    label="Regex"
                    placeholder="Regex"
                    {...form.getInputProps('regex')}
                />

                <TextInput
                    mt="xs"
                    withAsterisk
                    type="number"
                    step="0.00001"
                    label="Price Per"
                    placeholder="Price Per"
                    {...form.getInputProps('price_per')}
                />

                <TextInput
                    mt="xs"
                    withAsterisk
                    type="number"
                    label="Rule Level"
                    placeholder="Rule Level"
                    {...form.getInputProps('rule_level')}
                />

                <Group position="right" mt="lg">
                    <Button type="submit">{!passedValues ? 'Create Rule' : 'Update Rule'}</Button>
                </Group>
            </form>
        </Box>
    );
}

export default BillingRuleForm;
