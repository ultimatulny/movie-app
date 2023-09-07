import React from 'react'
import './Rating.css'

export default class Rating extends React.Component {
  state = {
    color: null,
  }

  componentDidMount() {
    this.updateColor()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rating !== this.props.rating) {
      this.updateColor()
    }
  }

  updateColor = () => {
    const { rating } = this.props
    let color = null

    if (rating >= 0 && rating <= 3) {
      color = '#E90000'
    } else if (rating > 3 && rating <= 5) {
      color = '#E97E00'
    } else if (rating > 5 && rating <= 7) {
      color = '#E9D100'
    } else {
      color = '#66E900'
    }

    this.setState({ color })
  }

  render() {
    const { rating } = this.props
    const { color } = this.state

    return (
      <div className="ratingBlock" style={{ borderColor: color }}>
        {rating}
      </div>
    )
  }
}
