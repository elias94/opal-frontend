import Head from 'next/head'
import Link from 'next/link'

import TwitterIcon from 'components/atoms/TwitterIcon'

export default function HowItWorks() {
  return (
    <div className="h-full mx-auto" style={{ background: `rgb(248, 242, 227) none repeat scroll 0% 0%` }}>
      <Head>
        <title>Opal - Enchance your reading experience</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      
      <header className="w-6/12 max-w-6xl pt-6 mx-auto flex flex-row items-center justify-between">
        <Link href="/">
          <div className="flex flex-row justify-start cursor-pointer">
            <div className="text-4xl font-black tracking-tight color-gradient select-none">
              Opal
            </div>
            <span className="text-xs font-medium pl-1 opacity-50">beta</span>
          </div>
        </Link>

        <div className="flex flex-row items-center justify-between">
          <div className="mr-5">
            <Link href="/login">
              <a className="text-lg font-medium">
                Login
              </a>
            </Link>
          </div>
          <Link href="/signup">
            <div className="py-2 px-5 bg-black rounded-lg cursor-pointer">
                <a className="text-lg font-medium text-white">
                  Signup
                </a>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto pt-32 flex flex-col justify-around">
        <h3 className="text-center text-6xl font-black tracking-tight">
          How it works
        </h3>

        <div className="w-0 h-16 mt-14 border-trueGray-300 border border-solid mx-auto rounded-md"></div>

        <div className="w-5/6 mx-auto py-20">
          <div className="text-left text-semibold font-bold text-4xl">
            Import web content
          </div>
          <div className="text-grey-500 mt-2 font-medium text-2xl">
            Import and save all articles and tweets that you came across.
            You can read them in a <strong>clean</strong> interface.
            Every article is permanently saved and it will always be available.
            Stop using web links. With the time, they become broken, blank, unintentional, or even malicious pages.
          </div>

          <div className="text-left pt-16 text-semibold font-bold text-4xl">
            Add tags
          </div>
          <div className="text-grey-500 mt-2 font-medium text-2xl">
            Group you content easily and find it later using the <strong>search bar</strong>.
            Forget the old file-folders organization and create your large <strong>personal content</strong> system.
          </div>

          <div className="text-left pt-16 text-semibold font-bold text-4xl">
            Take notes
          </div>
          <div className="text-grey-500 mt-2 font-medium text-2xl">
            Annotate and highlight your articles using markdown in documents organized in blocks. Quote articles directly using blocks or highlights.
          </div>

          <div className="text-left pt-16 text-semibold font-bold text-4xl">
            Explore community knowledge
          </div>
          <div className="text-grey-500 mt-2 font-medium text-2xl">
            Read article's notes from the community see other users highlights.
            Vote useful notes and learn from community personal knowledge.
          </div>
        </div>

        <div className="w-0 h-16 border-trueGray-300 border border-solid mx-auto rounded-md"></div>

        <div className="max-w-4xl p-10 mt-8 mx-auto flex flex-col justify-around">
          <div className="max-w-4xl mx-auto text-center text-grey-500 font-medium text-3xl">
            Are you ready to create the first <strong className="text-black">collective intelligence</strong> platform together?
          </div>
          <div className="max-w-4xl mx-auto pt-16 text-center text-black font-medium">
            <Link href="/signup">
              <div className="py-4 px-8 bg-transparent rounded-lg cursor-pointer text-white half-button">
                  <a className="text-3xl font-semibold">
                    Join now
                  </a>
              </div>
            </Link>
          </div>
        </div>
        
      </main>

      <footer className="mt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="md:flex md:flex-row md:items-center md:justify-between py-4 md:py-8">
            <div>
              <span className="text-sm font-regular">&copy; 2021 Opal.to - All rights reserved</span>
            </div>
            <div className="text-sm font-regular flex flex-row justify-center">
              hey@opal.to
              <a
                href="https://twitter.com/getopal"
                title="@getopal"
                className="inline-flex flex-row items-center justify-center ml-8 text-blue-400 focus:outline-none"
              >
                <TwitterIcon className="pr-1"/>
              </a>
            </div>
            <div>
              <span className="text-sm font-regular flex flex-row items-center">
                Made with ♥️ in 🇮🇹 / 🇦🇺
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
