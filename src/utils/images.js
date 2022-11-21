import image1 from '../images/adventure.jpg'
import image2 from '../images/beach.jpg'
import image3 from '../images/car.jpg'
import image4 from '../images/cat.jpg'
import image5 from '../images/color.jpg'
import image6 from '../images/dog.jpg'
import image7 from '../images/flower.jpg'
import image8 from '../images/hand.jpg'
import icon1 from '../images/icon1.jpg'
import icon2 from '../images/icon2.jpg'
import icon3 from '../images/icon3.jpg'
import icon4 from '../images/icon4.jpg'
import icon5 from '../images/icon5.jpg'
import icon6 from '../images/icon6.jpg'

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8
]

const icons = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6
]

const getPostImageById = (id) => {
  if (id > 8 || id < 1) return image1
  return images[id - 1]
}

const getUserImageById = (id) => {
  if (id > 6 || id < 1) return icon1
  return icons[id - 1]
}

export default {
  getPostImageById,
  getUserImageById
}