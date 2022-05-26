class Endereco{
    #id_endereco
    #logradouro
    #numero
    #bairro
    #cidade
    #estado
    #id_usuario

    constructor(logradouro, numero, bairro, cidade, estado, id_usuario){
        this.#logradouro = logradouro
        this.#numero = numero
        this.#bairro = bairro
        this.#cidade = cidade
        this.#estado = estado
        this.#id_usuario = id_usuario
    }
    
    get logradouro(){
        return this.#logradouro
    }
    set logradouro(logradouro){
        return this.#logradouro = logradouro
    }
    get numero(){
        return this.#numero
    }
    set numero(numero){
        return this.#numero = numero
    }
    get bairro(){
        return this.#bairro
    }
    set bairro(bairro){
        return this.#bairro = bairro
    }
    get cidade(){
        return this.#cidade
    }
    set cidade(cidade){
        return this.#cidade = cidade
    }
    get estado(){
        return this.#estado
    }
    set estado(estado){
        return this.#estado = estado
    }
    get id_usuario(){
        return this.#id_usuario
    }
    set id_usuario(id_usuario){
        return this.#id_usuario = id_usuario
    }
    get id_endereco(){
        return this.#id_endereco
    }
    set id_endereco(id_endereco){
        return this.#id_endereco = id_endereco
    }
}

module.exports = Endereco