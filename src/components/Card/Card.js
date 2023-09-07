import React, { useState } from 'react'
import { Tag, Rate } from 'antd'
import { format, parseISO } from 'date-fns'

import { ConsumerTMDB } from '../TMDBContext'
import Rating from '../Rating'

import './Card.css'

const Card = (props) => {
  const [rate, setRate] = useState(0)
  const setFilmRate = (e) => {
    setRate(e)
  }

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

  // return (
  //   <ConsumerTMDB>
  //     {({ genres, addRating, ratedFilms }) => {
  //       return (
  //         <Col span={{ xs: 24, sm: 24, md: 24, lg: 12 }} className="CardCol">
  //           <div className="Card">
  //             <Row style={{ height: '100%' }}>
  //               <Col span={10} style={{ height: '100%' }}>
  //                 <Image width={183} src={imageUrl} style={{ height: '100%' }} />
  //               </Col>
  //               <Col span={14} className="filmDescribe">
  //                 <Row gutter={[0, 7]}>
  //                   <Col span={24} className="filmHeader">
  //                     <h2 className="filmTitle">{props.children.title}</h2>
  //                     <Rating rating={props.children.rate} />
  //                   </Col>
  //                   <Col span={24} className="filmDate">
  //                     {date}
  //                   </Col>
  //                   <div className="filmTags">
  //                     {genres.map((el, i) =>
  //                       props.children.tags.includes(el.id) ? <Tag key={i}>{el.name}</Tag> : null
  //                     )}
  //                   </div>
  //                   <div className="filmAbout">{truncateDescription(props.children.about, 100)}</div>
  //                   <Rate
  //                     allowHalf
  //                     count={10}
  //                     style={{ fontSize: '16px' }}
  //                     onChange={(value) => {
  //                       setFilmRate(value)
  //                       addRating(props.filmId, value)
  //                     }}
  //                     value={props.filmId in ratedFilms ? ratedFilms[props.filmId] : rate}
  //                   />
  //                 </Row>
  //               </Col>
  //             </Row>
  //           </div>
  //         </Col>
  //       )
  //     }}
  //   </ConsumerTMDB>
  // )
  return (
    <ConsumerTMDB>
      {({ genres, addRating, ratedFilms }) => {
        return (
          <div className="Card">
            <img src={imageUrl} alt="Film poster" />
            <div className="card_header">
              <div className="filmTitleRating">
                <h2 className="filmTitle">{props.children.title}</h2>
                <Rating rating={props.children.rate} />
              </div>

              {date}

              <div className="filmTags">
                {genres.map((el, i) => (props.children.tags.includes(el.id) ? <Tag key={i}>{el.name}</Tag> : null))}
              </div>
            </div>

            <div className="filmAbout">{truncateDescription(props.children.about, 100)}</div>
            <Rate
              className="filmRate"
              allowHalf
              count={10}
              style={{ fontSize: '16px' }}
              onChange={(value) => {
                setFilmRate(value)
                addRating(props.filmId, value)
              }}
              value={props.filmId in ratedFilms ? ratedFilms[props.filmId] : rate}
            />
          </div>
        )
      }}
    </ConsumerTMDB>
  )
}

export default Card
