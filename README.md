Created a Blog Backend express Application 
1. It creates a blog with blogHeader , blogContent,imageUrl,and relatedlinks.




2.Gets all blogs.



3.Gets a specific blog corresponding to a blog id sent as a route parameter



4.It also can delete a blog.



#Start
1.npm install to install all dependencies
2.enter mongo url in config.env
3. node app.js to start 

#Creating a blog
1.In postman: post request localhost/blogs/create
enter details:

i)blogHeader

ii)blogContent

iii)imageUrl:filetype  path

iv)relatedLinks: [{},{}]



#To find all blogs


1.get reuest  localhost/blogs/find

#To find unique blog


1. get request  localhost/finduni/:_id

with uniqid

#delete blog 


1.post request localhost/delete/:_id
uniqid 
