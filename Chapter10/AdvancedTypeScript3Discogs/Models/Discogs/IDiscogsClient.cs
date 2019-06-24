using System.Threading.Tasks;

namespace AdvancedTypeScript3Discogs.Models.Discogs
{
  public interface IDiscogsClient
  {
    Task<Results> GetByArtist(string artist);
  }
}