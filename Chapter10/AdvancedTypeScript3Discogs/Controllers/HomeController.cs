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
        var client = await _discogsClient.GetByArtist(searchString);
        ViewBag.Result = client.results;
      }

      return View();
    }

    [HttpPost]
    public IActionResult GetMessage()
    {
      var data = new { Title = "Wotcher" };
      return Json(data);
    }

    public IActionResult About()
    {
      ViewData["Message"] = "Your application description page.";
      return View();
    }

    public IActionResult Contact()
    {
      ViewData["Message"] = "Your contact page.";

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
