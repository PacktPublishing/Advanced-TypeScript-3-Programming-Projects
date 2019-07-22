enum Genre {
    Rock,
    CountryAndWestern,
    Classical,
    Pop,
    HeavyMetal
}

class MusicCollection {
    private readonly collection : Map<Genre, string[]>;
    constructor() {
        this.collection = new Map<Genre, string[]>();
    }

    public Add(genre : Genre, artist : string[]) : void {
        this.collection.set(genre, artist);
    }

    public Get(genre : Genre) : string[] | undefined {
        return this.collection.get(genre);
    }
}

let collection = new MusicCollection();
collection.Add(Genre.Classical, [`Debussy`, `Bach`, `Elgar`, `Beethoven`]);
collection.Add(Genre.CountryAndWestern, [`Dolly Parton`, `Toby Keith`, `Willie Nelson`]);
collection.Add(Genre.HeavyMetal, [`Tygers of Pan Tang`, `Saxon`, `Doro`]);
collection.Add(Genre.Pop, [`Michael Jackson`, `Abba`, `The Spice Girls`]);
collection.Add(Genre.Rock, [`Deep Purple`, `Led Zeppelin`, `The Dixie Dregs`]);

console.log(collection.Get(Genre.HeavyMetal));
