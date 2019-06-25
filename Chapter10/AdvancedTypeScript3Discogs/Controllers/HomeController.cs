using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AdvancedTypeScript3Discogs.Models;
using System.Threading.Tasks;
using AdvancedTypeScript3Discogs.Models.Discogs;

namespace AdvancedTypeScript3Discogs.Controllers
{
  public class HomeController : Controller
  {
    private readonly IDiscogsClient _discogsClient;
    public HomeController(IDiscogsClient discogsClient)
    {
      _discogsClient = discogsClient;
    }

    public async Task<IActionResult> Index(string searchString)
    {
      if (!string.IsNullOrWhiteSpace(searchString))
      {
        Results client = await _discogsClient.GetByArtist(searchString);
        ViewBag.Result = client.ResultsList;
      }

      return View();
    }

    public IActionResult About()
    {
      ViewData["Message"] = "Building a Music Library with ASP .NET Core, Visual Studio and TypeScript.";
      return View();
    }

    public IActionResult Contact()
    {
      ViewData["Message"] = "There are a number of different ways you can reach us if you want to get in touch.";

      return View();
    }

    public IActionResult Privacy()
    {
      return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
