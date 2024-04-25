import React, { useState } from 'react';
import { Modal, Button, TextInput, LoadingOverlay } from '@mantine/core';
import { IconPlus, IconPencil } from '@tabler/icons-react';
import NewForm, { APIServiceForm } from './NewForm';
import { useApiServiceCreate } from '../../api/endpoints/api-service/api-service';
import { notifications } from '@mantine/notifications';

type ApiModalProps = {
    mode: 'create' | 'edit';
    serviceId: number;
    refetchParent?: () => void;
};

export const ApiModal: React.FC<ApiModalProps> = ({ mode, serviceId, refetchParent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {isPending: pendingCreation, mutateAsync: createAsync} = useApiServiceCreate();

    const createAPIService = async (payload: any) => {
        createAsync({data: payload}).then(() => {
            setIsOpen(false);
            notifications.show({message: 'API created successfully', color: 'green'});
            if (refetchParent) refetchParent();
        }).catch((error: any) => {
            notifications.show({message: `API creation failed: ${JSON.stringify(error.response?.data)}`, color: 'red'});
        })
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {mode === 'create' ? (
                <Button leftIcon={<IconPlus />} onClick={handleOpenModal} variant="filled">Create a new API</Button>
            ): (
                <Button radius="md" leftIcon={<IconPencil />} onClick={handleOpenModal} variant="light">Edit API</Button>
            )}

            <Modal opened={isOpen} onClose={handleCloseModal} title={mode === 'create'? 'Create a new API': 'Update'}>
                <NewForm actionFunction={createAPIService} />
                <LoadingOverlay visible={pendingCreation} zIndex={1000} overlayProps={{ radius: "sm", blur: 2, backgroundOpacity: '0.85' }} />
            </Modal>
        </>
    );
};