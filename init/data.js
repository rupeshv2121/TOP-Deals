//This file is made for the purpose of storing Items.

const sampleItems = [
    {
        title: "Umbrella",
        description: "Avoid Rain",
        price: 199,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=8NJ5rmvk&id=CC3A3980E44529DA305096984ADD53BA753D2BC2&thid=OIP.8NJ5rmvklDJQdyJJzgpmOgHaHa&mediaurl=https%3a%2f%2fassets.hermes.com%2fis%2fimage%2fhermesproduct%2fpluie-de-h-long-umbrella--310360M+03-front-wm-1-0-0-1000-1000_g.jpg&exph=1000&expw=1000&q=umbrella&simid=608030747133827847&FORM=IRPRST&ck=EF8BA663A8E3CFAD8B98CDD1A7CC59FA&selectedIndex=3&itb=0"
    },
    {
        title: "Backpack",
        description: "Spacious and durable",
        price: 799,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=pduP3eV%2f&id=B6BC6820C9AE6DD63A2DE18C2767A7FA29540474&thid=OIP.pduP3eV_C-llPoGY4YgA0gHaKA&mediaurl=https%3a%2f%2fi5.walmartimages.com%2fasr%2f826db682-45e6-435b-8fad-18c6f309dc8d_3.6b2064d37ebbe85cc8c52d6464fc63c9.jpeg&exph=3600&expw=2664&q=backpack&simid=608023136447457106&FORM=IRPRST&ck=231D06F175EC1FE0318F6C73EF3545EE&selectedIndex=1&itb=0"
    },
    {
        title: "Water Bottle",
        description: "Keeps water cool",
        price: 149,
        image: "download.jpeg"
    },
    {
        title: "Sunglasses",
        description: "UV protection",
        price: 299,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=NDz3Xtct&id=65C8EB3810F185F52B726A68B10FB84C0D0B11AD&thid=OIP.NDz3XtctBvCkoFTxwIvCBAHaEc&mediaurl=https%3a%2f%2fi5.walmartimages.com%2fasr%2f247ba239-efed-437d-89e4-ac7e6fa03b68_1.a222bcce99ecd7602d35a010f1ef110e.jpeg&exph=1350&expw=2250&q=sunglasses&simid=608037954043189050&FORM=IRPRST&ck=C1F4EEB8503D53D93D056C06E55FA348&selectedIndex=5&itb=0"
    },
    {
        title: "Notebook",
        description: "100 pages, ruled",
        price: 99,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=oqbgfpns&id=A19BF8090DECD663044A94758DB81C2BA8030B36&thid=OIP.oqbgfpnsAcW0JyTCXtYQnQHaHa&mediaurl=https%3a%2f%2fcontent.etilize.com%2fimages%2f900%2f1028976730.jpg&exph=900&expw=900&q=notebook&simid=608055666497322884&FORM=IRPRST&ck=87F6F3E6440ECB9F4F00C815AD7E3C4F&selectedIndex=2&itb=0"
    },
    {
        title: "Bluetooth Speaker",
        description: "Portable and powerful",
        price: 999,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=ME7w8biT&id=30AE4164555A624953941CA702633C3DF98FAD9E&thid=OIP.ME7w8biTCoGCGAD20L1S6wHaHX&mediaurl=https%3a%2f%2fstatic3.srcdn.com%2fwordpress%2fwp-content%2fuploads%2f2020%2f10%2f81g26BxrTAL.-AC-SL1500-.jpg&exph=1492&expw=1500&q=bluetooth+speakers&simid=608048571219723219&FORM=IRPRST&ck=498F070043B50F7BD8E570921D8E2712&selectedIndex=11&itb=0"
    },
    {
        title: "Phone Charger",
        description: "Fast charging",
        price: 249,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=3ty5zaY1&id=DD4575FFFEAC9D3B4EE3970F3EA57F967B0C8AE6&thid=OIP.3ty5zaY1OzPc54PGpZEGBgHaHW&mediaurl=https%3a%2f%2fi5.walmartimages.com%2fasr%2f0b29257f-f6f6-42e0-9163-9466518221e2.aaddc9b80df5fc1bfac6e6fc25e1fe74.jpeg&exph=1422&expw=1434&q=phone+charger&simid=608022328968091099&FORM=IRPRST&ck=631162CC5A02BD68C2360D4BF79BD4EA&selectedIndex=3&itb=0"
    },
    {
        title: "Running Shoes",
        description: "Comfortable and lightweight",
        price: 1299,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=SJYHjRdd&id=41CA48EB97BB3C8610C5A9160F7E3D31B4DCCA90&thid=OIP.SJYHjRddTxTKGBqqt-WVGAHaHa&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.4896078d175d4f14ca181aaab7e59518%3frik%3dkMrctDE9fg8WqQ%26riu%3dhttp%253a%252f%252fimage.sportsmansguide.com%252fadimgs%252fl%252f2%252f202909_ts.jpg%26ehk%3djQoIpPntndIlqUJwkZUCTvpBNbobTylLl%252bMU8Q2IEXQ%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=1154&expw=1154&q=running+shoes&simid=608025524426201673&FORM=IRPRST&ck=EF3F7A638BB179ABF3ABE418323960DA&selectedIndex=5&itb=0"
    },
    {
        title: "Headphones",
        description: "Noise-canceling",
        price: 499,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=f0MJ1o3%2f&id=0866E4DCA949B19CCB94F26EA06503995CD811B0&thid=OIP.f0MJ1o3_LL_Vs89xWfQTLgHaKX&mediaurl=https%3a%2f%2fpisces.bbystatic.com%2fimage2%2fBestBuy_US%2fimages%2fproducts%2f9518%2f9518128_sa.jpg&exph=1500&expw=1072&q=headphones&simid=607996069510392088&FORM=IRPRST&ck=4E9358699F2DD85A4D610336DD0C662B&selectedIndex=14&itb=0"
    },
    {
        title: "Travel Mug",
        description: "Keeps drinks hot or cold",
        price: 199,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=Da0Dzi4t&id=092965F472B6CC8A3C8923AE531F10DDD94583A9&thid=OIP.Da0Dzi4tT6rJvQlOwYfucQHaHb&mediaurl=https%3a%2f%2fimages-na.ssl-images-amazon.com%2fimages%2fI%2f715mbGGVSLL._SL1500_.jpg&exph=1500&expw=1496&q=travel+mug&simid=608028698418422768&FORM=IRPRST&ck=1E6E72C8831452FC4E610BDEF1054EE3&selectedIndex=12&itb=0"
    },
];


module.exports = initData = { data: sampleItems };