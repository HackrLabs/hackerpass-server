import {EntityRepository, Repository} from 'typeorm';
import {User} from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByName(firstName: string, lastName: string): Promise<User> {
		return await this.findOne({ firstName, lastName });
  }

  async findFullByEmail(email: string): Promise<User> {
    // return await this.userRepository.createQueryBuilder('user')
    //   .select()
    //   .addSelect('user.password')
    //   .leftJoinAndSelect('user.roles', 'role')
    //   .where('user.email = :email', {email: email})
    //   .getOne();
    return await this.findOne({
      select: ['password'],
      relations: ['roles'],
      where: {
        email
      }
    });
  }
}
