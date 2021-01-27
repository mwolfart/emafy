import React, { VFC } from 'react'
import { Modal } from 'components/modal/modal'
import { Button, Canvas } from 'components/ui'

export const LoginScene: VFC = () => {
  const login = () => {}

  const closeLoginModal = () => {}

  return (
    <Canvas>
      <Modal closeModalCallback={closeLoginModal}>
        <div className="title">Sign in</div>
        <p>
          To start using the platform, please login using the Spotify API
          through the link below
        </p>
        <Button onClick={login}>Login using Spotify</Button>
      </Modal>
    </Canvas>
  )
}
