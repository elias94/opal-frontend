import { useEffect, useState } from 'react'
import markdown from 'remark-parse'
import math from 'remark-math'
import unified from 'unified'
import remark2rehype from 'remark-rehype'
import katex from 'rehype-katex'
import html from 'rehype-stringify'

function MathBlock({ node }) {
  const [compiledMath, setCompiledMath] = useState(null)
  
  useEffect(() => {
    const hast = unified()
      .use(markdown)
      .use(math)
      .use(remark2rehype)
      .use(katex)
      .runSync(node)

    const compiled = unified()
      .use(html)
      .stringify(hast)

    setCompiledMath(compiled)
  }, [node])

  return (
    <span dangerouslySetInnerHTML={{ __html: compiledMath }}/>
  )
}

export default MathBlock
