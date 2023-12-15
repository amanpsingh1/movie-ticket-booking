import Movie from "../models/Movie.js";
import jwt  from "jsonwebtoken";
export const addMovie = async(req , res , next) => {
const token = req.headers.authorization.split(" ")[1]; //bearer token
if(!token || token.trim() ==="")
return res.status(400).json({message:"Token Not Found"});

//verify token
console.log(token,'token')
let adminId;
jwt.verify(token , `${process.env.SECRET_KEY}` ,(err , decrypted) => {
    if(err)
    return res.status(404).json({message:`${err.message}`})
    else{
        adminId =decrypted.id;
        return;
    }
})
//create movie
const {title , description , releaseDate , actors ,posterUrl , featured } = req.body;
if(!title || title.trim()==="" || !description ||description.trim() ==="" || !posterUrl || posterUrl.trim() === "")
return res.status(422).json({message:"Invalid Inputs"})
let movie;
try{
    movie = new Movie({
        title,
        description,
        releaseDate : new Date(`${releaseDate}`),
        actors,
        featured,
        posterUrl,
        "admin":adminId
    })
    movie = await movie.save()
}
catch(err){
    console.log(err)
}
if(!movie){
    return res.status(500).json({message:"Can not create a movie"})
}
return res.status(201).json({message:"Created Successfully" , movie})


}

export const getAllMovies = async (req , res , next) => {
        let movies;
        try{
            movies = await Movie.find(); //all will be find if u dont provide anything
            console.log(movies,'check')
        }
        catch(err){
            console.log(err)
        }
        if(!movies)
        return res.status(500).json({message:"No Movies to show"})  

        return res.status(201).json({message:"Movies List" , movies})

}
export const getMovieById = async( req, res, next) => {
    const movieId = req.params.id;
    console.log(movieId);
    let movie;
    try{
        movie = await Movie.findById(movieId)
    }
    catch(err){
        console.log(err)
    }
    if(!movie)
    return res.status(500).json({message:"Movie Not Found"})

    return res.status(201).json({message:"Movie Info" , movie})
}