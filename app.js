// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : Home
    , '/about'      : About
    , '/p/:id'      : PostShow
    , '/register'   : Register
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const content = null || document.getElementById('page_container');

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

parseRequestURL : () => {

    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    let request = {
        resource    : null,
        id          : null,
        verb        : null
    }
    request.resource    = r[1]
    request.id          = r[2]
    request.verb        = r[3]

    return request
}


let About = {
    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> About </h1>
                <button id="myBtn"> Button</button>
            </section>
        `
        return view
    },
    after_render: async () => {
        document.getElementById("myBtn").addEventListener ("click",  () => {
            console.log('Yo')
            alert('Yo')
        })
    }

}

export default About;
content.innerHTML = await page.render();
await page.after_render();