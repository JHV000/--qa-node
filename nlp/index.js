const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['zh'], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument('zh', '我马上要走了', 'greetings.bye');
manager.addDocument('zh', '拜拜', 'greetings.bye');
manager.addDocument('zh', '再见', 'greetings.bye');
manager.addDocument('zh', '我必须走了', 'greetings.bye');
manager.addDocument('zh', '下次见', 'greetings.bye');

// Train also the NLG
manager.addAnswer('zh', 'greetings.bye', '好的，再见');
manager.addAnswer('zh', 'greetings.bye', '那拜拜喽！');


// Train and save the model
(async() => {
    // await manager.train();
    // manager.save();
    const response = await manager.process('zh', '你说我今天要不要走');
    console.log("——————————————————————————");
    console.log(response);
    console.log("——————————————————————————");
})();