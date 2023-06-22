import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async (req, res) => {
        try {
        const livrosEncontrados = await livros.find().exec();
        res.status(200).json(livrosEncontrados);
        } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar livros' });
        }
    }

    static listarLivroPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findById(id).exec();
            if (livroEncontrado) {
                res.status(200).send(livroEncontrado);
            } else {
                res.status(404).send({ message: 'Livro não encontrado' });
            }
        } catch (err) {
            res.status(400).send({ message: `${err.message} - id do Livro não localizado.`});
        }
    }

    static cadastrarLivro = async (req, res) => {
        try {
        const livro = new livros(req.body);
        await livro.save();
        res.status(201).send(livro.toJSON());
        } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` });
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, {$set: req.body})
            res.status(200).send({message: 'Livro atualizado com sucesso!'});
        } catch (err) {
            res.status(500).send({ message: err.message})
        }
    }

    static deletarLivro = async (req, res) => {
        try{
            const id = req.params.id;
            await livros.findByIdAndDelete(id)
            res.status(200).send({ message: 'Livro removido com sucesso.'})
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    }
}

export default LivroController;
