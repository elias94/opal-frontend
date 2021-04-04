import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  fetch,
  fetchUserResourcesWithoutToken,
} from 'store'

import UserPage from 'components/templates/UserPage'

const PAGE_SIZE = 30                // Initial sizes of a page of resources
const DEFAULT_LIST_LENGTH = 12      // Default resources list length

function User({ user, info, resources }) {
  const router = useRouter()

  const { username } = router.query

  // Paging parameters
  const [skipPaging, setSkipPaging] = useState(0)
  const [sizePaging, setSizePaging] = useState(PAGE_SIZE)

  const {
    resources: serverResources,
    loading: loadingResources,
    mutate: mutateResources,
  } = fetchUserResourcesWithoutToken(user && user.id, '', [], skipPaging, sizePaging)

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - {`${username}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserPage
        user={user}
        info={info}
        resources={resources}
        skipPaging={skipPaging}
        displayListLength={DEFAULT_LIST_LENGTH}
      />
    </div>
  )
}

export default User

export async function getStaticPaths() {
  const users = await fetch('/users/list')

  const paths = users.map((user) => ({
    params: { username: user.name },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const [{ user, info }, resources] = await Promise.all([
    fetch(`/users/name/${params.username}`),
    fetch(`/resources/user/name/${params.username}`)
  ])

  return { props: { user, info, resources } }
}

