import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todos os cards
  async findAll() {
    // Ratidade Ultra Rare
    const cartas = await prisma.card.findMany({
      /* where: {
        rarity: "Ultra Rare",   
        }, */
      /* where: {
      attackPoints: {
      Lte: 8000,   
      },
      }, */
      /* where: {
        attackPoints: {
          gte: 8000,
        },
      }, */
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collection: {
          // Seleciona os campos que deseja trazer da coleção
          // Se não colocar o select, ele traz todos os campos da coleção
          select: {
            id: true,
            name: true,
            description: true,
            releaseYear: true,
          },
        },
      },
    });

    // console.log(cartas);

    return cartas;
  }

  // Obter uma coleção pelo ID
  async findById(id) {
    const carta = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
      // Traz o cards que estão vinculado
      include: {
        collection: true,
      },
    });

    return carta;
  }

  // Criar uma nova coleção
  async create(
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const novaCarta = await prisma.card.create({
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      },
    });

    return novaCarta;
  }

  // Atualizar uma coleção existente
  async update(
    id,
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const carta = await this.findById(id);

    if (!carta) {
      return null;
    }

    // Atualize o coleção existente com os novos dados
    const data = {};
    if (name !== undefined) {
      data.name = name;
    }
    if (rarity !== undefined) {
      data.rarity = rarity;
    }
    if (attackPoints !== undefined) {
      data.attackPoints = attackPoints;
    }
    if (defensePoints !== undefined) {
      data.defensePoints = defensePoints;
    }
    if (imageUrl !== undefined) {
      data.imageUrl = imageUrl;
    }
    if (collectionId !== undefined) {
      data.collectionId = collectionId;
    }

    const cardUpdated = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      },
    });

    return cardUpdated;
  }

  // Remover uma coleção
  async delete(id) {
    const carta = await this.findById(id);

    if (!carta) {
      return null;
    }

    await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CardModel();
