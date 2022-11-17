import Card from './Card'
import StoryCard from './StoryCard'

const MainCardColumn = () => {
  return (
    <div className='main-card-column'>
      <StoryCard />
      <div className='card-flex'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default MainCardColumn
