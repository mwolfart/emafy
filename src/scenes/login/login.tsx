import { VFC } from 'react'
import { Modal } from 'components/modal/modal'
import { Button, Canvas } from 'components/ui'
import { authenticate } from 'api/credentials'
import { strings } from 'strings'

export const LoginScene: VFC = () => {
  const apiAuth = (): void => {
    authenticate()
  }

  const closeLoginModal = (): void => {}

  return (
    <Canvas>
      <Modal closeModalCallback={closeLoginModal}>
        <div className="title">{strings.scenes.login.signin}</div>
        <p>{strings.scenes.login.instructions}</p>
        <Button onClick={apiAuth}>
          {strings.scenes.login.loginUsingSpotify}
        </Button>
      </Modal>
    </Canvas>
  )
}
