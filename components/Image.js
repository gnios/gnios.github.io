import NextImage from 'next/image'

const Image = ({ ...rest }) => (
  <NextImage {...rest} placeholder="blur" blurDataURL="/static/images/SVG-placeholder.png" />
)

export default Image
