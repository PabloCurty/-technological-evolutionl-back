import User from '../models/User';
import Person from '../models/Person'

class PersonsController  {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const { q } = req.query;
            const user = await User.findById(user_id);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: `User id ${user_id} do not exists.` });
            }
            let query = {};
            if (q) {
                query = {name: { $regex: q }}
            }
            const persons = await Person.find({
                userId: user_id,
                ...query
            });
            return res.status(200).json(persons);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
    async create(req, res) {
        try {
            const { user_id } = req.params;
            const {
                name,
                nickName,
                photoUrl,
                role,
                isTutor,
                email,
                tel,
                brithdayDate,
                city,
                startDate
            } = req.body;
            const user = await User.findById(user_id);
            if (!user) {
                return res
                .status(404)
                .json({ message: `User id ${user_id} do not exists.` });
            };
            const person = await Person.findOne({
                userId: user_id,
                name
            });
            if (person) {
                return res
                    .status(422)
                    .json({
                    message: `Person ${name} from your user id already exists, please if you want update your data.`,
                    });
            };
            const newPerson = await Person.create({
                name,
                nickName,
                photoUrl,
                role,
                isTutor,
                email,
                tel,
                brithdayDate,
                city,
                startDate,
                userId: user_id,
            });
            return res.status(201).json(newPerson);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
        
    }
    async update(req, res) { 
        try {
            const { user_id, id } = req.params;
            const { name,
                    nickName,
                    photoUrl,
                    role,
                    isTutor,
                    email,
                    tel,
                    brithdayDate,
                    city,
                startDate } = req.body;
            const user = await User.findById(user_id);
            if (!user) {
                return res
                .status(404)
                .json({ message: `User id ${user_id} do not exists.` });
            };
            const person = await Person.findById(id);
            if (!person) {
                return res
                .status(404)
                .json({ message: `Person id ${id} do not exists.` });
            }
            await person.updateOne({
                name,
                nickName,
                photoUrl,
                role,
                isTutor,
                email,
                tel,
                brithdayDate,
                city,
                startDate
            });
            return res.status(200).json(person)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
        
    }
    async destroy(req, res) { 
        try {
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);
            if (!user) {
              return res
                .status(404)
                .json({ message: `User id ${user_id} do not exists.` });
            }
            const person = await Person.findOne({
                userId: user_id,
                id,
            });
            if (!person) {
              return res.status(404).json({
                message: `Person Id ${id} do not exists.`,
              });
            }
            await person.deleteOne();
            return res.status(200).json(person);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new PersonsController();