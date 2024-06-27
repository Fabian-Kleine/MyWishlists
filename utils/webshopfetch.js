import axios from "axios";
import cheerio from "cheerio";
import webshops from "./webshops";

export default async function WebshopFetch(body) {
    let productData = {
        title: body.title,
        description: body.description || "",
        price: body.price,
        image: null,
        link: body.link
    }

    if (!body.link) return productData;

    try {
        const url = new URL(body.link);
        const domainname = url.hostname.replace(/(www\.)?/, '').split('.')[0];

        const webpage = await axios.get(url);
        const $ = cheerio.load(webpage.data);

        const metadata = {
            title: $('meta[property="og:title"]').attr('content') || $('title').text() || '',
            description: $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || 'No description found',
            image: $('meta[property="og:image"]').attr('content') || null,
        };

        productData = {...productData, ...metadata};

        if (webshops.some(shop => shop.hostname === domainname)) {
            const webshopdata = webshops.find((webshop) => {
                return webshop.hostname == domainname;
            });

            let price = !body.price ? $(webshopdata.priceQuery).first().text().trim() : body.price;
            if (webshopdata.composedPrice && price != body.price) {
                price = price + $(webshopdata.priceQuery2).first().text();
            }
            if (webshopdata.replacePriceText && price != body.price) {
                price = price.replace(/[^0-9,]/g, '').trim();
            }

            productData.price = price;

            if(webshopdata.imageQuery) {
                const image = $(webshopdata.imageQuery).first().attr('src');
                productData.image = image;
            }
    
            if (webshopdata.affiliateID) {
                url.hash = "";
                url.search = `?tag=${webshopdata.affiliateID}`;
                productData.link = url.href;
            }
        }
    } catch (error) {
        console.log(error)
    } finally {
        return productData;
    }
}