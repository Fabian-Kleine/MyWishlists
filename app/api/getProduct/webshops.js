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
    }
]

export default webshops;