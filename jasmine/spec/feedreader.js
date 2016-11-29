/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed has a URL defined & not empty', function(){
            allFeeds.forEach(function(feed){
                feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl.length).not.toBe(0);
            })
         });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has a name defined & not empty', function () {

            allFeeds.forEach(function (feed) {
                feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName.length).not.toBe(0);
            });
        });
    });

    /* a new test suite named "The menu" */
    describe('The menu', function(){

        /* a test that ensures the menu element is
         * hidden by default. analyzed the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('menu element is hidden by default', function(){
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });
        /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu toggles visibility when clicked.', function(){
            $('a.menu-icon-link').click();
            expect(document.body.className).not.toContain('menu-hidden');
            $('a.menu-icon-link').click();
            expect(document.body.className).toContain('menu-hidden');
        });

    });

    /* a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test uses
         * Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function (done) {
            loadFeed(0, done);
        });
        it('has atleast a single entry in feed container', function (done) {
            expect($('.entry h2').length).not.toBe([0]);
            done();
        });

    });

    /* a new test suite named "New Feed Selection"

         /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
describe('New Feed Selection', function () {
        var feed;
        var newFeed;
        beforeEach(function (done) {
            loadFeed(0, function () {
                $feed = $('.header-title').html();
                loadFeed(1, function () {
                    $newFeed = $('.header-title').html();
                    done();
                });
            });
        });
        it('ensures content changes when a new feed is loaded', function (done) {
            expect($feed).not.toBe($newFeed);
            done();
        });
    });

}());
