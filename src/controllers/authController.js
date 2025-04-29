import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

class AuthController {
// Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validação basica
      // Se não houver nome, email ou senha, retorna um erro 400
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Os campos nome, email e senha são obrigatórios" });
        }

        // Verifica se o usuário já existe
        const userExists = await UserModel.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: "Email já cadastrado" });
        }

        // Hash da senha: Criptografa a senha
        const hashedPassaword = await bcrypt.hash(password, 10);

        // Cria objeto do usuário
        const data = {
            name,
            email,
            password: hashedPassaword,
        };

        // Cria o usuário 
        const user = await UserModel.create(data);

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user,
        });
    } catch (error) {
        console.error("Erro ao criar um novo usuário: ", error);
        res.status(500).json({ error: "Erro ao criar um novo usuário" });
    }
  }
}

export default new AuthController();