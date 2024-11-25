/*
  Warnings:

  - You are about to drop the `_FavoriteAlbums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteArtists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteTracks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavoriteAlbums" DROP CONSTRAINT "_FavoriteAlbums_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteAlbums" DROP CONSTRAINT "_FavoriteAlbums_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteArtists" DROP CONSTRAINT "_FavoriteArtists_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteArtists" DROP CONSTRAINT "_FavoriteArtists_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteTracks" DROP CONSTRAINT "_FavoriteTracks_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteTracks" DROP CONSTRAINT "_FavoriteTracks_B_fkey";

-- DropTable
DROP TABLE "_FavoriteAlbums";

-- DropTable
DROP TABLE "_FavoriteArtists";

-- DropTable
DROP TABLE "_FavoriteTracks";

-- DropTable
DROP TABLE "favorites";

-- CreateTable
CREATE TABLE "FavoriteTrack" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "FavoriteTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteAlbum" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "FavoriteAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteArtist" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavoriteArtist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteTrack_trackId_key" ON "FavoriteTrack"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAlbum_albumId_key" ON "FavoriteAlbum"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtist_artistId_key" ON "FavoriteArtist"("artistId");

-- AddForeignKey
ALTER TABLE "FavoriteTrack" ADD CONSTRAINT "FavoriteTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbum" ADD CONSTRAINT "FavoriteAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
