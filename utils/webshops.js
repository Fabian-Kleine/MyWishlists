const webshops = [
    {
        hostname: "amazon",
        imageQuery: "#landingImage",
        composedPrice: true,
        priceQuery: ".a-price-whole",
        priceQuery2: ".a-price-fraction",
        affiliateID: "mywishlists00-21"
    },
    {
        hostname: "ebay",
        replacePriceText: true,
        priceQuery: ".x-price-primary",
    }, 
    {
        hostname: "kleinanzeigen",
        replacePriceText: true,
        priceQuery: "#viewad-price",
    },
    {
        hostname: "lego",
        replacePriceText: true,
        priceQuery: '[data-test="product-price"]'
    },
    {
        hostname: "zalando",
        replacePriceText: true,
        priceQuery: ".sDq_FX._4sa1cA"
    },
    {
        hostname: "aboutyou",
        replacePriceText: true,
        priceQuery: '[data-testid="finalPrice"]'
    }
]

export default webshops;