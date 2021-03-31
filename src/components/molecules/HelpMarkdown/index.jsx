import { useEffect, useState } from 'react'
import Portal from '@reach/portal'
import katex from 'katex'

import {
  Container, HelpIcon, HelpContainer,
  HelpHeader, IconButtonEl,
  HelpContent, LinkEl,
  CodeEl, ImageEl, BlockquoteEl,
} from './styles'

function HelpMarkdown() {
  const [isHelpOpen, setHelpOpen] = useState(false)
  const [mathValue, setMathValue] = useState(null)

  const openHelp = () => setHelpOpen(true)
  const closeHelp = () => setHelpOpen(false)

  useEffect(() => {
    setMathValue(katex.renderToString('E = mc^2', {
      throwOnError: false
    }))
  }, [])

  return (
    <Portal>
      {isHelpOpen ? (
        <HelpContainer>
          <HelpHeader>
            Help
            <IconButtonEl icon="times" onClick={closeHelp} />
          </HelpHeader>
          <HelpContent>
            <div className="text-gray-400">
              <div className="text-center text-sm font-medium text-gray-500">Commands</div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">New block</div>
                <div className="text-sm text-right font-medium font-mono"><em>Enter</em></div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">Indent</div>
                <div className="text-sm text-right font-medium font-mono"><em>Tab</em></div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">Unindent</div>
                <div className="text-sm text-right font-medium font-mono"><em>Shift+Tab</em></div>
              </div>
              <div className="text-center text-sm font-medium text-gray-500">Heading</div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">#</div>
                <div className="text-sm text-right font-medium">H1</div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">##</div>
                <div className="text-sm text-right font-medium">H2</div>
              </div>
              ...
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">######</div>
                <div className="text-sm text-right font-medium">H6</div>
              </div>
              <div className="text-center text-sm font-medium text-gray-500">Markdown</div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">
                  **Bold**
                </div>
                <div className="text-sm text-right font-medium">
                  <strong>Bold</strong>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">
                  *Italic*
                </div>
                <div className="text-sm text-right font-medium">
                  <em>Italic</em>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">
                  ~~Strikethrough~~
                </div>
                <div className="text-sm text-right font-medium">
                  <del>Delete</del>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">
                  $$E=mc^2$$
                </div>
                <div className="text-sm text-right font-medium">
                  <div dangerouslySetInnerHTML={{ __html: mathValue }}></div>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">
                  `Code`
                </div>
                <div className="text-sm text-right font-medium">
                  <CodeEl>Code</CodeEl>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">
                  > Blockquote
                </div>
                <div className="text-sm text-right font-medium">
                  <BlockquoteEl>Blockquote</BlockquoteEl>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">
                  [opal](www.opal.to)
                </div>
                <div className="text-sm text-right font-medium">
                  <LinkEl>opal</LinkEl>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between">
                <div className="text-sm text-left font-medium">
                  ![opal](lisa.jpg)
                </div>
                <div className="text-sm text-right font-medium">
                  <ImageEl src="data:image/jpeg;base64,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" />
                </div>
              </div>
            </div>
          </HelpContent>
        </HelpContainer>
      ) : (  
        <Container onClick={openHelp}>
          <HelpIcon icon="question" />
        </Container>
      )}
    </Portal>
  )
}

export default HelpMarkdown
