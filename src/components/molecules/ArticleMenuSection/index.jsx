import { useState } from 'react'

import Tooltip from 'components/atoms/Tooltip'

import {
  Container, SectionTitle, Caret,
  InfoElement, TooltipElement,
  Content, HeaderContainer, Header,
  LeftSection, RightSection,
} from './styles'

function ArticleMenuSection({ title, tooltip, extraHeader, initialValue = false, ...props }) {
  const [menuOpen, setMenuOpen] = useState(initialValue)

  const onSectionClick = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <Container>
      <HeaderContainer>
        <LeftSection>
          <Header onClick={onSectionClick}>
            <Caret icon="caret-right" open={menuOpen} />
            <SectionTitle>{title}</SectionTitle>
          </Header>
          {tooltip && <SectionInfo tooltip={tooltip} />}
        </LeftSection>
        <RightSection>
          {extraHeader}
        </RightSection>
      </HeaderContainer>
      <Content open={menuOpen}>{props.children}</Content>
    </Container>
  )
}

export default ArticleMenuSection

function SectionInfo({ tooltip }) {
  return (
    <Tooltip label={tooltip}>
      <InfoElement>
        ?
      </InfoElement>
    </Tooltip>
  )
}
