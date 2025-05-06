import CardModel from "../models/cardModel.js";

class CardController {
  // GET /api/cartas
  // Obter todos os cards
  async getAllCards(req, res) {
    const pagina = req.query.page;
    console.log("pagina", pagina);

    const limite = req.query.limit;
    console.log("limite", limite);

    try {
      const card = await CardModel.findAll();
      res.json(card);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta" });
    }
  }

  // GET /api/cartas/:id
  // Obter uma coleção pelo ID
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const carta = await CardModel.findById(id);

      if (!carta) {
        return res.status(404).json({ error: "Carta não encontrado" });
      }

      res.json(carta);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta" });
    }
  }

  // POST /api/cartas
  // Criar uma nova carta
  async createCard(req, res) {
    try {
      // Validação básica
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Verifica se o nome e o ano de lançamento foram fornecidos
      if (
        !name ||
        !rarity ||
        !attackPoints ||
        !defensePoints ||
        !collectionId
      ) {
        return res
          .status(400)
          .json({
            error:
              "Os campos nome, raridade, pontos de ataque, pontos de defesa e o id da coleção são obrigatórios",
          });
      }

      // Criar o nova carta
      const novaCarta = await CardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!novaCarta) {
        return res.status(400).json({ error: "Erro ao criar carta" });
      }

      res.status(201).json({
        message: "Carta criada com sucesso",
        novaCarta,
      });
    } catch (error) {
      console.error("Erro ao criar carta:", error);
      res.status(500).json({ error: "Erro ao criar carta" });
    }
  }

  // PUT /cartas/:id
  async updatedCard(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Atualizar a carta
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "Carta não encontrado" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar carta:", error);
      res.status(500).json({ error: "Erro ao atualizar carta" });
    }
  }

  // DELETE /api/cartas/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover a carta
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Carta não encontrado" });
      }

      res.status(200).json({
        message: "Carta removida com sucesso",
      });
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover carta" });
    }
  }
}

export default new CardController();
