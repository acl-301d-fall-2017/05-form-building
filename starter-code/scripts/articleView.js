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
// This function is called at the bottom of the index.html file. It waits for the page to load, then runs the functions that are specefic to that page. 
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};

articleView.initNewArticlePage = () => {
    $('.tab-content').show();

    $('#article-json').on('focus', function () {
        this.select();
    });

    articleView.createArticlePreview();
};

articleView.createArticlePreview = () => {
    $('#articles').children().remove();

    $('#new-article').on('change', function() {

        const newArticle = new Article ({
            title: $('#new-title').val(),
            category: $('#new-category').val(),
            author: $('#new-author').val(),
            authorUrl: $('#new-website').val(),
            body: $('#new-body').val()
        });

        const filledTemp = newArticle.toHtml();

        $('#articles').children().remove();
        $('#articles').append(filledTemp);

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
            hljs.configure({useBR: true}); 
        });
    });
};

//               objects and () => {}

const fakeArticleView = {
    createArticlePreview: function () {
        console.log('in a regular function, this is ', this);
    }
};

fakeArticleView.initNewArticlePage = () => {
    console.log('in an arrow function, this is', this);
};

console.log('the fakeArticleView obj:', fakeArticleView);

function globalFun () {
    // global function!

    function notGlobalFun () {
        // not global function
    }
}