import NavbarUser from 'components/molecules/NavbarUser'
import ResourcesList from 'components/organisms/HomeResourcesList'

import {
  Container,
} from './styles'

function UserPage({ user, info, ...props }) {
  const initial = user ? user.name.slice(0, 1) : ''

  return (
    <Container>
      <NavbarUser
        user={user}
        {...props}
      />
      <div className="w-full">
        <div className="w-96 mt-8 mx-auto flex flex-col items-center justify-center">
          <div className="rounded-full bg-blueGray-500 text-white w-28 h-28 text-5xl uppercase flex items-center justify-center">
            {initial}
          </div>
          <div className="mt-5 text-black text-4xl font-semibold">
            {user.display_name}
          </div>
          <div className="mt-1 text-grey-500 text-base font-regular">
            @{user.name}
          </div>
          <div className="text-black text-base font-medium">
            {info.resources_count} saved <span className="text-sm">•</span> {info.notes_count} notes
          </div>
        </div>
      </div>
      <ResourcesList {...props} />
    </Container>
  )
}

export default UserPage
