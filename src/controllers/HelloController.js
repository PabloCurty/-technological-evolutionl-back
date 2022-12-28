

class HelloController {
    async index(req, res) {
        return res.json({ hello: 'Tudo bem' });
    }
}
export default new HelloController();