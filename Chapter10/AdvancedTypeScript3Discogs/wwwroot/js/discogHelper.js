var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchDiscog = (request, imgId) => __awaiter(this, void 0, void 0, function* () {
    return new Promise(r => {
        fetch(request, {
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
            const image = document.getElementById(imgId);
            if (image) {
                if (responseBody && responseBody.images && responseBody.images.length > 0) {
                    image.src = responseBody.images["0"].uri150;
                }
            }
        }).catch(x => {
            console.log(x);
        });
    });
});
//# sourceMappingURL=discogHelper.js.map