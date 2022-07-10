import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { DeleteResponseDTO } from './dto/delete-response.dto';
import { Genre } from '../genres/dto/genre.dto';
import { BandCreateUpdateDTO } from '../bands/dto/band-create-update.dto';
import { Band } from '../bands/dto/band.dto';
import { TrackCreateUpdateDTO } from '../tracks/dto/track-create-update.dto';
import { Track } from '../tracks/dto/track.dto';
import { ArtistCreateUpdateDTO } from '../artists/dto/artist-create-update.dto';
import { Artist } from '../artists/dto/artist.dto';
import { AlbumCreateUpdateDTO } from '../albums/dto/album-create-update.dto';
import { Album } from '../albums/dto/album.dto';

const NO_SERVER_RESPONSE_VALUE = 'No Server Response';

@Injectable()
export class SharedService {
  private caughtErrorMessage = NO_SERVER_RESPONSE_VALUE;
  public readonly genreDefaultData: Genre;
  public readonly genreBaseURL: string;
  public readonly BandsDefaultData: BandCreateUpdateDTO;
  public readonly BandsBaseURL: string;
  public readonly artistsDefaultData: ArtistCreateUpdateDTO;
  public readonly artistsBaseURL: string;

  constructor() {
    this.genreDefaultData = {
      id: '',
      name: '',
      description: '',
      country: '',
      year: 0,
    };
    this.genreBaseURL = process.env.GENRES_URL;
    this.BandsDefaultData = {
      id: '',
      name: '',
      members: [],
      genresIds: [],
    };
    this.BandsBaseURL = process.env.BANDS_URL;
    this.artistsDefaultData = {
      id: '',
      firstName: '',
      secondName: '',
      country: '',
      bandsIds: [],
      instruments: [],
    };
    this.artistsBaseURL = process.env.ARTISTS_URL;
  }

