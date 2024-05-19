class ArtistSum {
    constructor(name, id, num_songs, earliest_release, latest_release, top_popularity) {
        this.name = name;
        this.id = id;
        this.num_songs = num_songs;
        this.earliest_release = earliest_release;
        this.latest_release = latest_release;
        this.top_popularity = top_popularity;
    }

    toJSON() {
        return {
            name: this.name,
            id: this.id,
            num_songs: this.num_songs,
            earliest_release: this.earliest_release,
            latest_release: this.latest_release,
            top_popularity: this.top_popularity
        };
    }
}

//exports the mongoose model for artist summary which is a wrapper of the mongoose schema that enables you to create update etc,in the database.
export default ArtistSum;