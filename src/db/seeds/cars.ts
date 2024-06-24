import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'

export async function seed (knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE cars RESTART IDENTITY')

  await knex('cars').insert([
    {
      id: uuidv4(),
      name: 'Nissan Altima',
      category: 'Medium',
      price: 10000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104264/car/yru9fp0ufgmmh5sp0oly.jpg',
      onPublish: 'true',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Chevrolet Camaro',
      category: 'Small',
      price: 100.05,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104262/car/qdkq3mpop2mmyol704ml.jpg',
      onPublish: 'false',
      createdBy: 'admin',
      updatedBy: 'admin',
      deletedBy: 'firman',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Volkswagen Golf',
      category: 'large',
      price: 20000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104262/car/o5bkw6zdraa3cwmkqa0x.jpg',
      onPublish: 'true',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Tesla Model S',
      category: 'Small',
      price: 30000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104261/car/iept5vav3ttjdabuypeg.jpg',
      onPublish: 'false',
      createdBy: 'admin',
      updatedBy: 'admin',
      deletedBy: 'rizki',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'BMW X5',
      category: 'large',
      price: 400.05,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104260/car/skt6rvjgfdcvgzxmioob.jpg',
      onPublish: 'true',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Audi Q7',
      category: 'small',
      price: 50.05,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104260/car/t3r878htecswlvikjztb.jpg',
      onPublish: 'false',
      createdBy: 'admin',
      updatedBy: 'admin',
      startRent: '2012/03/05',
      finishRent: '2012/03/10',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Mercedes-Benz C-Class',
      category: 'large',
      price: 500000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104260/car/drk5dkruknaqw1mrlflq.jpg',
      onPublish: 'true',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Toyota RAV4',
      category: 'medium',
      price: 30000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104260/car/meb1vwuvkwxly4qpqpcq.jpg',
      onPublish: 'false',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Ford F-150',
      category: 'small',
      price: 30000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104259/car/jbstk6ky4kqpqzqvvi1a.jpg',
      onPublish: 'true',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Honda Accord',
      category: 'small',
      price: 40000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104258/car/tudrnarti3smdd2nksap.jpg',
      onPublish: 'false',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'ferrari',
      category: 'large',
      price: 4000000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104258/car/atenkg2n272rtbk0r8w3.jpg',
      onPublish: 'true',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Nissan X-Trail',
      category: 'large',
      price: 4000000,
      image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1718104258/car/jtcpthk9litexsvkwjgn.jpg',
      onPublish: 'true',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
}
