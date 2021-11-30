import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { PostStoreValidator, PostUpdateValidator } from 'App/Validators/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.all()

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
