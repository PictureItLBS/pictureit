// TODO: Create a model similar to User.js that creates a post.
import { ObjectId } from "mongodb"


/**
 * @typedef  {object}   Post        A post on PictureIt.
 * @typedef  {object}   author      A post author.
 * @property {ObjectId} _id         The id of the post.
 * @property {string}   caption     The caption of the post.
 * @property {string}   date        The date when the post was made.
 * @property {string}   likedBy     Amount of likes on a post.
 */

 function Post(caption, author) {
    return {
      caption,
      author,
      date: new Date(Date.now()),
      likedBy: [],
      
    }
  }