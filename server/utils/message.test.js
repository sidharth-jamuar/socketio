var expect=require('expect')
var {generateMessage}=require('./message')
describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from='sid';
        var text="this text";
        var message=generateMessage(from,text)
        expect(message.createdAt).toBeGreaterThan(1)
        expect(message).toBeDefined()
    })
})