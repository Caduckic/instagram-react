import Card from './Card'
import StoryCard from './StoryCard'
import commentService from '../services/comments'

const MainCardColumn = ({ users, currentUser, posts, setPosts }) => {
  const postComment = (comment, post) => {
    console.log(post.id, currentUser.id)
    commentService
      .create(comment, post.id, currentUser.id)
      .then(comment => {
        const updatedPost = post
        updatedPost.comments = updatedPost.comments.concat(comment)
        const updatedUser = currentUser
        updatedUser.comments = updatedUser.comments.concat(comment)

        setPosts(posts.map(p =>
          p.id !== updatedPost.id ? p : updatedPost
        ))
      })
  }

  return (
    <div className='main-card-column'>
      <StoryCard users={users.filter(user => user.hasStory && user.id !== currentUser.id)} />
      <div className='card-flex'>
        {posts.reverse().map(post => {
          return (
            <Card key={post.id} post={post} postComment={postComment} />
          )
        })}
      </div>
    </div>
  )
}

export default MainCardColumn
