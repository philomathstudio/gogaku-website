GOGAKU WEBSITE — gogakuapp.com
Philomath Tech LLC

Unzip this folder and keep the structure intact.
Everything at the top level goes in your repo root:

  index.html, about.html, privacy.html, terms.html
  styles.css
  CNAME          <- tells the host the domain is gogakuapp.com
  robots.txt, sitemap.xml
  assets/        <- logos and icons; MUST stay in a folder named "assets"

To preview locally:
  cd into this folder, then:  python3 -m http.server 8000
  Open http://localhost:8000

Two things still to do:
  1. about.html has an HTML comment marking where your personal
     paragraph goes ("Who built it" section).
  2. Have a lawyer review privacy.html and terms.html before public launch.
