using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AdvancedTypeScript3Discogs.Models.Discogs
{
  public class SearchResult
  {
    [JsonProperty(PropertyName = "id")]
    public int Id { get; set; }
    [JsonProperty(PropertyName = "genre")]
    public string[] Genre { get; set; }
    [JsonProperty(PropertyName = "style")]
    public string[] Style { get; set; }
    [JsonProperty(PropertyName = "label")]
    public string[] Label { get; set; }
    [JsonProperty(PropertyName = "format")]
    public string[] Format { get; set; }
    [JsonProperty(PropertyName = "barcode")]
    public string[] BarCode { get; set; }
    [JsonProperty(PropertyName = "year")]
    public int? Year { get; set; }
    [JsonProperty(PropertyName = "title")]
    public string Title { get; set; }
    [JsonProperty(PropertyName = "thumb")]
    public string Thumb { get; set; }
    [JsonProperty(PropertyName = "country")]
    public string Country { get; set; }
    [JsonProperty(PropertyName = "community")]
    public CommunityInfo Community { get; set; }
    [JsonProperty(PropertyName = "catno")]
    public string CatalogNumber { get; set; }
    [JsonProperty(PropertyName = "resource_url")]
    public string ResourceUrl { get; set; }
    [JsonProperty(PropertyName = "uri")]
    public string Uri { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    [JsonProperty(PropertyName = "type")]
    public EntityType Type { get; set; }
  }
}