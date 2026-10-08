import type { ImageSourcePropType } from 'react-native';

const coverImages: Record<string, ImageSourcePropType> = {
  anotherside: require('../../assets/covers/anotherside.jpg'),
  blonde: require('../../assets/covers/blonde.jpg'),
  bloodonthetrack: require('../../assets/covers/bloodonthetrack.jpg'),
  bobdylan: require('../../assets/covers/bobdylan.jpg'),
  bringingitback: require('../../assets/covers/bringingitback.jpg'),
  desire: require('../../assets/covers/desire.jpg'),
  downinthegroove: require('../../assets/covers/downinthegroove.jpg'),
  empireburlesque: require('../../assets/covers/empireburlesque.jpg'),
  freewheeling: require('../../assets/covers/freewheeling.jpg'),
  hardrain: require('../../assets/covers/hardrain.jpg'),
  // Accept the older catalog key while its local image is named hardrain.jpg.
  hardrainsgon: require('../../assets/covers/hardrain.jpg'),
  highway61revisited: require('../../assets/covers/highway61revisited.jpg'),
  infedels: require('../../assets/covers/infidels.jpg'),
  infidels: require('../../assets/covers/infidels.jpg'),
  johnweasley: require('../../assets/covers/johnwesley.jpg'),
  johnwesley: require('../../assets/covers/johnwesley.jpg'),
  knockedoutloaded: require('../../assets/covers/knockedoutloaded.jpg'),
  loveandtheft: require('../../assets/covers/loveandtheft.jpg'),
  moderntimes: require('../../assets/covers/moderntimes.jpg'),
  nashville: require('../../assets/covers/nashville.jpg'),
  newmorning: require('../../assets/covers/newmorning.jpg'),
  ohmercy: require('../../assets/covers/ohmercy.jpg'),
  planetwaves: require('../../assets/covers/planetwaves.jpg'),
  roughnroudy: require('../../assets/covers/roughnroudy.jpg'),
  saved: require('../../assets/covers/saved.jpg'),
  selfportrait: require('../../assets/covers/selfportrait.jpg'),
  shadowkingdom: require('../../assets/covers/shadowkingdom.jpg'),
  shotoflove: require('../../assets/covers/shotoflove.jpg'),
  slowtrain: require('../../assets/covers/slowtrain.jpg'),
  streetlegal: require('../../assets/covers/streetlegal.jpg'),
  tempest: require('../../assets/covers/tempest.jpg'),
  thebasementtapes: require('../../assets/covers/thebasementtapes.jpg'),
  timeoutofmind: require('../../assets/covers/timeoutofmind.jpg'),
  timeschanging: require('../../assets/covers/timeschanging.jpg'),
  togetherthroughlife: require('../../assets/covers/togetherthroughlife.jpg'),
  undertheredsky: require('../../assets/covers/undertheredsky.jpg'),
};

export function getCover(cover?: string) {
  const key = cover?.trim().toLowerCase().replace(/\.(?:jpe?g|png)$/i, '');
  return key ? coverImages[key] : undefined;
}
