import { FooterHeadline } from 'components/ui'
import { VFC } from 'react'
import styled from 'styled-components'
import { PlayerButton } from './playerButton'

type Props = {}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    background-color: white;
    align-items: center;
  `}
`

const MusicControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

export const Player: VFC<Props> = () => {
  return (
    <Wrapper>
      <PlayerButton iconClass="fa-list" onClick={() => {}} isLarge={false} />
      <FooterHeadline title="Song" subtitle="Artist" />
      <MusicControlWrapper>
        <PlayerButton
          iconClass="fa-step-backward"
          onClick={() => {}}
          isLarge={false}
        />
        <PlayerButton iconClass="fa-pause" onClick={() => {}} isLarge={true} />
        <PlayerButton
          iconClass="fa-step-forward"
          onClick={() => {}}
          isLarge={false}
        />
      </MusicControlWrapper>
      <PlayerButton
        iconClass="fa-volume-up"
        onClick={() => {}}
        isLarge={false}
      />
    </Wrapper>
  )
}