  public async create<T, Q>(
    inputDTO: Q,
    defaultData: T,
    baseURL: string,
  ): Promise<T> {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .post('', inputDTO, config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.id = response.data._id;
    return response ? response.data : this.getCaughtErrorData(defaultData);
  }

  public async update<T, Q>(
    id: string,
    inputDTO: Q,
    defaultData: T,
    baseURL: string,
  ): Promise<T> {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .put(`/${id}`, inputDTO, config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.id = response.data._id;
    return response ? response.data : this.getCaughtErrorData(defaultData);
  }

  public async delete(id: string, baseURL: string): Promise<DeleteResponseDTO> {
    const defaultResponse: DeleteResponseDTO = {
      name: '',
      acknowledged: false,
      deletedCount: 0,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .delete(`/${id}`, config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.name = 'Response';
    return response ? response.data : this.getCaughtErrorData(defaultResponse);
  }

  public async getById<T>(
    id: string,
    defaultData: T,
    baseURL: string,
  ): Promise<T> {
    const response = await axios
      .create({
        baseURL,
      })
      .get(`/${id}`)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response && response.data._id) response.data.id = response.data._id;
    return response ? response.data : this.getCaughtErrorData(defaultData);
  }

  public async getAll<T>(
    defaultData: T,
    baseURL: string,
    limit: number,
    offset: number,
  ): Promise<T[]> {
    const config = {
      params: {
        limit,
        offset,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .get('', config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response)
      response.data.items.forEach(element => (element.id = element._id));
    return response
      ? response.data.items
      : this.getCaughtErrorArray([defaultData]);
  }

  private getCaughtErrorArray<T>(defaultData: T): T {
    if (Array.isArray(defaultData))
      defaultData.map(element => this.getCaughtErrorData(element));
    return defaultData;
  }

  public getCaughtErrorData<T>(defaultData: T): T {
    Object.keys(defaultData).forEach(key => {
      if (typeof defaultData[key] === 'string')
        defaultData[key] = this.caughtErrorMessage;
    });
    return defaultData;
  }

  public setCaughtErrorMessage(name: string, message: string): void {
    this.caughtErrorMessage = `Response name: ${name}, message: ${message}`;
  }

  public async getBandByIdForFavourites(id: string): Promise<Band> {
    return this.getBandById(id, this.BandsDefaultData, this.BandsBaseURL);
  }

  public async getBandById(
    id: string,
    defaultData: BandCreateUpdateDTO,
    baseURL: string,
  ): Promise<Band> {
    const initialBand: BandCreateUpdateDTO = await this.getById(
      id,
      defaultData,
      baseURL,
    );

    const band = await this.getBand(initialBand);

    return band;
  }

  public async getTrackById(
    id: string,
    defaultData: TrackCreateUpdateDTO,
    baseURL: string,
    circle: number,
  ): Promise<Track> {
    const initialTrack: TrackCreateUpdateDTO = await this.getById(
      id,
      defaultData,
      baseURL,
    );

    const track = await this.getTrack(initialTrack, circle);

    return track;
  }

  public async getAlbumById(
    id: string,
    defaultData: AlbumCreateUpdateDTO,
    baseURL: string,
    circle: number,
  ): Promise<Album> {
    const initialAlbum: AlbumCreateUpdateDTO = await this.getById(
      id,
      defaultData,
      baseURL,
    );

    const album = await this.getAlbum(initialAlbum, circle);

    return album;
  }

  public async getAlbum(
    initialAlbum: AlbumCreateUpdateDTO,
    circle: number,
  ): Promise<Album> {
    circle--;
    const album = {
      id: '22',
      name: '',
      released: 0,
      artists: [],
      bands: [],
      genres: [],
      image: '',
    };

    if (initialAlbum.id) album.id = initialAlbum.id;
    if (initialAlbum.name) album.name = initialAlbum.name;
    if (initialAlbum.released) album.released = initialAlbum.released;
    else album.released = null;
    album.artists = await Promise.all(
      initialAlbum.artistsIds.map(id =>
        this.getArtistById(id, this.artistsDefaultData, this.artistsBaseURL),
      ),
    );
    album.bands = await Promise.all(
      initialAlbum.bandsIds.map(id =>
        this.getBandById(id, this.BandsDefaultData, this.BandsBaseURL),
      ),
    );
    //--------------------------------
    album.genres = await Promise.all(
      initialAlbum.genresIds.map(id => this.getGenre(id)),
    );
    if (initialAlbum.image) album.image = initialAlbum.image;
    else album.image = null;
    return album;
  }

  public async getTrack(
    initialTrack: TrackCreateUpdateDTO,
    circle: number,
  ): Promise<Track> {
    circle--;
    const track = {
      id: '',
      title: '',
      album: null,
      artists: [],
      bands: [],
      duration: 0,
      released: 0,
      genres: [],
    };

    if (initialTrack.id) track.id = initialTrack.id;
    if (initialTrack.title) track.title = initialTrack.title;
    //---------------------------------------
    track.artists = await Promise.all(
      initialTrack.artistsIds.map(id =>
        this.getArtistById(id, this.artistsDefaultData, this.artistsBaseURL),
      ),
    );
    track.bands = await Promise.all(
      initialTrack.bandsIds.map(id =>
        this.getBandById(id, this.BandsDefaultData, this.BandsBaseURL),
      ),
    );
    if (initialTrack.duration) track.duration = initialTrack.duration;
    if (initialTrack.released) track.released = initialTrack.released;
    track.genres = await Promise.all(
      initialTrack.genresIds.map(id => this.getGenre(id)),
    );
    return track;
  }

  public async getArtistById(
    id: string,
    defaultData: ArtistCreateUpdateDTO,
    baseURL: string,
  ): Promise<Artist> {
    const initialArtist: ArtistCreateUpdateDTO = await this.getById(
      id,
      defaultData,
      baseURL,
    );

    const artist = await this.getArtist(initialArtist);

    return artist;
  }

  public async getArtist(
    initialArtist: ArtistCreateUpdateDTO,
  ): Promise<Artist> {
    const artist = {
      id: '',
      firstName: '',
      secondName: '',
      middleName: '',
      birthDate: '',
      birthPlace: '',
      country: '',
      bands: [],
      instruments: [],
    };

    if (initialArtist.id) artist.id = initialArtist.id;
    if (initialArtist.firstName) artist.firstName = initialArtist.firstName;
    if (initialArtist.secondName) artist.secondName = initialArtist.secondName;
    if (initialArtist.middleName) artist.middleName = initialArtist.middleName;
    else artist.middleName = null;
    if (initialArtist.birthDate) artist.birthDate = initialArtist.birthDate;
    else artist.birthDate = null;
    if (initialArtist.birthPlace) artist.birthPlace = initialArtist.birthPlace;
    else artist.birthPlace = null;
    if (initialArtist.country) artist.country = initialArtist.country;
    if (initialArtist.bandsIds) {
      artist.bands = await Promise.all(
        initialArtist.bandsIds.map(id =>
          this.getBandById(id, this.BandsDefaultData, this.BandsBaseURL),
        ),
      );
    }
    if (initialArtist.instruments)
      artist.instruments = initialArtist.instruments;
    else artist.instruments = null;
    return artist;
  }

  public async getBand(initialBand: BandCreateUpdateDTO): Promise<Band> {
    const band = {
      id: '',
      name: '',
      origin: '',
      members: [],
      website: '',
      genres: [],
    };

    if (initialBand.id) band.id = initialBand.id;
    if (initialBand.name) band.name = initialBand.name;
    if (initialBand.origin) band.origin = initialBand.origin;
    else band.origin = null;
    if (initialBand.members) band.members = initialBand.members;
    if (initialBand.website) band.website = initialBand.website;
    else band.website = null;
    if (initialBand.genresIds) {
      band.genres = await Promise.all(
        initialBand.genresIds.map(id => this.getGenre(id)),
      );
    }
    return band;
  }

  public async getGenre(id: string): Promise<Genre> {
    const genre: Genre = await this.getById(
      id,
      this.genreDefaultData,
      this.genreBaseURL,
    );
    return genre;
  }
}
