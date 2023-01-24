import React, { useEffect, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom';
import { fetchItem, fetchComments } from '../utils/api'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'

const reducer = (state, action) => {
  switch(action.type) {
    case 'init': return initialState
    case 'post' : return {
      ...state,
      loadingPost: false,
      post: action.post,
    }
    case 'comments': return {
      ...state,
      loadingComments: false,
      comments: action.comments,
    }
    case 'error': return {
      ...state,
      loadingComments: false,
      loadingPost: false,
      error: action.error,
    }
    default: throw Error(`Action ${action.type} is not supported`)
  }
}

const initialState = {
  post: null,
  loadingPost: true,
  comments: null,
  loadingComments: true,
  error: ''
}

export default function Post() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sp] = useSearchParams();
  const id = sp.get('id');

  useEffect(() => {
    dispatch({ type: 'init' });
    fetchItem(id)
    .then((post) => {
      dispatch({ type: 'post', post });
      return fetchComments(post.kids || [])
    })
    .then((comments) => dispatch({ type: 'comments', comments }))
    .catch(({ message }) => dispatch({ type: 'error', error: message }));
  }, [id])

  const { post, loadingPost, comments, loadingComments, error } = state;

    if (error) {
      return <p className='center-text error'>{error}</p>
    }

    return (
      <React.Fragment>
        {loadingPost === true
          ? <Loading text='Fetching post' />
          : <React.Fragment>
              <h1 className='header'>
                <Title url={post.url} title={post.title} id={post.id} />
              </h1>
              <PostMetaInfo
                by={post.by}
                time={post.time}
                id={post.id}
                descendants={post.descendants}
              />
              <p dangerouslySetInnerHTML={{__html: post.text}} />
            </React.Fragment>}
        {loadingComments === true
          ? loadingPost === false && <Loading text='Fetching comments' />
          : <React.Fragment>
              {comments.map((comment) =>
                <Comment
                  key={comment.id}
                  comment={comment}
                />
              )}
            </React.Fragment>}
      </React.Fragment>
    )
}
