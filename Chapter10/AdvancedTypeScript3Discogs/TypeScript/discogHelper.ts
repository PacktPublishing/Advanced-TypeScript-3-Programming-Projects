const searchDiscog = (request: RequestInfo, imgId: string): Promise<void> => {
  return new Promise((): void => {
    fetch(request,
      {
        method: 'GET',
        headers: {
          'authorization': 'Discogs token=MyJEHLsbTIydAXFpGafrrphJhxJWwVhWExCynAQh',
          'user-agent': 'AdvancedTypeScript3Chapter10'
        }
      })
      .then(response => {
        return response.json();
      })
      .then(responseBody => {
        // We have an image... Let's use it.
        const image = <HTMLImageElement>document.getElementById(imgId);
        if (image) {
          if (responseBody && responseBody.images && responseBody.images.length > 0) {
            image.src = responseBody.images["0"].uri150;
          }
        }
      }).catch(x => {
        console.log(x);
      });
  });
}