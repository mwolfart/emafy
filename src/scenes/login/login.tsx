import React, { VFC } from 'react';
import { Modal } from '../../components/modal/modal';
import { Canvas } from '../../components/canvas/canvas';
import { Button } from '../../components/ui';

export const LoginScene: VFC = () => {
    const login = () => {

    }

    return (
        <Canvas>
        <Modal>
            <div className="title">Sign in</div>
            <p>To start using the platform, please login using the Spotify API through the link below</p>
            <Button onClick={login}>Login using Spotify</Button>
        </Modal>
        </Canvas>
    )
}