const webshops = [
    {
        hostname: "amazon",
        imageQuery: "#landingImage",
        titleQuery: "#productTitle",
        composedPrice: true,
        priceQuery: ".a-price-whole",
        priceQuery2: ".a-price-fraction"
    },
    {
        hostname: "ebay",
        imageQuery: ".ux-image-magnify__image--original",
        titleQuery: ".x-item-title__mainTitle",
        replacePriceText: true,
        priceQuery: ".x-price-primary",
    }, 
    {
        hostname: "kleinanzeigen",
        imageQuery: "#viewad-image",
        titleQuery: "#viewad-title",
        replacePriceText: true,
        priceQuery: "#viewad-price",
    },
    {
        hostname: "lego",
        imageQuery: '[data-test="mediagallery-image-0"] source',
        sourceImage: true,
        titleQuery: '[data-test="product-overview-name"] .Markup__StyledMarkup-nc8x20-0.epIXnJ',
        replacePriceText: true,
        priceQuery: '[data-test="product-price"]'
    },
    {
        hostname: "zalando",
        imageQuery: ".sDq_FX.lystZ1.FxZV-M._2Pvyxl.JT3_zV.EKabf7.mo6ZnF._1RurXL.mo6ZnF._7ZONEy",
        titleQuery: ".EKabf7.R_QwOV",
        replacePriceText: true,
        priceQuery: ".sDq_FX._4sa1cA.FxZV-M.HlZ_Tf"
    },
    {
        hostname: "aboutyou",
        imageQuery: '[data-testid="productImageView"]',
        titleQuery: '[data-testid="productName"]',
        replacePriceText: true,
        priceQuery: '[data-testid="finalPrice"]'
    }
]

export default webshops;