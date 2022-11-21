import Card from './Card'
import StoryCard from './StoryCard'

const MainCardColumn = ({ users, currentUser, posts, comments }) => {
  return (
    <div className='main-card-column'>
      <StoryCard users={users.filter(user => user.hasStory && user.id !== currentUser.id)} />
      <div className='card-flex'>
        {posts.map(post => {
          const user = users.filter(user => user.id === post.user)[0]
          const postComments = comments.filter(comment => comment.post === post.id)
          return (
            <Card key={post.id} post={post} user={user} comments={postComments} />
          )
        })}
      </div>
    </div>
  )
}

export default MainCardColumn
