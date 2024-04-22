import React, { useState } from 'react';
import { Modal, Button, TextInput } from '@mantine/core';

const ApiModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
        field7: '',
        field8: '',
        booleanField: false,
    });

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted:', formValues);
        handleCloseModal();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    };

    return (
        <>
            <Button onClick={handleOpenModal}>Open Modal</Button>

            <Modal opened={isOpen} onClose={handleCloseModal}>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Field 1"
                        name="field1"
                        value={formValues.field1}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Field 2"
                        name="field2"
                        value={formValues.field2}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Field 3"
                        name="field3"
                        value={formValues.field3}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Field 4"
                        name="field4"
                        value={formValues.field4}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Field 5"
                        name="field5"
                        value={formValues.field5}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Field 6"
                        name="field6"
                        value={formValues.field6}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Field 7"
                        name="field7"
                        value={formValues.field7}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Field 8"
                        name="field8"
                        value={formValues.field8}
                        onChange={handleInputChange}
                    />

                    <label>
                        <input
                            type="checkbox"
                            name="booleanField"
                            checked={formValues.booleanField}
                            onChange={handleInputChange}
                        />
                        Boolean Field
                    </label>

                    <Button type="submit">Submit</Button>
                </form>
            </Modal>
        </>
    );
};

export default ApiModal;