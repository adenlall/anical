import { load } from 'cheerio';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q');
    if (!q) {
        return Response.json({ error: 'Query parameter is required' }, {
            status: 500
        });
    }
    const url = `https://www.google.com/search?q=${encodeURIComponent(q + " studio logo")}&tbm=isch&tbs=iar:s&sca_esv=9801acaddd243ef2&gbv=1&sei=bkoIZ_HiJ5-Li-gPusGmMA`;
    try {
        const response = await fetch(url, {
            cache: 'force-cache'
        });
        const html = await response.text();
        const $ = load(html);
        const firstImageUrl = $('.GpQGbf > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > div:nth-child(1) > img:nth-child(1)').attr('src');
        if (firstImageUrl) {
            return Response.json({ url: firstImageUrl });
        } else {
            return Response.json({ error: 'No image found', url }, {
                status: 500
            });
        }

    } catch (error) {
        return Response.json({ error: 'An error occurred while searching for images', details: error, url }, {
            status: 500
        });
    }
}