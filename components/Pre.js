'use client'

import { useState, useRef, useMemo } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

const Pre = (props) => {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const codeRef = useRef(null)

  const code = useMemo(() => {
    const children = props.children
    if (!children) return ''
    if (typeof children === 'string') return children.trim()
    if (children.props?.children) return children.props.children.trim()
    return ''
  }, [props.children])

  const language = useMemo(() => {
    const children = props.children
    const className = children?.props?.className ?? ''
    return className.replace('language-', '') || 'text'
  }, [props.children])

  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(code)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setCopied(false)
      }}
      className="relative"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-2 top-2 z-10 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
            copied
              ? 'border-green-400 focus:border-green-400 focus:outline-none'
              : 'border-gray-300'
          }`}
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className={copied ? 'text-green-400' : 'text-gray-300'}
          >
            {copied ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            )}
          </svg>
        </button>
      )}

      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={codeRef}
            className={`${className} rounded-lg border border-gray-600 p-4 dark:border-gray-700`}
            style={style}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              return (
                <div key={i} className={lineProps.className} style={lineProps.style}>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key })
                    return (
                      <span key={key} className={tokenProps.className} style={tokenProps.style}>
                        {tokenProps.children}
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Pre
