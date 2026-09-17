This is the Mother of God Church, Pomburpa website.

## Development

Install dependencies with Bun and start the Vite development server:

```sh
bun install
bun run dev
```

Create a production build with `bun run build`.

The site is built with React, Vite, and Tailwind CSS.

## Maintenance guide

- `src/main.jsx` contains the routes, shared layout components, page content, and editable church data.
- `src/index.css` contains the global Tailwind entry layers and small global rules.
- `public/pictures/` contains images referenced by the pages with `/pictures/...` URLs.
- `tailwind.config.js`, `postcss.config.js`, and `vite.config.js` configure the styling and build pipeline.
- `index.html` provides the document metadata, font loading, and React mount point.

The app uses browser history for its small client-side router. Add a route to `navItems` and the route map in `App` when creating a new page.

## History

V 1.0.7
updated it to have a Booking webpage.

currently contains
-home page <br>
-booking page <br>
-commitee page <br>
-Gallery page <br>
-Chapels page <br>
-contact us section<br>
- is mobile friendly<br>
 
 V 1.8.0

 -Improved and NEW UI <br>
 -all placeholders have been replaced<br>
 -almost all commitees have been added <br>
 - embedded insta reels <br>
 -colapsible header with hamburger menu for mobile added <br> 

last updated on 22/10/25 .


V.1.9.0

- added scale animation for elements <br>
-common code has been seperated and UI is made consistent <br>
- files renamed for better structure <br>
