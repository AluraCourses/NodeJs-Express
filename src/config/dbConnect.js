import mongoose from "mongoose"

mongoose.connect("mongodb+srv://GustavoDeSouzaFonseca:Gugu0808!@cluster0.v7bkxhv.mongodb.net/Alura-Node?");

let db = mongoose.connection;

export default db;