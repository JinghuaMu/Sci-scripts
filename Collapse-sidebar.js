// ==UserScript==
// @name         Collapse Sidebar in Academic Websites
// @namespace    https://github.com/henflower/Sci-scripts/blob/main/Collapse-sidebar.js
// @version      0.21
// @description  Make elements on multiple websites collapsible
// @author       Henflower
// @match        *://www.nature.com/articles/*
// @match        *://www.sciencedirect.com/*
// @match        *://www.ncbi.nlm.nih.gov/pmc/articles/*
// @match        *://www.science.org/doi/*
// @match        *://academic.oup.com/*
// @match        *://onlinelibrary.wiley.com/doi/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .collapsible-button {
            position: fixed !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 9999 !important;
            width: 25px !important;
            height: 25px !important;
            border-radius: 50% !important;
            opacity: 0.8 !important;
            text-align: center !important;
        }
    `;
    document.head.appendChild(style);

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
        },
        {
            hostname: 'academic.oup.com',
            selector: '.page-column--left, .page-column--right',
            articleSelector: '.page-column--center'
        },
        {
            hostname: 'onlinelibrary.wiley.com',
            selector: '.article-row-right',
            articleSelector: '.article-row-left'
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
        button.classList.add('collapsible-button');
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
