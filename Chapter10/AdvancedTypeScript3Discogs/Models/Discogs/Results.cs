using Newtonsoft.Json;

namespace AdvancedTypeScript3Discogs.Models.Discogs
{
  public class Results
  {
    [JsonProperty(PropertyName="pagination")]
    public PaginationResults Pagination { get; set; }
    [JsonProperty(PropertyName = "results")]
    public SearchResult[] ResultsList { get; set; }
  }
}