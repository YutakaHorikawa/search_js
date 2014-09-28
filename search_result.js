var casper = require('casper').create();
var titles = [];
var links = [];
var discriptions = [];

casper.start("http://www.google.co.jp",function(){
    keyword = casper.cli.args[0];
    if(!keyword) keyword = 'keyword';
    this.fill('form[action="/search"]', { q: keyword}, true);
});

function getTitles() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.innerHTML;
    });
};

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
};

function getDiscriptions() {
    var links = document.querySelectorAll('span.st');
    return Array.prototype.map.call(links, function(e) {
        return e.innerHTML;
    });
};

casper.then(function(){
    titles = this.evaluate(getTitles);
    links = this.evaluate(getLinks);
    discriptions = this.evaluate(getDiscriptions);
    var filename = new Date().toString();
    this.capture(filename + '.png');
});

casper.run(function() {
    var result = [];
    for(var i=0, len=links.length; i < len; i++) {
        var title = titles[i];
        var link = links[i];
        var discription = discriptions[i].replace(/\n/g, '');
        var index = i + 1;  
        result[i] = index + ":\t" + title + "\t" + link + "\t" + discription 
    }
    this.echo(result.join('\n'));
    this.echo('＼(^o^)／').exit();
});


