import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class CreateUsersSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'admin@eric.com',
        password: 'secret',
        name: 'Éric Almeida',
        role: 'admin',
      },
      {
        email: 'normal@eric.com',
        password: 'secret',
        name: 'Éric Almeida',
        role: 'normal',
      },
    ])
  }
}
