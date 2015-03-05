1. What do you think are the greatest risk areas in completing this project?

I think the greatest risk areas for this project are something in back-end part.
1) We need to confirm the prices should be latest enough for all of these three currency. I mean each of the requesting process may cost some time, and we need to avoid such condition, like, after we getting the price in USD but the price in CAD has changed.

2) We also need to minimize the communication time between the front-end and back-end and the reason is similar in 1).

2. What changes/additions would you make to the BitcoinAverage API if you were able to influence its design?
1)
I think we can display the latest prices in some currencies like USD,CAD and we can also 
provide the user a ‘+’ and ‘-’ functionality. Like, I want to know the current price in RMB or Euro and then I can use ‘+’ to add them on the prices bar. And I don’t want to see the currency in CLP and then I can use the ‘-’ to remove it from the price bar.
2)
We can also provide a search box for the users to search a specific currency they want to see. This function can cooperate with ‘+’ and ‘-’ functions.
3)
We can also provide the users charts of each currency, helping them to analyze the trend of each currency.

3.List a two or three features that you would consider implementing in the future that would add significant value to this project.
1) the add and remove button as I referred in question 2.
2) I think we can add a connect/disconnect button for the users. If they don’t want to update the current prices any more the can click disconnect and they can use connect to restart updating. This function is more useful in some apps(not a simple webpage).Like, if we don’t want to see the updating in a single webpage we can directly close the page but for a app on our laptop, it’s not convenient if we close the app.

4.How long did this assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Angular", "Coding", "Debugging").
Learning Node.js 2hours
Coding+Debugging Back-End 5hours
Coding+Debugging Front-end 1hour
Demo+Documentation 1hour
Learn how to use Github 0.5hour

5.What was the hardest part?
I met three difficulties in this assignment.
1)Since Node.js is an asynchrony language, the step of getting current prices and the step of pushing the latest information to the front-end were executed parallel. And the process of getting prices usually cost a lot of time, pushing statement always executed first and the prices given back were not the current BTC prices. So I need to find some way to make these two parts execute sequencely in this assignment and my solution is to use recursion.

2)The method for how the back-end can push the latest prices back to the client-end. What I choose is to use a server-push model, like Comet. By this the server will push latest data back to client-end only if it updates the data. I think this can avoid non-necessary cost compared to something with auto-polling.

3)The method for the back-end to get data from the data source. Each of the requesting process will take some time and we want to minimize the total requesting time such that we can make the prices as latest as possible. What I choose is to use the asyn model and get three different prices parallel.

6.If you could go back and give yourself advice at the beginning of the project, what would it be?
1)Try to find hints as much as possible from the requirements and relative documents first!! I haven’t used Node.js before, so I wasted much time on googling some api I might used. But finally I found some details were given in the links given by you.
2) 

7.Did you learn anything new?
Of course, I learned the following things in this assignment.
1)Node.js
2)How to write codes in asynchronous programming languages like ’Node.js’
  such that they can execute sequencely.
3)Since I used to Bitbucket, this assignment also gives me an opportunity with Github.
 
8.Do you feel that this assignment allowed you to showcase your abilities effectively?

Not yet, this assignment mainly focus on the development of a web application(both front and back end). It didn’t consider too much about Algorithm and something about Design Pattern and Testing,which are also very important for a software engineer.

9.Are there any significant web development-related skills that you possess that weren't demonstrated in this excercise? If so, what are they?

No.
