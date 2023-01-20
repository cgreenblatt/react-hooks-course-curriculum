import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default function Loading({ speed = 300, text = 'Loading'}) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = window.setInterval(() => {
      setDots((dots) => {
        return dots.length === 3
          ? '.'
          : dots.concat('.');
      })
    }, speed)
    return () => clearInterval(interval);
  }, []);

  return (
    <p style={styles.content}>
      {`${text} ${dots}`}
    </p>
  )
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
}
