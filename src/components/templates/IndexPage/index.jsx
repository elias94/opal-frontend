import Link from 'next/link'

import {
  Container, Main, HeaderContainer,
  Header, HeaderNav,
  HeaderMenuItem, HeaderMenuItemBig,
  Section, MainTitle, Footer,
  SectionContent, MainList,
  MainListItem, MainListText,
  TwitterIcon,
} from './styles'

function IndexPage() {
  const mainList = [
    'Read Articles without Ads',
    'Create Notes',
    'Access and rate community contents',
    'Articles archivied permanently',
    'Connect multiple blocks',
    'Include external media',
  ]

  return (
    <Container>
      <HeaderContainer>
        <Header>
          Opal
        </Header>
        <HeaderNav>
          <HeaderMenuItem>
            <Link href="/login">
              Login
            </Link>
          </HeaderMenuItem>
          <HeaderMenuItemBig>
            <Link href="/signup">
              Sign up
            </Link>
          </HeaderMenuItemBig>
        </HeaderNav>
      </HeaderContainer>
      <Main>
        <Section>
          <MainTitle>
            Enhance your <span>reading</span> experience
          </MainTitle>
          <SectionContent>
            <MainList>
              {mainList.map(i => (
                <MainListItem>
                  <MainListText>
                    {i}
                  </MainListText>
                </MainListItem>
              ))}
            </MainList>
          </SectionContent>
        </Section>
      </Main>
      <Footer>
        <span> 2021 - <a href="https://twitter.com/elia_scotto" target="_blank"><TwitterIcon /></a></span>
      </Footer>
    </Container>
  )
}

export default IndexPage
