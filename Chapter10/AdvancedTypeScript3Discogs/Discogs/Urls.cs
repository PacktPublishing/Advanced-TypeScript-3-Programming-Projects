using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AdvancedTypeScript3Discogs.Discogs
{
  public class Results
  {
    public OuterResults pagination { get; set; }
    public SearchResult[] results { get; set; }
  }
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

  public class OuterResults
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
  public class CommunityInfo
  {
    [JsonProperty(PropertyName = "want")]
    public int Want { get; set; }
    [JsonProperty(PropertyName = "have")]
    public int Have { get; set; }
  }
  public enum EntityType
  {
    release,
    master,
    artist,
    label
  }
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
    public CommunityInfo community { get; set; }
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
