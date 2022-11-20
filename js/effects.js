const uploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview');
const levelSlider = uploadForm.querySelector('.effect-level__slider');
const levelValue = uploadForm.querySelector('.effect-level__value');
const effects = {
  'chrome': {
    filter: 'grayscale( )',
    options: {
      min: 0,
      max: 1,
      start: 0,
      step: 0.1
    }
  },
  'sepia': {
    filter: 'sepia( )',
    options: {
      min: 0,
      max: 1,
      start: 0,
      step: 0.1
    }
  },
  'marvin': {
    filter: 'invert( %)',
    options: {
      min: 0,
      max: 100,
      start: 0,
      step: 1
    }
  },
  'phobos': {
    filter: 'blur( px)',
    options: {
      min: 0,
      max: 3,
      start: 0,
      step: 0.1
    }
  },
  'heat': {
    filter: 'brightness( )',
    options: {
      min: 1,
      max: 3,
      start: 1,
      step: 0.1
    }
  },
};

noUiSlider.create(levelSlider, { range: { min: 0, max: 0 }, start: 0 });

let previousEffect = 'effects__preview--none';

const removeFilter = () => {
  imgUploadPreview.classList.remove(previousEffect);
  imgUploadPreview.classList.add('effects__preview--none');
  imgUploadPreview.style.filter = 'none';
  levelSlider.classList.toggle('hidden');
  previousEffect = 'effects__preview--none';
};

const updSliderOptions = (newOpt) => {
  levelSlider.noUiSlider.updateOptions({
    range: { min: newOpt.min, max: newOpt.max},
    start: newOpt.start,
    step: newOpt.step
  });
};

const onUpdSlider = (slider, effect) => {
  slider.noUiSlider.on('update', () => {
    levelValue.value = slider.noUiSlider.get();
    const filter = effects[effect].filter.replace(' ', levelValue.value);
    imgUploadPreview.style.filter = filter;
  });
};

const changeEffect = (evt) => {
  if (evt.target.id.slice(0, 7) === 'effect-') {
    const newEffectName = evt.target.id.slice(7);
    const currentEffect = `effects__preview--${newEffectName}`;
    imgUploadPreview.classList.remove(previousEffect);
    imgUploadPreview.classList.add(currentEffect);
    previousEffect = currentEffect;
    if (newEffectName === 'none') {
      imgUploadPreview.style.filter = 'none';
      levelSlider.classList.toggle('hidden');
    }
    else {
      if (levelSlider.classList.contains('hidden')) {
        levelSlider.classList.remove('hidden');
      }
      updSliderOptions(effects[newEffectName].options);
      onUpdSlider(levelSlider, newEffectName);
    }
  }
};

export{changeEffect, removeFilter};
