var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');

var template = require('./json-template');
var data = require('./data');

console.log('Server Starting...');

var headerHelper = CreateHeaderHelper();
var mimeTypes = CreateMimeTypes();
var searchEngines = [
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
];

http.createServer(function(req, res) {
    console.log("============================");
    console.log(req.url);
    console.log(req.headers);

    var writer = CreateResponseWriter(req, res);

    var searchEngine = false;
    if (searchEngines.indexOf(req.headers['user-agent']) >= 0) {
        searchEngine = true;
        // XXX Make it more search engine generic
    }

    var parsedURL = url.parse(req.url);
    var pages = parsedURL.pathname.split('/');
    pages.shift();
    var page = pages.shift();
    if (page === 'music' || page === 'soft' ||
       page === 'resume' || page === 'home') {
        parsedURL.pathname = '/';
    }

    var file = '../Client';
    if (parsedURL.pathname === '/') {
        if (searchEngine) {
            if (!page) {
                page = 'home';
            }
            file += '/noscript/' + page + '.html';
            readTemplateFile(file);
        } else {
            file += '/index.html';
            readFile(file);
        }
    } else if (/\/refreshData\/?/.test(parsedURL.pathname)) {
        data.refreshData();
    } else if (parsedURL.pathname === '/favicon.ico') {
        file += '/img/favicon.ico';
        readFile(file);
    } else if (parsedURL.pathname.indexOf('/../') < 0) {
        file += querystring.unescape(parsedURL.pathname);
        readFile(file);
    } else {
        writer.defaultResponses[404](res);
    }

    function readFile(file) {
        console.log(file);
        fs.readFile(file, function(err, data) {
            if (err && err.errno == 2) {
                writer.defaultResponses[404](err.message);
                return;
            } else if (err) {
                writer.defaultResponses[503](err.message);
                return;
            }
            var dataType =
                mimeTypes.extToMime(file.slice(file.lastIndexOf('.') + 1));
            fs.stat(file, function(err, stat) {
                if (err) {
                    writer.defaultResponses[503](err.message);
                    return
                }
                writer.write(data, dataType, stat);
            });
        });
    }

    function readTemplateFile(file) {
        console.log(file);
        fs.readFile(file, function(err, templateData) {
            if (err && err.errno == 2) {
                writer.defaultResponses[404](err.message);
                return;
            } else if (err) {
                writer.defaultResponses[503](err.message);
                return;
            }

            fs.stat(file, function(err, stat) {
                if (err) {
                    writer.defaultResponses[503](err.message);
                    return;
                }
                data.getData(
                    function(jsonData) {
                        htmlData = template.expand(String(templateData), jsonData);
                        writer.write(htmlData, 'text/html', stat);
                    }
                );
            });
        });
    }
}).listen(8001);//, '127.0.0.1');

console.log('Server Started.');

function CreateHeaderHelper() {
    return {
        request: {
            range: function(range, startValue, endValue) {
                if (!range) {
                    return null;
                }
                var startMatches = range.match(/[0-9]+-/);
                if (startMatches) {
                    startValue = parseInt(startMatches[0], 10);
                }
                var endMatches = range.match(/-[0-9]+/);
                if (endMatches) {
                    endValue = -parseInt(endMatches[0], 10);
                }
                return {
                    start: startValue,
                    end: endValue
                }
            }
        },
        response: {
            contentRange: function(start, end, total) {
                return 'bytes ' + start + '-' + end + '/' + total;
            }
        }
    };
}

function CreateResponseWriter(req, res) {
    var obj = {
        write: function(data, dataType, stat) {
            var resStatus = 0;

            var headers = {
                'Content-Type': dataType,
                'Accept-Ranges': 'bytes',
                'Transfer-Encoding': 'chunked',
                'Cache-Control': 'public',
                'Date': (new Date()).toGMTString()
            };

            if (dataType.indexOf('audio/') >= 0) {
                headers['access-control-allow-origin'] = '*';
            }

            if (stat) {
                headers['Last-Modified'] = stat.mtime;

                var etag = stat.size + '-' + Date.parse(stat.mtime);
                if (req.headers['if-none-match'] === etag) {
                    res.writeHead(304, headers);
                    res.end();
                    return;
                }
                headers['ETag'] = etag;
            }

            var range = headerHelper.request.range(req.headers.range, 0, data.length - 1);
            if (range) {
                if (range.end < range.start) {
                    obj.defaultResponses[406]('Range: ' + range.start + '-' + range.end);
                    return;
                }
                resStatus = 206;
                if (range.end >= data.length) {
                    range.end = data.length - 1;
                }
                headers['Content-Range'] = headerHelper.response.contentRange(
                    range.start, range.end, data.length
                );
            } else {
                resStatus = 200;
                range = {
                    start: 0,
                    end: data.length - 1
                };
            }

            headers['Content-Length'] = range.end - range.start + 1;
            res.writeHead(resStatus, headers);
            var i = range.start;
            while (i <= range.end) {
                var end = Math.min(i + 8192, range.end + 1);
                res.write(data.slice(i, end));
                i += 8192;
            }
            res.end();
        },
        defaultResponses: {
            404: function(message) {
                var body = '<html>' +
                            '<head><title>Error</title></head>' +
                            '<body><div>ERROR 404: File not found</div>';
                if (message) {
                    body += '<div>' + message + '</div>';
                }
                body += '</body></html>';
                res.writeHead(
                    404,
                    {'Content-Type': 'text/html', 'Content-Length': body.length}
                );
                res.end(body);
            },
            406: function(message) {
                var body = '<html>' +
                            '<head><title>Error</title></head>' +
                            '<body>' +
                            '<div>ERROR 406: Request not acceptable</div>';
                if (message) {
                    body += '</div>' + message + '</div>';
                }
                body += '</body></html>';
                res.writeHead(
                    406,
                    {'Content-Type': 'text/html', 'Content-Length': body.length}
                );
                res.end(body);
            },
            503: function(message) {
                var body = '<html>' +
                            '<head><title>Error</title></head>' +
                            '<body>' +
                            '<div>ERROR 503: A server error has occured.' +
                            ' Please try again later</div>';
                if (message) {
                    body += '<div>' + message + '</div>';
                }
                body += '</body></html>';
                res.writeHead(
                    503,
                    {'Content-Type': 'text/html', 'Content-Length': body.length}
                );
                res.end(body);
            }
        }
    };
    return obj;
}

function CreateMimeTypes() {
    var types = {
        'html': 'text/html',
        'js'  : 'text/javascript',
        'css' : 'text/css',
        'mp3' : 'audio/mp3',
        'ogg' : 'audio/ogg',
        'ico' : 'image/x-icon',
        'png' : 'image/png',
        'jpeg': 'image/jpeg',
        'jpg' : 'image/jpeg'
    };
    return {
        extToMime: function(ext) {
            return types[ext] ? types[ext] : '';
        }
    };
}

