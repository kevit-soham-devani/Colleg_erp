import request from 'supertest';
import mongoose from 'mongoose';
import {app} from '../src/app';
import dbObj from '../testing/db/db.test';
beforeEach(dbObj.setupDatabase)

//POST attendance 
test('should create attendance if authorized', async () => {
    await request(app)
       .post('/attendance')
       .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
       .send({
            date:'01-08-2024',
            isAbsent:"present",
            rollNumber:dbObj.studentTwo.rollNumber
       })
       .expect(201);
});

test('should not create attendance if not authorized', async () => {
    await request(app)
       .post('/attendance')
       .send({
            date:'01-08-2024',
            isAbsent:"present",
            rollNumber:dbObj.studentTwo.rollNumber
       })
       .expect(401);
});

//GET /absentees
test('should get  absentees for that particular day if authorized', async () => {
     const response=await request(app)
        .get('/absentees')
        .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
        .expect(200);
        expect(response.body.data[0].rollNumber).toBe(dbObj.studentTwo.rollNumber)
 });
 
 test('should not get absentees for that particular day if not authorized', async () => {
     await request(app)
        .get('/absentees')
        .expect(401);
 });

 //PATCH /attendance
test('should update attendance details if authorized', async () => {
     await request(app)
        .patch(`/attendance?rollNumber=21ce056`)
     //    .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
        .send({ isAbsent:"present",date:"01-08-2024"})
        .expect(200);
 });

 //DELETE /attendance
test('should delete batch if authorized', async () => {
     await request(app)
      .delete('/attendance?rollNumber=21ce056&date=01-08-2024')
      .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
      .expect(200);
 });
 