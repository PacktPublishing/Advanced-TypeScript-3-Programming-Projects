using Newtonsoft.Json;

namespace AdvancedTypeScript3Discogs.Models.Discogs
{
  public class CommunityInfo
  {
    [JsonProperty(PropertyName = "want")]
    public int Want { get; set; }
    [JsonProperty(PropertyName = "have")]
    public int Have { get; set; }
  }
}