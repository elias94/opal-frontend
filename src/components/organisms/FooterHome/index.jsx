import FeedbackDialog from 'components/molecules/FeedbackDialog'

import { TwitterIcon } from './styles'

function FooterHome(props) {
  const userIsLogged = !!props.user

  return (
    <div className="w-full pb-6 pt-6 flex flex-col items-center justify-center">
      {userIsLogged && (
        <FeedbackDialog {...props}>
          <span className="mb-3 text-blueGray-400 font-medium hover:text-blueGray-500">Leave a feedback</span>
        </FeedbackDialog>
      )}
      <a className="pt-4" href="https://twitter.com/getopal" title="twitter - @getopal" target="_blank">
        <TwitterIcon className="text-blueGray-200" />
      </a>
      <div className="mt-6 text-center text-xs text-blueGray-300">
        &copy; 2021 Opal.to - All rights reserved
      </div>
    </div>
  )
}

export default FooterHome
