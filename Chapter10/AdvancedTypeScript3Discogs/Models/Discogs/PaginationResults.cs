using Newtonsoft.Json;

namespace AdvancedTypeScript3Discogs.Models.Discogs
{
  public class PaginationResults
  {
    [JsonProperty(PropertyName = "per_page")]
    public int PerPage { get; set; }
    [JsonProperty(PropertyName = "pages")]
    public int Pages { get; set; }
    [JsonProperty(PropertyName = "page")]
    public int Page { get; set; }
    [JsonProperty(PropertyName = "items")]
    public int Items { get; set; }
    [JsonProperty(PropertyName = "urls")]
    public Urls Urls { get; set; }
  }
}