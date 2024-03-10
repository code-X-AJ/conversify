const messageSchema = require('../../models/message.model')

const httpPostAddMsg = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageSchema.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) {
            return res.json({ msg: "message added successfully" })
        } else {
            return res.json({ msg: "Failed to send message" })
        }
    } catch (error) {
        next(error)
    }
}

const httpPostGetMsg = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const data = await messageSchema.find({
            users: {
                $all: [from, to],
            }
        }).sort({ updatedAt: 1 });

        const projetedMessages = data.map((msg)=>{
            return({
                fromSelf: msg.sender.toString()===from,
                message: msg.message.text
            })
        })
        return res.json(projetedMessages)
    } catch (error) {
        next(error)
    }
}



module.exports = {
    httpPostAddMsg,
    httpPostGetMsg
}