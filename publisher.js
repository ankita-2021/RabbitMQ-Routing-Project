const amqp = require('amqplib');
const exchangeName = 'dynamicExhange';

const msg = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';

const sendingMsg = async() => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'fanout', {durable: false});
    channel.publish(exchangeName, '', Buffer.from(msg));
    console.log('Sent: ', msg);
    setTimeout(()=> {
        connection.close();
        process.exit(0);

    }, 1000)
}

sendingMsg();