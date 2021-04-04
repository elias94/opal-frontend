import Spinner from 'components/atoms/Spinner'

import {
  OverlayLoading,
} from './styles'

function LoadingOverlay(props) {
  return (
    <OverlayLoading {...props}>
      <Spinner />
    </OverlayLoading>
  )
}

export default LoadingOverlay 
