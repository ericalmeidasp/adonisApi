import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Post } from 'App/Models'
import { PostStoreValidator, PostUpdateValidator } from 'App/Validators/Post'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 3

    const posts = await Post.query().orderBy('id', 'desc').preload('author').paginate(page, limit)

    posts.baseUrl('/posts')

    return posts
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(PostStoreValidator)

    const user = await auth.authenticate()

    const post = await Post.create({ ...data, authorId: user.id })

    await post.preload('author')

    return post
  }

  public async show({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    return post
  }

  public async update({ params, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = await request.validate(PostUpdateValidator)

    post.merge(data)

    await post.save()

    await post.preload('author')

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
  }
}
