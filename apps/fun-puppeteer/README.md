# Fun-puppeteer

## Overview

`Fun-puppeteer` is a project that leverages the power of NestJS and Puppeteer to perform web scraping tasks. Currently, the project supports searching for given words on Bing.com and returning a screenshot of the search results in base64 format. This functionality is achieved using a Puppeteer wrapper retrieved from a custom NestJS library.

## Features

- **Search Bing.com**: Given a set of search terms, `Fun-puppeteer` will search Bing.com and capture a screenshot of the results.
- **Screenshot in Base64**: The captured screenshot is returned in base64 format, making it easy to handle and display in various contexts.
