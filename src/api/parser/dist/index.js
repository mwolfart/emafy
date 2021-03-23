"use strict";
exports.__esModule = true;
exports.parseSimpleArtists = exports.parseSavedTracks = exports.parseSavedAlbums = exports.parseTracks = exports.parseAlbums = exports.parseSimpleArtist = exports.parseAlbum = void 0;
var media_1 = require("types/media");
var parseImages = function (images) { return images === null || images === void 0 ? void 0 : images.map(function (item) { return item.url; }); };
exports.parseAlbum = function (_a) {
    var artists = _a.artists, images = _a.images, total_tracks = _a.total_tracks, id = _a.id, name = _a.name;
    var imagesLinks = parseImages(images);
    var parsedArtists = artists.map(function (_a) {
        var id = _a.id, name = _a.name;
        return ({
            id: id,
            name: name,
            type: media_1.MediaType.artist
        });
    });
    return {
        name: name,
        images: imagesLinks,
        id: id,
        artists: parsedArtists,
        totalTracks: total_tracks,
        type: media_1.MediaType.album
    };
};
var parseTrack = function (_a) {
    var artists = _a.artists, album = _a.album, id = _a.id, name = _a.name, duration_ms = _a.duration_ms;
    var imagesLinks = parseImages(album.images);
    var parsedArtists = artists.map(function (_a) {
        var id = _a.id, name = _a.name;
        return ({
            id: id,
            name: name,
            type: media_1.MediaType.artist
        });
    });
    return {
        name: name,
        images: imagesLinks,
        id: id,
        artists: parsedArtists,
        albumReference: album.id,
        duration: duration_ms,
        type: media_1.MediaType.song
    };
};
exports.parseSimpleArtist = function (_a) {
    var total = _a.followers.total, genres = _a.genres, id = _a.id, images = _a.images, name = _a.name, popularity = _a.popularity;
    var imagesLinks = parseImages(images);
    return {
        id: id,
        images: imagesLinks,
        name: name,
        genres: genres,
        followers: total,
        popularity: popularity,
        type: media_1.MediaType.artist
    };
};
exports.parseAlbums = function (rawAlbums) {
    return rawAlbums.map(function (item) { return exports.parseAlbum(item); });
};
exports.parseTracks = function (rawTracks) {
    return rawTracks.map(function (item) { return parseTrack(item); });
};
exports.parseSavedAlbums = function (savedAlbums) { return savedAlbums.map(function (_a) {
    var album = _a.album;
    return exports.parseAlbum(album);
}); };
exports.parseSavedTracks = function (savedTracks) {
    return savedTracks.map(function (_a) {
        var track = _a.track;
        return parseTrack(track);
    });
};
exports.parseSimpleArtists = function (items) { return items.map(function (rawArtist) { return exports.parseSimpleArtist(rawArtist); }); };
