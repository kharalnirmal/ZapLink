import { nanoid } from 'nanoid'
import Url from '../models/url.model.js';



const shortenUrl = async (req, res) => {
try {
    //original url from the request body
    //check if the original url is valid
    //check if the original url already exists in database send it
    //Create a url code using nanoid
    //generate a short code using nanoid
    //generate a short url using the base url and short code
    //save to database
    //return the response
    
    const { originalUrl } = req.body;

    const userId = req.user._id; // WHY? Get user ID from auth middleware
   //  console.log(originalUrl)


     // WHY validate? Users might send invalid URLs
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(originalUrl);
    if(!urlRegex){
        return res.status(400).json({message:"invalid URL"})
    }
   
        // WHY check if URL already exists? Avoid duplicates, save database space
    // WHY check by user AND originalUrl? Each user can have their own short URL for same site
     const existingUrl = await Url.findOne({originalUrl, user: userId});
     if(existingUrl){
       return res.json({
            "originalURL":existingUrl.originalUrl,
            "shortUrl":existingUrl.shortUrl,
            "urlCode":existingUrl.urlCode,
            "clickCount":existingUrl.clickCount
        })}

    

      const urlCode = nanoid(8);
      // console.log(urlCode)

     const shortUrl = `${process.env.BASE_URL}/${urlCode}`
      //  console.log(shortUrl)


//^ save to database
 const newUrl = new Url ({
        originalUrl,
        shortUrl,
        urlCode,
        user: userId // WHY? Link URL to the authenticated user
     })

     newUrl.save();


//created a database entry
    
     res
     .status(201)
     .json({
        "originalUrL":originalUrl,
        "shortUrl":shortUrl,
        "urlCode":urlCode
     })




     } catch (error) {
        res.status(500).json({message:"server error",error: error.message
        })
    
}




}

const redirectUrl = async (req,res)=>{
   try {
      const {urlCode}   = req.params;
      // console.log(urlCode)
      const url = await Url.findOne({urlCode});
      // console.log(url)
      if(!url){
         return res.status(404).json({message:"No URL Found"})
      }
      url.clickCount +=1;
      await url.save();

      return res.redirect(301,url.originalUrl);


   } catch (error) {
      console.log("ERROR",error.message)
      res.status(500).json({message:"server error",error: error.message
      })      
   }
}

 const getUrlStats = async (req, res) => {
  try {
    const { urlCode } = req.params;
    const userId = req.user._id;
    
    // WHY check user ownership? Users should only see stats for their own URLs
    const url = await Url.findOne({ urlCode, user: userId });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found or not authorized' });
    }
    
    const daysSinceCreated = Math.floor((Date.now() - url.createdAt) / (1000 * 60 * 60 * 24));
    
    res.json({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      urlCode: url.urlCode,
      clickCount: url.clickCount,
      createdAt: url.createdAt,
      daysSinceCreated,
      avgClicksPerDay: daysSinceCreated > 0 ? (url.clickCount / daysSinceCreated).toFixed(2) : url.clickCount
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};  

 const getUserUrls = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // WHY find by user? Users should only see their own URLs
    const urls = await Url.find({ user: userId }).sort({ createdAt: -1 }); // Newest first
    
    res.json({
      count: urls.length,
      urls
    });

  }
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
export { shortenUrl,redirectUrl ,getUrlStats,getUserUrls}