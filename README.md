# Statement Downloader

Investorline's statement download page UX is comically awful. This repo generates a list of the download links and then they can be downloaded directly.

## Generate necessary links
1. Update `search.rb` and/or `gen.rb` and run directly
2. Outputs to `about.yml`

## Generate html
1. `grunt prepare_site`

## Download
1. Authenticate with Investorline, then open `_output/index.html`
2. Download all the links
