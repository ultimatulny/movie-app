import { Row, Col, Image, Tag } from 'antd'
import { format, parseISO } from 'date-fns'

import './Card.css'

const Card = (props) => {
  let imageUrl
  if (props.children.image === null) {
    imageUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQiTb3VMvQ5PY3aj3W7DMjgZNkA1IN_M8iKuwihwwOKjCa5wue3uqCNojpOzNQHBImZVc&usqp=CAU'
  } else {
    imageUrl = `https://image.tmdb.org/t/p/w500/${props.children.image}`
  }

  const date = props.children.date ? format(parseISO(props.children.date), 'MMMM d, yyyy') : null

  function truncateDescription(description, maxLength) {
    if (description.length <= maxLength) {
      return description
    }

    let truncatedText = description.slice(0, maxLength)
    let lastSpaceIndex = truncatedText.lastIndexOf(' ')

    truncatedText = truncatedText.slice(0, lastSpaceIndex) + '...'

    return truncatedText
  }

  return (
    <Col span={12} className="CardCol">
      <div className="Card">
        <Row style={{ height: '100%' }}>
          <Col span={10} style={{ height: '100%' }}>
            <Image width={183} src={imageUrl} style={{ height: '100%' }} />
          </Col>
          <Col span={14} className="filmDescribe">
            <Row gutter={[0, 7]}>
              <Col span={24}>
                <h2 className="filmTitle">{props.children.title}</h2>
              </Col>
              <div className="filmDate">{date}</div>
              <div className="filmTags">
                <Tag>Action</Tag>
                <Tag>Drama</Tag>
                <Tag>18+</Tag>
              </div>
              <div className="filmAbout">{truncateDescription(props.children.about, 160)}</div>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  )
}

export default Card
