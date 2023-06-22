import autores from "../models/Autor.js";

class AutorController {

    static listarautores = async (req, res) => {
        try {
        const autoresEncontrados = await autores.find().exec();
        res.status(200).json(autoresEncontrados);
        } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar autores' });
        }
    }

    static listarAutorPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const autorEncontrado = await autores.findById(id).exec();
            if (autorEncontrado) {
                res.status(200).send(autorEncontrado);
            } else {
                res.status(404).send({ message: 'Autor não encontrado' });
            }
        } catch (err) {
            res.status(400).send({ message: `${err.message} - id do Autor não localizado.`});
        }
    }

    static cadastrarAutor = async (req, res) => {
        try {
        const autor = new autores(req.body);
        await autor.save();
        res.status(201).send(autor.toJSON());
        } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar Autor.` });
        }
    }

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndUpdate(id, {$set: req.body})
            res.status(200).send({message: 'Autor atualizado com sucesso!'});
        } catch (err) {
            res.status(500).send({ message: err.message})
        }
    }

    static deletarAutor = async (req, res) => {
        try{
            const id = req.params.id;
            await autores.findByIdAndDelete(id)
            res.status(200).send({ message: 'Autor removido com sucesso.'})
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    }

    
}

export default AutorController;
