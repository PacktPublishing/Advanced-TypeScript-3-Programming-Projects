using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AdvancedTypeScript3Discogs.Models.Discogs
{
  public class DiscogsClient : IDiscogsClient
  {
    private const string BasePath = "https://api.discogs.com/";
    private readonly IHttpClientFactory _httpClientFactory;
    public DiscogsClient(IHttpClientFactory httpClientFactory)
    {
      _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
    }

    public async Task<Results> GetByArtist(string artist)
    {
      if (string.IsNullOrWhiteSpace(artist))
      {
        return new Results();
      }
      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, 
        GetMethod($"database/search?artist={Uri.EscapeDataString(artist)}&per_page=10"));
      request.Headers.Add("Authorization", "Discogs token=MyJEHLsbTIydAXFpGafrrphJhxJWwVhWExCynAQh");
      request.Headers.Add("user-agent", "AdvancedTypeScript3Chapter10");
      using (HttpClient client = _httpClientFactory.CreateClient())
      {
        HttpResponseMessage response = await client.SendAsync(request);
        string content = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<Results>(content);
      }
    }

    private string GetMethod(string path) => $"{BasePath}{path}";
  }
}