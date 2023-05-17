const amqp = require('amqplib');
const exchangeName = 'dynamicExhange';

const receiveMsg = async ()=> {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'fanout', {durable: false});

    const q = await channel.assertQueue('', {exclusive: true});

    console.log(`waiting for message in queue: ${q.queue}`);

    await channel.bindQueue(q.queue, exchangeName, '');
    channel.consume(q.queue, msg =>{
        if(msg.content) console.log('The message is :', msg.content.toString());
    }, {noAck: true})
}

receiveMsg()