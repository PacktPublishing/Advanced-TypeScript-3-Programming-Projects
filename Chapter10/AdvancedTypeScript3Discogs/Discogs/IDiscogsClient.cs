using System.Threading.Tasks;

namespace AdvancedTypeScript3Discogs.Discogs
{
  public interface IDiscogsClient
  {
    Task<Results> GetByArtist(string artist);
  }
}