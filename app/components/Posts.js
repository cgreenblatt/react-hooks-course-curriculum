import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'

const reducer = (state, action) => {
  switch(action.type) {
    case 'success': return { posts: action.posts, error: '', loading: false };
    case 'error': return { posts: null, error: action.message, loading: false };
    case 'loading': return { posts: null, error: '', loading: true };
    default: throw Error(`Unknown action ${action.type} was passed to the reducer`);
  }
}

export default function Posts({ type }) { 
  const [state, dispatch] = useReducer(reducer, { posts: null, error: '', loading: true });
  useEffect(() => {
    dispatch({ type: 'loading' });
    fetchMainPosts(type)
    .then((posts) => dispatch({ type: 'success', posts }))
    .catch(({ message }) => dispatch({ type: 'error', message }))
  }, [type])

  const { posts, error, loading } = state;

  if (loading === true) {
    return <Loading />
  }
  if (error) {
    return <p className='center-text error'>{error}</p>
  }
  return <PostsList posts={posts} />
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}