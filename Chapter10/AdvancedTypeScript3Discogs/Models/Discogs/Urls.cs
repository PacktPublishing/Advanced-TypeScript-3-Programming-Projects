using Newtonsoft.Json;

namespace AdvancedTypeScript3Discogs.Models.Discogs
{
  public class Urls
  {
    [JsonProperty(PropertyName ="first")]
    public string First { get; set; }
    [JsonProperty(PropertyName = "last")]
    public string Last { get; set; }
    [JsonProperty(PropertyName = "prev")]
    public string Prev { get; set; }
    [JsonProperty(PropertyName = "next")]
    public string Next { get; set; }
  }
}
