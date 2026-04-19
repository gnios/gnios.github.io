import NextImage from 'next/image'

const Image = ({ layout, ...rest }) => {
  // Don't use blur placeholder with layout="fill" to avoid compatibility issues
  if (layout === 'fill') {
    return <NextImage {...rest} layout={layout} />
  }

  return (
    <NextImage
      {...rest}
      layout={layout}
      placeholder="blur"
      blurDataURL="/static/images/SVG-placeholder.png"
    />
  )
}

export default Image
