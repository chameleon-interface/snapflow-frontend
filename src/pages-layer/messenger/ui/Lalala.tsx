'use client';

import { CreatePostModal } from '@/features/post/create-post/ui';
import { useState } from 'react';
import { Button } from 'snapflow-ui-kit'

export const Lalala = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <>
            <Button onClick={handleOpen} aria-label="Добавить публикацию">
                Новая публикация
            </Button>
            <CreatePostModal isOpen={isModalOpen} onClose={handleClose} />
        </>
    )
}
