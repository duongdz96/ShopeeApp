const images = {
  imageBackgroundApp: require('~/resources/images/imageBackgroundApp.png'),

  //animation
  homeAnimate: require('../../assets/home.png'),
  heart: require('../../assets/heart.png'),
  profile: require('../../assets/pro5.png'),
  whilist: require('../../assets/whilist.png'),
};

export default (imageName: keyof typeof images) => {
  return images[imageName];
};
