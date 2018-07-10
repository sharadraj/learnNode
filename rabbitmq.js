var amqp = require('amqplib/callback_api');
console.log(amqp);
//amqp://preprod:preprod@eventlog-test.panasonicarbo.com
amqp.connect('amqp://preprod:preprod@eventlog.panasonicarbo.com', function(err, conn) {
  console.log(err);
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false})
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });
});
	
