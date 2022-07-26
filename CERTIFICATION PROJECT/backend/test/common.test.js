let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing REST APIs',()=>{

    it('Should Return Status 200 for `/`',(done)=>{
        chai
            .request('http://localhost:8080/')
            .get("/")
            .then((res)=>{
                expect(res).to.have.status(200);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

    it('Should Return Status 200 for `/users`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/admin/users")
            .then((res)=>{
                expect(res).to.have.status(200);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    })

    it('Should Return Status (negative test) 404 for `/users`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/admin/user")
            .then((res)=>{
                expect(res).to.have.status(404);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

    it('Should Return Status 200 for `/products`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/products/products")
            .then((res)=>{
                expect(res).to.have.status(200);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

    it('Should Return Status 404(Negative Test) for `/products`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/products/product")
            .then((res)=>{
                expect(res).to.have.status(404);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

    it('Should Return Status 200 for `/user/:id`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/admin/users/61005be6bb7ade2f20a366de")
            .then((res)=>{
                expect(res).to.have.status(200);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

    it('Should Return Status 200 for `/products/:id`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/products/products/61009b7ef0e7883148a6bde3")
            .then((res)=>{
                expect(res).to.have.status(200);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });


    it('Should Return Status 200 for `/orders`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/orders")
            .then((res)=>{
                expect(res).to.have.status(200);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

    it('Should Return Status (Negative Test) 404 for `/orders`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/order")
            .then((res)=>{
                expect(res).to.have.status(404);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

    it('Should Return Status (Negative Test) 404 for `/orders`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/order")
            .then((res)=>{
                expect(res).to.have.status(404);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

    

    it('Should Return Status  404 for `/orders/:id`',(done)=>{
        chai
            .request('http://localhost:8080')
            .get("/orders/61042ef5e35cbb118c929c5a")
            .then((res)=>{
                expect(res).to.have.status(404);
                done();
            })
            .catch((err)=>{
                throw err;
            })
    });

   
   
})