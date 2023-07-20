// ==UserScript==
// @name         Collapse Sidebar in Acdemic Websites
// @namespace    https://github.com/henflower/Sci-scripts/blob/main/Collapse-sidebar.js
// @version      0.21
// @description  Make elements on multiple websites collapsible
// @author       Henflower
// @match        *://www.nature.com/articles/*
// @match        *://www.sciencedirect.com/*
// @match        *://www.ncbi.nlm.nih.gov/pmc/articles/*
// @match        *://www.science.org/doi/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const collapsibleElements = [
        {
            hostname: 'nature.com',
            selector: '.c-article-extras.u-hide-print',
            articleSelector: 'main.c-article-main-column'
        },
        {
            hostname: 'sciencedirect.com',
            selector: '.RelatedContent, .TableOfContents.text-s',
            articleSelector: '.col-lg-12.col-md-16.pad-left.pad-right.u-padding-s-top'
        },
        {
            hostname: 'ncbi.nlm.nih.gov',
            selector: '.pmc-sidebar, .usa-nav',
            articleSelector: '.pmc-article'
        }
        /*
        ,{
            hostname: 'science.org',
            selector: '.article__aside',
            articleSelector: '.article__body'
        }
        */
    ];

    function addCollapsibleButton(element, article) {
        const button = document.createElement('button');
        button.innerText = '-';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.zIndex = 9999;
        button.style.width = '25px';
        button.style.height = '25px';
        button.style.borderRadius = '50%';
        button.style.opacity = '0.8';
        button.style.textAlign = 'center';
        button.addEventListener('click', () => {
            if (element.style.display === 'none') {
                element.style.display = 'block';
                article.style.width = ''; // Reset the width of the article
                button.innerText = '-';
            } else {
                element.style.display = 'none';
                article.style.width = '100%'; // Increase the width of the article
                button.innerText = '+';
            }
        });
        document.body.appendChild(button);
    }

    const currentHostname = window.location.hostname;
    const currentCollapsibleElements = collapsibleElements.filter(
        (element) => currentHostname.includes(element.hostname)
    );
    currentCollapsibleElements.forEach((element) => {
        const el = document.querySelector(element.selector);
        const article = document.querySelector(element.articleSelector);
        if (el && article) {
            addCollapsibleButton(el, article);
        }
    });
})();
