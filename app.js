const http = require('http');
const url = require('url');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

http
  .createServer((req, res) => {
    const date = dayjs(url.parse(req.url, true).query.date || new Date());
    const utcDate = date.utc();
    const beats = Math.round(
      ((((utcDate.hour() + 1) % 24) +
        utcDate.minute() / 60 +
        utcDate.second() / 3600) *
        1000) /
        24
    );

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'access-control-allow-methods': 'GET',
    });
    res.write(
      JSON.stringify({
        local_date: date.format(),
        utc_date: date.utc(),
        internet_beats: beats,
      })
    );
    res.end();
  })
  .listen(process.env.PORT || 3000);
