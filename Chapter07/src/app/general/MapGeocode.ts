export class MapGeocode {
  private searchManager: Microsoft.Maps.Search.SearchManager;
  constructor(private map: Microsoft.Maps.Map) {
    Microsoft.Maps.loadModule('Microsoft.Maps.Search', () => {
      this.searchManager = new Microsoft.Maps.Search.SearchManager(this.map);
    });
  }
  public ReverseGeocode(location: Microsoft.Maps.Location): Promise<string> {
    return new Promise<string>((callback) => {
      const request = {
        location: location,
        callback: function (code) { callback(code.name); }
      };
      if (this.searchManager) {
        this.searchManager.reverseGeocode(request);
      }
    });
  }
}
