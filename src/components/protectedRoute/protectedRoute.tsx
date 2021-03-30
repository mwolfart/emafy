import { VFC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

type Props = {
  isLoggedIn: boolean
} & RouteProps

export const ProtectedRoute: VFC<Props> = ({ isLoggedIn, ...rest }) =>
  isLoggedIn ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: '' } }} />
  )
