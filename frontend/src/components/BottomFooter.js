import Footer from './Footer'

const BottomFooter = ({ isLogin }) => {
  return (
    <div className={ isLogin ? 'footer-stay' : 'footer'}>
      <div className="footer-flex">
        <Footer />
      </div>
    </div>
  )
}

export default BottomFooter
