import BottomFooter from './components/BottomFooter'
import MainCardColumn from './components/MainCardColumn'
import MainEndColumn from './components/MainEndColumn'
import MainNavigation from './components/MainNavigation'
import TopNavigation from './components/TopNavigation'
import './styles.css'

const App = () => {
  return (
    <div className='body-flex'>
      <MainNavigation />
      <div className='main-container'>
        <div className='main-flex'>
          <div className='main-block'>
            <div className='main-inner-flex'>
              <MainCardColumn />
              <MainEndColumn />
            </div>
          </div>
          <BottomFooter />
        </div>
        <TopNavigation />
      </div>
    </div>
  )
}

export default App
