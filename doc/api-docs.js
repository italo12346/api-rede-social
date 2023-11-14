/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operações de Usuários
 *   - name: Foto
 *     description: Operações de Fotos
 *   - name: Comentario
 *     description: Operações de Comentários
 */

/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticação realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       422:
 *         description: Erro de validação
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Exclui um usuário por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /foto/create:
 *   post:
 *     summary: Cria uma nova foto
 *     tags: [Foto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *               descricao:
 *                 type: string
 *               autorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Foto criada com sucesso
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /foto/list:
 *   get:
 *     summary: Lista todas as fotos com os conteúdos dos comentários
 *     tags: [Foto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fotos com conteúdos de comentários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FotoWithComments'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /foto/{id}:
 *   get:
 *     summary: Busca uma foto por ID
 *     tags: [Foto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da foto
 *     responses:
 *       200:
 *         description: Foto encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FotoWithComments'
 *       404:
 *         description: Foto não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /foto/{id}:
 *   put:
 *     summary: Atualiza uma foto por ID
 *     tags: [Foto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da foto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Foto atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FotoWithComments'
 *       404:
 *         description: Foto não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /foto/{id}:
 *   delete:
 *     summary: Exclui uma foto por ID
 *     tags: [Foto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da foto
 *     responses:
 *       200:
 *         description: Foto excluída com sucesso
 *       404:
 *         description: Foto não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /comentario/create:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comentario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *               autorId:
 *                 type: string
 *               fotoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentário postado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /comentario/list:
 *   get:
 *     summary: Lista todos os comentários
 *     tags: [Comentario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comentários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ComentarioWithUser'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /comentario/{id}:
 *   get:
 *     summary: Busca um comentário por ID
 *     tags: [Comentario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComentarioWithUser'
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /comentario/{id}:
 *   put:
 *     summary: Atualiza um comentário por ID
 *     tags: [Comentario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComentarioWithUser'
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /comentario/{id}:
 *   delete:
 *     summary: Exclui um comentário por ID
 *     tags: [Comentario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário excluído com sucesso
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         usuario:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *         fotoPerfil:
 *           type: string
 *     Foto:
 *       type: object
 *       properties:
 *         imagem:
 *           type: string
 *         descricao:
 *           type: string
 *         autor:
 *           type: string
 *     FotoWithComments:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         imagem:
 *           type: string
 *         descricao:
 *           type: string
 *         autor:
 *           $ref: '#/components/schemas/User'
 *         comentarios:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comentario'
 *     Comentario:
 *       type: object
 *       properties:
 *         conteudo:
 *           type: string
 *         autor:
 *           type: string
 *         foto:
 *           type: string
 *     ComentarioWithUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         conteudo:
 *           type: string
 *         autor:
 *           $ref: '#/components/schemas/User'
 *         foto:
 *           $ref: '#/components/schemas/Foto'
 */