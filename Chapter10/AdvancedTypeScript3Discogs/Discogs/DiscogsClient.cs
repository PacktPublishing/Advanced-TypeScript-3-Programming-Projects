using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace AdvancedTypeScript3Discogs.Discogs
{
  public class DiscogsClient : IDiscogsClient
  {
    private IHttpClientFactory _httpClientFactory;
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
      var request = new HttpRequestMessage(HttpMethod.Get, GetMethod($"database/search?artist={Uri.EscapeDataString(artist)}&per_page=10"));
      request.Headers.Add("Authorization", "Discogs token=MyJEHLsbTIydAXFpGafrrphJhxJWwVhWExCynAQh");
      request.Headers.Add("user-agent", "AdvancedTypeScript3Chapter10");
      var client = _httpClientFactory.CreateClient();
      var response = await client.SendAsync(request);

      var content = await response.Content.ReadAsStringAsync();
      return JsonConvert.DeserializeObject<Results>(content);
    }

    private string GetMethod(string path) => $"https://api.discogs.com/{path}";
  }
}