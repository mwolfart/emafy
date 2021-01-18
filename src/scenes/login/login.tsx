import React from 'react';
import { Modal } from '../../components/modal/modal';
import { InactiveCanvas } from '../../components/canvas/canvas';
import { Button } from '../../components/ui';

export class LoginScene extends React.Component {
    render() {
        return (
            <InactiveCanvas>
            <Modal>
                <div className="title">Sign in</div>
                <p>To start using the platform, please login using the Spotify API through the link below</p>
                <Button>Login using Spotify</Button>
            </Modal>
            </InactiveCanvas>
        )
    }
}