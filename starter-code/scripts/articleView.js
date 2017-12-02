'use strict';

const articleView = {};


articleView.populateFilters = () => {
    $('article').each(function () {
        let val = $(this).find('address a').text();
        let optionTag = `<option value="${val}">${val}</option>`;

        if ($(`#author-filter option[value="${val}"]`).length === 0) {
            $('#author-filter').append(optionTag);
        }

        val = $(this).attr('data-category');
        optionTag = `<option value="${val}">${val}</option>`;
        if ($(`#category-filter option[value="${val}"]`).length === 0) {
            $('#category-filter').append(optionTag);
        }
    });
};

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', function () {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-author="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', function () {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-category="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#author-filter').val('');
    });
};

articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function () {
        $('.tab-content').hide();
        $(`#${$(this).attr('data-content')}`).fadeIn();
    });

    $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function (e) {
        e.preventDefault();
        if ($(this).text() === 'Read on →') {
            $(this).parent().find('*').fadeIn();
            $(this).html('Show Less &larr;');
        } else {
            $('body').animate({
                scrollTop: ($(this).parent().offset().top)
            }, 200);
            $(this).html('Read on &rarr;');
            $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
        }
    });
};

// COMMENT: Where is this function called? Why?
// This function is called at the bottom of the index.html page, within a script tag before the end of the <body>. It references the nested functions and runs them only on the index page.

articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};

// COMMENT: Where is this function called? Why?
// The below function is called in the new.html and, when it functions correctly, will initialize a new page for each new article.

articleView.initNewArticlePage = () => {
    // TODO: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
    $('.tab-content').show();
    $('#articles').empty();
    // STRETCH: Hide the export section for now, and show it once we have data to export.
    $('#export-field').hide();
    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    $('#article-json').on('focus', function () {
        this.select();
    });

    // TODO: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.
    $('#new-article :input').on('change', function() {
        articleView.create();
    });
};

articleView.create = () => {
    // DONE: Clear out the #articles element, so we can put in the updated preview
    let article;
    $('#articles').empty();
    // DONE: Set up a variable to hold the new article we are creating.
    article = new Article ({
        title: $('#new-title').val(),
        category: $('#new-category').val(),
        author: $('#new-author').val(),
        authorUrl: $('#new-website').val(),
        body: $('#new-body').val(),
        publishedOn: $('#new-is-published:checked').length ? new Date() : null
    });

    // DONE: Instantiate an article based on what's in the form fields:
    $('#articles').append(article.toHtml());

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
};

// DONE: Use our interface to the Handlebars template to put this new article into the DOM:
//Article.prototype.toHtml = function () {
//    const articleView = Handlebars.compile($('#new-article-template').html());
//
//    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
//    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
//
//    return articleView(this);
//};