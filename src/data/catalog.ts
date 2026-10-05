import rawCatalog from './catalog.json';

export type Track = {
  id: string;
  title: string;
  lyrics: string;
};

export type Album = {
  id: string;
  title: string;
  releaseDate?: string;
  cover?: string;
  tracks: Track[];
};

export type CatalogTrack = Track & {
  albumId: string;
  albumTitle: string;
};

export const albums = rawCatalog.albums as Album[];

export const tracks: CatalogTrack[] = albums.flatMap((album) =>
  album.tracks.map((track) => ({
    ...track,
    albumId: album.id,
    albumTitle: album.title,
  })),
);

export function findAlbum(id: string | undefined) {
  return albums.find((album) => album.id === id);
}

export function findTrack(id: string | undefined) {
  return tracks.find((track) => track.id === id);
}
