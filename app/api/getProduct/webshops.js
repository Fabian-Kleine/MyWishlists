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
    }
]

export default webshops;