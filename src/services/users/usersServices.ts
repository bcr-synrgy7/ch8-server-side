import { v4 as uuidv4 } from 'uuid'
import { ValidationError } from 'objection'
import { validateUserInput, validateLoginInput } from '../../utils/usersValidators'
import { generateToken } from '../../utils/jwtUtils'
import { UserDto } from '../../dto/users/usersDto'
import { IUsersRepository } from '../../repositories/users/usersRepositoryInterface'
import { IUsersService } from './usersServiceInterface'
import { UserCurrentDto } from '../../dto/users/usersCurrentDto'

export class UsersService implements IUsersService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hashPassword: (password: string) => Promise<string>,
    private readonly comparePassword: (password: string, hashedPassword: string) => Promise<boolean>
  ) {}

  async registerUser(username: string, email: string, password: string): Promise<void> {
    validateUserInput(username, email, password)

    const existingUser = await this.usersRepository.findByEmail(email)
    if (existingUser != null) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Email already registered'
      })
    }

    const hashedPassword = await this.hashPassword(password)

    await this.usersRepository.insertUser({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      roleId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  async loginUser(email: string, password: string): Promise<{ user: UserDto, token: string }> {
    validateLoginInput(email, password)

    const user = await this.usersRepository.findByEmail(email)
    if (user == null) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Invalid email or password'
      })
    }

    const passwordMatch = await this.comparePassword(password, user.password)
    if (!passwordMatch) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Invalid email or password'
      })
    }

    const token = generateToken(user.id)
    const role = await this.usersRepository.findRoleById(user.roleId)

    return { user: new UserDto(user.username, role?.userRole ?? ''), token }
  }

  async getCurrentUser(userId: string): Promise<UserDto> {
    const user = await this.usersRepository.findById(userId)
    if (user == null) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'User not found'
      })
    }

    const role = await this.usersRepository.findRoleById(user.roleId)

    return new UserCurrentDto(user.id, user.username, user.email, role?.userRole ?? '')
  }

  async getAllUsers(page: number, pageSize: number): Promise<{ users: UserCurrentDto[], totalCount: number }> {
    const totalCount = await this.getTotalCount()
    const offset = (page - 1) * pageSize
    const users = await this.usersRepository.findAllUsersWithRoles(
      offset,
      pageSize // Menggunakan pageSize sebagai nilai untuk parameter limit
    )

    const usersWithRoles = users.map(
      (user) => new UserCurrentDto(user.id, user.email, user.username, user.role?.userRole ?? '')
    )

    return { users: usersWithRoles, totalCount }
  }

  async updateUserRole(userId: string, newRoleId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId)
    if (user == null) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'User not found'
      })
    }

    if (newRoleId !== '2') {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Cannot update user role to super admin'
      })
    }

    if (user.roleId === '3') {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Cannot update super admin role'
      })
    }

    await this.usersRepository.updateUserRole(userId, newRoleId)
  }

  async getTotalCount(): Promise<number> {
    return await this.usersRepository.getTotalCount()
  }
}
