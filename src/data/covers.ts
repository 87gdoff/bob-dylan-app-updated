import type { ImageSourcePropType } from 'react-native';

const coverImages: Record<string, ImageSourcePropType> = {
  'anotherside.jpg': require('../../assets/covers/anotherside.jpg'),
  'blonde.jpg': require('../../assets/covers/blonde.jpg'),
  'bloodonthetrack.jpg': require('../../assets/covers/bloodonthetrack.jpg'),
  'bobdylan.jpg': require('../../assets/covers/bobdylan.jpg'),
  'bringingitback.jpg': require('../../assets/covers/bringingitback.jpg'),
  'desire.jpg': require('../../assets/covers/desire.jpg'),
  'freewheeling.jpg': require('../../assets/covers/freewheeling.jpg'),
  'hardrainsgon.jpg': require('../../assets/covers/hardrainsgon.jpg'),
  'highway61revisited.jpg': require('../../assets/covers/highway61revisited.jpg'),
  'infedels.jpg': require('../../assets/covers/infedels.jpg'),
  'johnweasley.jpg': require('../../assets/covers/johnweasley.jpg'),
  'nashville.jpg': require('../../assets/covers/nashville.jpg'),
  'newmorning.jpg': require('../../assets/covers/newmorning.jpg'),
  'roughnroudy.jpg': require('../../assets/covers/roughnroudy.jpg'),
  'saved.jpg': require('../../assets/covers/saved.jpg'),
  'shotoflove.jpg': require('../../assets/covers/shotoflove.jpg'),
  'slowtrain.jpg': require('../../assets/covers/slowtrain.jpg'),
  'streetlegal.jpg': require('../../assets/covers/streetlegal.jpg'),
  'tempest.jpg': require('../../assets/covers/tempest.jpg'),
  'timeoutofmind.jpg': require('../../assets/covers/timeoutofmind.jpg'),
  'timeschanging.jpg': require('../../assets/covers/timeschanging.jpg'),
};

export function getCover(cover?: string) {
  return cover ? coverImages[cover] : undefined;
}
