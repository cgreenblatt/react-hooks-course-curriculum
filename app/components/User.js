import React, { useEffect, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom';
import { fetchUser, fetchPosts } from '../utils/api'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'
import PostsList from './PostsList'

const reducer = (state, action) => {
  switch(action.type) {
    case 'posts': return {
      ...state,
      posts: action.posts,
      loadingPosts: false,
      error: ''
    }
    case 'error': return {
      ...state,
      loadingUser: false,
      loadingPosts: false,
      error: action.error
    }
    case 'user': return {
      ...state,
      user: action.user,
      loadingUser: false,
    }
    default: throw Error(`Action ${action.type} is not suppported`)
  }
}

const initialState = {
  error: '',
  loaadingPosts: true,
  loadingUser: true,
  posts: [],
  user: null,
}
export default function User() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sp] = useSearchParams();
  const id = sp.get('id');

  useEffect(() => {
    fetchUser(id)
      .then((user) => {
        dispatch({ type: 'user', user })
        return fetchPosts(user.submitted.slice(0, 30))
      })
      .then((posts) => dispatch({ type: 'posts', posts }))
      .catch(({ message }) => dispatch({ type: 'error', error }))
  }, [id]);

  const { posts, loadingUser, loadingPosts, error, user } = state;

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return (
    <React.Fragment>
      {loadingUser === true
        ? <Loading text='Fetching User' />
        : <React.Fragment>
            <h1 className='header'>{user.id}</h1>
            <div className='meta-info-light'>
              <span>joined <b>{formatDate(user.created)}</b></span>
              <span>has <b>{user.karma.toLocaleString()}</b> karma</span>
            </div>
            <p dangerouslySetInnerHTML={{__html: user.about}} />
          </React.Fragment>}
      {loadingPosts === true
        ? loadingUser === false && <Loading text='Fetching posts'/>
        : <React.Fragment>
            <h2>Posts</h2>
            <PostsList posts={posts} />
          </React.Fragment>}
    </React.Fragment>
  )
}
