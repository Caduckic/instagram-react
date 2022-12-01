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
  {
    image: image1,
    id: 1
  },
  {
    image: image2,
    id: 2
  },
  {
    image: image3,
    id: 3
  },
  {
    image: image4,
    id: 4
  },
  {
    image: image5,
    id: 5
  },
  {
    image: image6,
    id: 6
  },
  {
    image: image7,
    id: 7
  },
  {
    image: image8,
    id: 8
  },
]

const icons = [
  {
    image: icon1,
    id: 1
  },
  {
    image: icon2,
    id: 2
  },
  {
    image: icon3,
    id: 3
  },
  {
    image: icon4,
    id: 4
  },
  {
    image: icon5,
    id: 5
  },
  {
    image: icon6,
    id: 6
  }
]

const getPostImageById = (id) => {
  if (id > 8 || id < 1) return image1
  return images[id - 1].image
}

const getUserImageById = (id) => {
  if (id > 6 || id < 1) return icon1
  return icons[id - 1].image
}

const getPostImages = () => {
  return images
}

const getUserImages = () => {
  return icons
}

export default {
  getPostImageById,
  getUserImageById,
  getPostImages,
  getUserImages
}