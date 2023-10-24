const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getFavoritoById(req, res) {
    const { id } = req.params;
    try {
        const favorito = await prisma.favorito.findUnique({
            where: {
                id
            }
        });
        if (!favorito) {
            return res.status(404).json({ message: 'Favorito não encontrado.' });
        }
        res.status(200).json(favorito);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar favorito.' });
    }
}

async function createFavorito(req, res) {
    try {
        const { clientId, hotelId } = req.body;
        const favorito = await prisma.favorito.create({
            data: {
                clientId,
                hotelId
            },
        });
        res.status(201).json( favorito );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao criar favorito.' });
    }
};
async function deleteFavorito(req, res) {
    try {
        const { id } = req.params;
        const favorito = await prisma.favorito.findUnique({
            where: {
                id
            }
        });
        if(!favorito){
            return res.status(404).json({ message: 'Favorito não encontrado.' });
        }
        res.status(200).json({ message: 'Favorito deletado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao deletar favorito.' });
    }
};

async function getFavoritos(req, res) {
    try {
        const favoritos = await prisma.favorito.findMany();
        res.status(200).json( favoritos );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar favoritos.' });
    }
}

async function getFavoritosByClienteId(req, res) {
    const { id } = req.params;
    try {
        const favoritos = await prisma.favorito.findMany({
            where: {
                clientId: id
            }
        });
        res.status(200).json( favoritos );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar favoritos.' });
    }
}

module.exports = {
    createFavorito,
    deleteFavorito,
    getFavoritoById,
    getFavoritos,
    getFavoritosByClienteId
};
