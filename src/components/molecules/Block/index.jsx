import { useState, forwardRef } from 'react'
import { decodeHtmlCharCodes, isUrlAbsolute, extractBaseUrl } from 'shared/utils'

import BlockMenu from 'components/molecules/BlockMenu'
import MathBlock from 'components/atoms/MathBLock'
import InternalLink from 'components/atoms/InternalLink'
import Tooltip from 'components/atoms/Tooltip'

import {
  Container, Paragraph, LinkStyled, TitleStyled, Blockquote,
  ContainerEditable, Content, InternalHighlight, InternalBlock,
  Image, Code, ListContainer, ListContent, ListDecorationContent,
  ListDecorationElement, TweetBlock, HighlightedText,
} from './styles'

function Block({ block, editable, ...props }) {
  if (editable) {
    return <BlockEditableOutput block={block} {...props} />
  }

  const [mouseHover, setMouseHover] = useState(false)
  
  const render = renderBlock(block, { url: props.url, openResource: props.openResource })

  // Not render empty block
  if ((!block.content || !block.content.length) && !block.properties.raw) {
    return null
  }

  return (
    <Container
      data-block-id={block.id}
      indent={block.indent}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
    >
      <BlockMenu
        block={block}
        visible={mouseHover}
        {...props}
      />
      <Content>
        {render}
      </Content>
    </Container>
  )
}

export default Block

export function BlockEditableOutput({ block, ...props }) {
  // Block version customized for BlockEditable. Only for output markdown render
  // Use the editable props for customize the CSS output of the block specifically for the writing mode
  const render = renderBlock(block, {
    editable: true,
    url: props.url,
    openResource: props.openResource,
  })

  return (
    <ContainerEditable>
      {render}
    </ContainerEditable>
  )
}

function renderBlock(block, { openResource, ...otherProps }) {
  const { type, content, properties, indent } = block

  const formatted = formatContent(content, { blockId: block.id, url: otherProps.url })
  const key = `BlockContent_${block.id}`
  const sharedProps = { ...otherProps, key, indent }

  let render = null

  if (type.startsWith('heading')) {
    const headingLevel = `${type.replace('heading', 'h')}${properties.depth}`

    render = (
      <TitleStyled
        level={headingLevel}
        data-placeholder={type.replace(/^\w/, (c) => c.toUpperCase())}
        data-level={headingLevel}
        {...sharedProps}
      >
        {formatted}
      </TitleStyled>
    )
  } else if (type === 'blockquote') {
    render = (
      <Blockquote
        data-placeholder="Insert a quote"
        {...sharedProps}
      >
        {formatted}
      </Blockquote>
    )
  } else if (type === 'internal_block') {
    render = (
      <InternalBlock
        key={key}
        blockId={properties.ref['block_id']}
        openResource={openResource}
        {...sharedProps}
      />
    )
  } else if (type === 'internal_highlight') {
    render = (
      <InternalHighlight key={key} {...sharedProps}>
        {formatted}
      </InternalHighlight>
    )
  } else if (type === 'tweet') {
    render = (
      <TweetBlock
        tweetId={properties.tweetId}
        editable={otherProps && otherProps.editable}
        content={properties.raw}
        {...sharedProps}
      />
    )
  } else if (type === 'image') {
    render = (
      <Image
        src={formatRelativeUrl(block.url, url)}
        {...sharedProps}
      />
    )
  } else if (type === 'paragraph') {
    if (block.list) {
      render = (
        <ListContainer key={key}>
          <Tooltip label="Collapse list">
            <ListDecoration order={block.list === 'b' ? null : block.order} />
          </Tooltip>
          <ListContent>
            <Paragraph
              data-placeholder="Type here"
              {...sharedProps}
            >
              {formatted}
            </Paragraph>
          </ListContent>
        </ListContainer>
      )
    } else {
      render = (
        <Paragraph
          data-placeholder="Type here"
          {...sharedProps}
        >
          {formatted}
        </Paragraph>
      )
    }
  }

  return render
}

export function formatContent(children, extra, deep=0) {
  if (!Array.isArray(children)) {
    return renderToken(children, extra, deep)
  }

  return children.map((node, index) => {
    return renderToken(node, { ...extra, index }, deep)
  })
}

function renderToken(node, extra, deep) {
  const { blockId, index, url: baseUrl } = extra
  const { type, children, value } = node

  // Ugly way to UNIQUE identify a block portion
  const key = `BlockContent_${blockId}${type}${index}${deep}`

  let render

  if (type === 'paragraph')
  {
    render = <p key={key}>{formatContent(children, extra, deep + 1)}</p>
  }
  else if (type === 'link')
  {
    render = (
      <LinkStyled
        key={key}
        href={formatRelativeUrl(node.url, baseUrl)}
        external
      >
        {formatContent(children, extra, deep + 1)}
      </LinkStyled>
    )
  }
  else if (type === 'internal_link') {
    render = <InternalLink key={key} node={node} />
  }
  else if (type === 'strong')
  {
    render = <strong key={key}>{formatContent(children, extra, deep + 1)}</strong>
  }
  else if (type === 'emphasis')
  {
    render = <em key={key}>{formatContent(children, extra, deep + 1)}</em>
  }
  else if (type === 'delete')
  {
    render = <del key={key}>{formatContent(children, extra, deep + 1)}</del>
  }
  else if (type === 'highlight')
  {
    render = <HighlightedText key={key}>{formatContent(children, extra, deep + 1)}</HighlightedText>
  }
  else if (type === 'inlineMath')
  {
    render = <MathBlock key={key} node={node} />
  }
  else if (type === 'inlineCode')
  {
    render = <Code key={key}>{value}</Code>
  }
  else if (type === 'image')
  {
    render = (
      <span key={key} className="w-full block mx-auto">
        <Image src={formatRelativeUrl(node.url, baseUrl)} />
      </span>
    )
  }
  else if (type === 'text')
  {
    render = decodeHtmlCharCodes(value)
  }

  return render
}

function formatRelativeUrl(url, baseUrl) {
  if (isUrlAbsolute(url) || !baseUrl) {
    return url
  }
  
  const domain = extractBaseUrl(baseUrl)

  if (url.startsWith('/')) {
    return `${domain}${url}`
  }

  return `${domain}/${url}`
}

const ListDecoration = forwardRef(_ListDecoration)

function _ListDecoration({ order, onClick, hasChildren }, ref) {
  return (
    <ListDecorationElement ref={ref}>
      <ListDecorationContent
        order={order}
        onClick={onClick}
        hasChildren={hasChildren}
      >
        {order ? `${order}.` : '•'}
      </ListDecorationContent>
    </ListDecorationElement>
  )
}
