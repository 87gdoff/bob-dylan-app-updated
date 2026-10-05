# Bob Dylan Lyrics

An offline-first React Native app built with Expo. The Android application ID is `com.arts.gdylan2`, matching the Play Store listing.

## Run it

Install Node.js 22 or newer and the Android SDK, then run:

```sh
npm install
npx expo start
```

Scan the QR code with Expo Go for development. To install a native development build over USB debugging, connect and authorize the phone, then run:

```sh
npx expo run:android
```

Expo SDK 57 compiles and targets Android API 36.

## Update the catalogue

All album, track, release-date, and lyric content lives in [`src/data/catalog.json`](src/data/catalog.json). The home album grid, album tracklists, and song search are generated from that file. Favourites are saved locally on the device with AsyncStorage; there is no server or network dependency for browsing lyrics.

Each album has a unique `id`, a `title`, and a `tracks` array. Each track needs a unique `id`, a `title`, and its `lyrics` text. `releaseDate` and `cover` are optional. Add new albums and songs to the `albums` array; the screens will pick them up automatically. To use new cover art, add the image under `assets/covers/` and register its filename in `src/data/covers.ts`.

The initial catalogue and album artwork were migrated from the original Android project in the sibling `gdylan2/` folder.

## Before a Play release

- Confirm the Play Console production version code and set `android.versionCode` in `app.json` higher than that value. The starter value is not confirmed for release.
- Sign the Android App Bundle with the upload key registered in Play Console. If that upload key is unavailable, request an upload-key reset in Play Console.
- Test the release on devices targeting Android 16 behavior before submitting it.
- Confirm you have the rights needed to redistribute the lyrics and album artwork in a new release.
