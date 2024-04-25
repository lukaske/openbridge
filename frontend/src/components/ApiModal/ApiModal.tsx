import React, { useState } from 'react';
import { Modal, Button, TextInput, LoadingOverlay } from '@mantine/core';
import { IconPlus, IconPencil } from '@tabler/icons-react';
import NewForm, { APIServiceForm } from './NewForm';
import { useApiServiceCreate, useApiServiceUpdate } from '../../api/endpoints/api-service/api-service';
import { notifications } from '@mantine/notifications';
import { APIService } from '../../api/model';

type ApiModalProps = {
    mode: 'create' | 'edit';
    service?: APIService;
    refetchParent?: () => void;
};

export const ApiModal: React.FC<ApiModalProps> = ({ mode, service, refetchParent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {isPending: pendingCreation, mutateAsync: createAsync} = useApiServiceCreate();
    const {isPending: pendingUpdate, mutateAsync: updateAsync} = useApiServiceUpdate();

    const createAPIService = async (payload: any) => {
        createAsync({data: payload}).then(() => {
            setIsOpen(false);
            notifications.show({message: 'API created successfully', color: 'green'});
            if (refetchParent) refetchParent();
        }).catch((error: any) => {
            notifications.show({message: `API creation failed: ${JSON.stringify(error.response?.data)}`, color: 'red'});
        })
    };

    const updateAPIService = async (payload: any) => {
        if (!service) return;
        updateAsync({id: service?.id, data: payload}).then(() => {
            setIsOpen(false);
            notifications.show({message: 'API updated successfully', color: 'green'});
            if (refetchParent) refetchParent();
        }).catch((error: any) => {
            notifications.show({message: `API update failed: ${JSON.stringify(error.response?.data)}`, color: 'red'});
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

            <Modal opened={isOpen} onClose={handleCloseModal} closeOnClickOutside={false} title={mode === 'create'? 'Create a new API': 'Update'}>
                {   
                    mode === 'edit' && service? 
                    <NewForm actionFunction={updateAPIService} passedValues={service} />:
                    <NewForm actionFunction={createAPIService} />
                }
                <LoadingOverlay visible={pendingCreation || pendingUpdate} zIndex={1000} overlayProps={{ radius: "sm", blur: 2, backgroundOpacity: '0.85' }} />
            </Modal>
        </>
    );
};