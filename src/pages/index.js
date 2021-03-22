import Head from 'next/head'

import IndexPage from 'components/templates/IndexPage'

export default function Home() {
  return (
    <div styles={{ height: '100%' }}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndexPage />
    </div>
  )
}
