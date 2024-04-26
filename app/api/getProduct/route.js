import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import webshops from "./webshops";

export async function POST(req) {
    const body = await req.json();
    if (!body.link) {
        return NextResponse.json({
            title: body.title,
            price: body.price,
            image: null,
            link: body.link
        });
    }
    const url = new URL(body.link);
    const domainname = url.hostname.replace(/(www\.)?/, '').split('.')[0];

    if (webshops.some(shop => shop.hostname === domainname)) {
        const webshopdata = webshops.find((webshop) => {
            return webshop.hostname == domainname;
        });
        try {
            const webpage = await axios.get(url);
            const $ = cheerio.load(webpage.data);
            let image = $(webshopdata.imageQuery).first().attr('src');
            if (webshopdata.sourceImage) image = $(webshopdata.imageQuery).first().attr('srcset');
            const title = !body.title ? $(webshopdata.titleQuery).first().text().trim() : body.title;
            let price = !body.price ? $(webshopdata.priceQuery).first().text().trim() : body.price;
            if (webshopdata.composedPrice && price != body.price) {
                price = price + $(webshopdata.priceQuery2).first().text();
            }
            if (webshopdata.replacePriceText && price != body.price) {
                price = price.replace(/[^0-9,]/g, '').trim();
            }
            if (webshopdata.affiliateID) {
                url.hash = "";
                url.search = `?tag=${webshopdata.affiliateID}`;
            }
            return NextResponse.json({
                title,
                image,
                price,
                link: url.href
            });
        } catch {
            if (webshopdata.affiliateID) {
                url.hash = "";
                url.search = `?tag=${webshopdata.affiliateID}`;
            }
            return NextResponse.json({
                title: body.title,
                price: body.price,
                image: null,
                link: url.href
            });
        }
    }

    return NextResponse.json({
        title: body.title,
        price: body.price,
        image: null,
        link: body.link
    });
}