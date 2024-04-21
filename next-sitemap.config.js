/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://mywishlists.fabian-kleine.dev',
    generateRobotsTxt: true,
    exclude: ["/my/settings", "/list/create/addwish"],
    additionalPaths: () => [
        { 
            loc: "/my/signin",
            changefreq: 'yearly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        }, 
        { 
            loc: "/",
            changefreq: 'yearly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        }
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: ["/my/settings", "/list/create/addwish", "/list/create", "/my/lists"]
            }
        ]
    }
}