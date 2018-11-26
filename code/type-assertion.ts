interface ElectricGuitar {
    numberOfPickups : number;
}

interface Violin {
}

function isElectricGuitar(v : Violin | ElectricGuitar) : v is ElectricGuitar {
    return (<ElectricGuitar>v).numberOfPickups !== undefined;
}

class Electric implements ElectricGuitar {
    numberOfPickups: number;
    constructor(numberOfPickups : number) {
        this.numberOfPickups = numberOfPickups;
    }
}

class MusicStore {
    BuyInstrument(instrument : ElectricGuitar | Violin) {
        if (isElectricGuitar(instrument)) {
            // Note that the backtick allows us to use the string formatting below...
            console.log(`Playing guitar with ${instrument.numberOfPickups} pickups`);
        } else {
            console.log(`This is a pretty cool violin`);
        }
    }
}

new MusicStore().BuyInstrument(new Electric(3));