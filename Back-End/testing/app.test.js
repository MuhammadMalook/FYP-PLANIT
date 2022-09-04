const request = require('supertest')
const app = require('../app')
describe("End Routes Testing", ()=> {

    test("it validates user registration", async()=>{
        const user = { name:"Sajjad", 
                        email:"sajjad@gmail.com", 
                        number:"03034453234", 
                        password:"sajjad123", 
                        deviceToken:"esdfsfwr4sfwrdsfdssfs" }

                        const res = await request(app).post('/person').send(user);
                        expect(res.body.success).toBe(true)

    })
})