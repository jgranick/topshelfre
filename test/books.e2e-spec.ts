import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BookController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
  	imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();
  });

  it('/books (POST)', () => {
	return request(app.getHttpServer())
  	.post('/books')
  	.send({id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99})
  	.expect(201);
  });

  it('/books/1 (GET)', () => {
	return request(app.getHttpServer())
  	.get('/books/1')
  	.expect(200);
  });

  it('/books/1 (PUT)', () => {
	return request(app.getHttpServer())
  	.put('/books/1')
  	.send({title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99})
  	.expect(200);
  });

  it('/books/1 (DELETE)', () => {
	return request(app.getHttpServer())
  	.delete('/books/1')
  	.expect(200);
  });

  it('/books (GET)', () => {
	return request(app.getHttpServer())
  	.get('/books')
  	.expect(200);
  });
});
