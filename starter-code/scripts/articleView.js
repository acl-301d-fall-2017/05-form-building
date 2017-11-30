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

// [X]COMMENT: Where is this function called? Why?
// It is being called at the very bottom of the body of index.html inside a script tag. We want it to load after the dom is ready.
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};



// [x]COMMENT: Where is this function called? Why?
// it was called in newHtml at the end because we didnt want it to run on the index.
articleView.initNewArticlePage = () => {
    // [x]TODO: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.


    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.

    $('#article-json').on('focus', function () {
        this.select();
    });

    // []TODO: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.

};

articleView.create = () => {
    $('#new-article :input').on('change', function() {
    // [x]TODO: Set up a variable to hold the new article we are creating.
        let newArticle = new Article ({ // eslint-disable-line
            title: $('#new-title').val(),
            body: $('#new-body').val(),
            author: $('#new-author').val(),
            authorUrl: $('#new-website').val(),
            category: $('#new-category').val()
        });
        // Clear out the #articles element, so we can put in the updated preview
        $('#articles').empty();

        // [x]TODO: Use our interface to the Handlebars template to put this new article into the DOM:

        const filledTemp = newArticle.toHtml();
        $('#articles').append(filledTemp);

        // [x]TODO: Instantiate an article based on what's in the form fields:
        $('#new-article :input').each(function(){
            console.log($( this ).val());
        });
        console.log(newArticle);
    });

    // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    // $('pre code').each();

    // STRETCH: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
};

articleView.initNewArticlePage = () => {
    // [x]TODO: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
    articleView.create();

    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.

    $('#article-json').on('focus', function () {
        this.select();
    });

    // []TODO: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.

};