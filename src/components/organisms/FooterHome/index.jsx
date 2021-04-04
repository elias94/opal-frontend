import FeedbackDialog from 'components/molecules/FeedbackDialog'

function FooterHome(props) {
  return (
    <div className="w-full pb-6 pt-6 flex flex-col items-center justify-center">
      <FeedbackDialog {...props}>
        <span className="mb-3 text-blueGray-400 font-medium hover:underline">Leave a feedback</span>
      </FeedbackDialog>
      <div className="mt-6 text-center text-xs text-blueGray-300">
        &copy; 2021 Opal.to - All rights reserved
      </div>
    </div>
  )
}

export default FooterHome
