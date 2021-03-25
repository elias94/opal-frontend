import Head from 'next/head'
import Link from 'next/link'

import TwitterIcon from 'components/atoms/TwitterIcon'

export default function Home() {
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
        <div className="flex flex-row justify-start">
          <div className="text-4xl font-black tracking-tight color-gradient select-none">
            Opal
          </div>
          <span className="text-xs font-medium pl-1 opacity-50">beta</span>
        </div>

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

      <main className="max-w-6xl mx-auto pt-44 flex flex-col justify-around">
        <h1 className="text-left text-8xl font-black tracking-tight">
          Enhance your <span className="color-gradient">reading</span><br/>experience
        </h1>

        <div className="max-w-6xl mx-auto flex flex-col justify-around">
          <div className="max-w-4xl mx-auto pt-32 text-center text-black font-medium text-xl">
            Bookmark all your web articles and start using them actively.<br/>Take notes, highlights, tags and share your knowledge with the <strong>community</strong>!
          </div>
          <img className="pt-24" src="/frame_generic_light.png" />
          <span className="text-gray-400 text-center text-sm">Articles are random and the interface change frequently</span>
        </div>
      </main>

      <footer className="mt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="md:flex md:flex-row md:items-center md:justify-between py-4 md:py-8">
            <div>
              <span className="text-sm font-regular">&copy; 2021 Opal.to - All rights reserved</span>
            </div>
            <div className="text-sm font-regular flex flex-row justify-center">
              hello@opal.to
              <a
                href="https://twitter.com/getopal"
                title="@getopal"
                className="inline-flex flex-row items-center justify-center ml-8 text-blue-400"
              >
                <TwitterIcon className="pr-1"/>
              </a>
            </div>
            <div>
              <span className="text-sm font-regular flex flex-row items-center">
                Made in 🇮🇹 <span className="text-xs px-1">&</span> 🇦🇺
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
