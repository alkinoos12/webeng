import artistSum from '../models/artistSum.js';
import artist from '../models/artist.js';
import song from '../models/song.js';

//function that retrieves the artists summary(name,id,num song,earliest release,latest release and top popularity) by the artist id.
export const getartistSum = async (req, res) => {
    try {
        const ID = req.params.id;
        var Summury;
        const Artist = await artist.find({ id: ID })
        const appArtistId = "'" + ID + "'";
        const reg = new RegExp(appArtistId)
        const Songs = await song.find({ id_artists: { $regex: reg } }).limit(700);
        const Num = Songs.length;

        if (Num != 0) {
            var earliest_release_date = new Date(Songs[0].release_date.split("/").reverse().join("-"));
            var latest_release_date = new Date(Songs[0].release_date.split("/").reverse().join("-"));
            var earliest_release = Songs[0];
            var latest_release = Songs[0];
            var topP = Songs[0].popularity;
            var date;
            for (let s of Songs) {
                if (s.release_date.length < 6) {
                    s.release_date = "30/12/" + s.release_date;
                }

                if (s.popularity > topP) {
                    topP = s.popularity;
                }

                date = new Date(s.release_date.split("/").reverse().join("-"));
                if (date < earliest_release_date) {
                    earliest_release = s;
                    earliest_release_date = date;
                }
                if (date > latest_release_date) {
                    latest_release = s;
                    latest_release_date = date;
                }
            }
            Summury = new artistSum(Artist[0].name, Artist[0].id, Num, earliest_release.name, latest_release.name, topP);
        }
        else {
            Summury = new artistSum(Artist[0].name, Artist[0].id, Num, null, null, null);
        }
        res.status(200).json(Summury);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}