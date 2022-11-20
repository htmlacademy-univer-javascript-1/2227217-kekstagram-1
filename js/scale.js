const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadScale = document.querySelector('.img-upload__scale');
const smallerScaleButton = imgUploadScale.querySelector('.scale__control--smaller');
const scaleValue = imgUploadScale.querySelector('.scale__control--value');
const biggerScaleButton = imgUploadScale.querySelector('.scale__control--bigger');
let scale = parseInt(scaleValue.value.replace('%', ''), 10);
const minus = () => {
  if (scale - 25 < 25) {
    scale = 25;
  } else {
    scale -= 25;
  }
  scaleValue.value = `${scale}%`;
  imgUploadPreview.style = `transform: scale(${scale / 100})`;
};
const plus = () => {
  if (scale + 25 > 100) {
    scale = 100;
  } else {
    scale += 25;
  }
  scaleValue.value = `${scale}%`;
  imgUploadPreview.style = `transform: scale(${scale / 100})`;
};
smallerScaleButton.addEventListener('click', minus);
biggerScaleButton.addEventListener('click', plus);
export { scaleValue };


