Lab 05: Form Building Workshop
===


## Content
1. Submission Instructions
1. Resources
1. Configuration
1. User Stories and Feature Tasks

----

## Submission Instructions
Follow the submission instructions outlined in our [submit-process repo](https://github.com/acl-301d-fall-2017/submit-process).


## Resources  
[HighlightJS Docs](https://highlightjs.org/)

[MarkedJS Docs](https://github.com/chjj/marked)

## Configuration
_Your repository must include:_

```
05-form-building
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── index.html
├── new.html
├── scripts
│   ├── article.js
│   ├── articleView.js
│   └── blogArticles.js
├── styles
│   ├── base.css
│   ├── fonts
│   │   ├── icomoon.eot
│   │   ├── icomoon.svg
│   │   ├── icomoon.ttf
│   │   └── icomoon.woff
│   ├── icons.css
│   ├── layout.css
│   └── modules.css
└── vendor
    └── styles
        ├── default.css
        ├── normalize.css
        └── railscasts.css
```


## User Stories and Feature Tasks

*As a user, I want to be able to add new articles to my blog app so that it can stay current over time.*

- Review the image `preview.png` in the lab directory to get an idea of what we will be building.
- Focus on the functionality of adding a new article through a form submission by completing the TODOs in articleView.js.

*As a developer, I want to make the user experience easy to understand so that the user will want to return to the blog.*

- We now have two pages in our blog app, each of which need different initialization. There is a skeleton of a method in articleView.js to get this started for the new page; be sure to examine how this is now being done for the index page.
- The new page with the form will need event handling and a template. Where should these pieces go in the code?
- The new page should not display any other articles; how to manage this?

### Stretch Goals
*As a user, be able to copy my new article as JSON so I can add it to my data file.*
- The new page with the form should provide a JSON string which can be copy/pasted into the data file to add articles to the blog.

*As a user, I want to preview my new article in a separate tab instead of below it.*

- Implement similar tab logic from our index page into the new page, so that users can tab between the form (Write) and the preview (Preview).

*As a user, I want to add highlighting and Markdown formatting so that it is attractive to guests visiting my app.*

- We have two new libraries that we can add: HighlightJS (provides syntax highlighting of code blocks) and MarkedJS (allows use of Markdown format text). Link to (or include) these two libraries and implement them.