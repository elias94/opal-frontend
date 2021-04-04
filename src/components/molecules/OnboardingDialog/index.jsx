import TwitterIcon from 'components/atoms/TwitterIcon'

import '@reach/dialog/styles.css'

import {
  Dialog, IconButtonEl,
} from './styles'

function OnboardingDialog({ onClose }) {
  return (
    <div className="relative">
      <Dialog isOpen className="relative">
        <div className="mx-auto flex flex-row justify-center items-start py-3">
            <div className="w-min text-5xl font-black tracking-tight color-gradient select-none">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </div>
          <span className="text-xs -mr-4 font-medium pl-1 opacity-50">beta</span>
        </div>
        <IconButtonEl className="absolute top-8 right-10" icon="times" onClick={onClose} />
        <div className="w-full flex flex-col text-left py-4 pt-10">
          <h1 className="text-3xl font-black tracking-tight">
            Welcome on board!
          </h1>
          <div className="pt-4 text-base font-regular leading-7">
            Opal is an evolution to the classic <em>bookmarking</em> platform.<br/>
            <strong>Import</strong> all your <em>web article</em> and try all the new features
            <ul className="list-disc list-inside pt-2 leading-8">
              <li>Add your <strong>notes</strong> using <em>Markdown</em></li>
              <li><strong>Highlight</strong> content and add it to your notes</li>
              <li>Quote article directly, using <strong>blocks</strong></li>
              <li>Include Twitter status</li>
              <li>Read <em>public</em> notes and citations from the <strong>community</strong></li>
              <li>More soon...</li>
            </ul>
          </div>
          <div className="pt-6 text-base font-regular leading-7">
            Opal is currently in <span className="text-base font-medium opacity-50">beta</span>, so expect some bugs!<br/>
            Please, feel free to <strong>reach out</strong> and tell me about your <em>experience</em> with the product,
            or missing <em>features</em>.
          </div>
          <div className="pt-6 text-base font-regular leading-7 flex flex-row items-center justify-center">
            hey@opal.to
            <a
              href="https://twitter.com/getopal"
              title="@getopal"
              className="inline-flex flex-row items-center justify-center ml-8 text-blue-400 focus:outline-none"
            >
              <TwitterIcon className="pr-1"/>
              @getopal
            </a>
          </div>
          <div className="w-full mx-auto pt-8 flex flex-row justify-center">
            <button
              className="w-min py-2 px-5 bg-gray-400 hover:bg-black rounded-lg cursor-pointer text-lg font-medium text-white"
              onClick={onClose}
            >
              Okay
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default OnboardingDialog
