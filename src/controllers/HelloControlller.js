class HelloController {
    async index(req, res) {
        return res.json({ hello: 'word' });
    }
}

export default new HelloController();